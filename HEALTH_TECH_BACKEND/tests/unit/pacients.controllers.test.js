import { jest } from "@jest/globals";
import {
  GetPacient,
  CreatePacient,
  CreateVitalsPacient,
  GetAllPacients,
} from "../../src/controllers/pacients.controllers.js";
import { pool } from "../../src/db.js";
import { validatePacient } from "../../src/helpers/validator.js";
import { validateVitals } from "../../src/helpers/validatorVitals.js";

// Mock de la base de datos — factory must not reference outer variables (hoisting)
jest.mock("../../src/db.js", () => ({
  pool: {
    query: jest.fn(),
    connect: jest.fn(),
  },
}));

// Mock de los helpers
jest.mock("../../src/helpers/timeAdapter.js", () => ({
  adaptToTimeFormat: jest.fn(() => "2024-06-15T10:30:00.000Z"),
}));

jest.mock("../../src/helpers/validator.js", () => ({
  validatePacient: jest.fn(() => null),
}));

jest.mock("../../src/helpers/validatorVitals.js", () => ({
  validateVitals: jest.fn(() => null),
}));

jest.mock("../../src/helpers/TriageEngine.js", () => ({
  classifyTriage: jest.fn(() => ({
    criticalityLevel: 3,
    color: "🟡 Amarillo",
    denomination: "Urgente",
    maxAttentionTime: "60 minutos",
    criticalSigns: ["Frecuencia Cardíaca"],
    classificationDetail: {},
  })),
}));

// Aliases for clarity
const mockQuery = pool.query;
const mockConnect = pool.connect;

// Helper para crear mocks de req/res
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockReq = (overrides = {}) => ({
  params: {},
  body: {},
  query: {},
  ...overrides,
});

beforeEach(() => {
  jest.clearAllMocks();
});

// ─────────────────────────────────────────────
// GetPacient
// ─────────────────────────────────────────────
describe("GetPacient", () => {
  it("retorna 400 cuando el id tiene menos de 10 caracteres", async () => {
    const req = mockReq({ params: { id: "abc" } });
    const res = mockRes();
    await GetPacient(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String) }),
    );
  });

  it("retorna 400 cuando el id contiene letras minúsculas", async () => {
    const req = mockReq({ params: { id: "ab12345678" } });
    const res = mockRes();
    await GetPacient(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "El parámetro pacientId debe contener solo números y letras mayúsculas" }),
    );
  });

  it("retorna 404 cuando el paciente no existe", async () => {
    mockQuery.mockResolvedValueOnce({ rows: [] });
    const req = mockReq({ params: { id: "XY99999999" } });
    const res = mockRes();
    await GetPacient(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("retorna 200 con el id cuando el paciente existe", async () => {
    mockQuery.mockResolvedValueOnce({ rows: [{ identificacion: 'AB12345678' }] });
    const req = mockReq({ params: { id: "AB12345678" } });
    const res = mockRes();
    await GetPacient(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: 'AB12345678' });
  });

  it("retorna 500 cuando hay un error de base de datos", async () => {
    mockQuery.mockRejectedValueOnce(new Error("DB error"));
    const req = mockReq({ params: { id: "AB12345678" } });
    const res = mockRes();
    await GetPacient(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});

// ─────────────────────────────────────────────
// CreatePacient
// ─────────────────────────────────────────────
describe("CreatePacient", () => {
  const validBody = {
    identificacion: 'AB12345678',
    nombres: "Juan",
    apellidos: "Pérez",
    fecha_de_nacimiento: "1990-05-15",
    genero: "Masculino",
    estado: "En espera",
  };

  it("retorna 400 cuando el body incluye hora_de_registro", async () => {
    const req = mockReq({
      body: { ...validBody, hora_de_registro: "2024-01-01T00:00:00Z" },
    });
    const res = mockRes();
    await CreatePacient(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        errors: expect.objectContaining({
          hora_de_registro: expect.any(String),
        }),
      }),
    );
  });

  it("retorna 400 cuando el body incluye criticidad", async () => {
    const req = mockReq({ body: { ...validBody, criticidad: 1 } });
    const res = mockRes();
    await CreatePacient(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        errors: expect.objectContaining({ criticidad: expect.any(String) }),
      }),
    );
  });

  it("retorna 400 cuando hay errores de validación", async () => {
    validatePacient.mockReturnValueOnce({ nombres: "El nombre es requerido" });
    const req = mockReq({ body: validBody });
    const res = mockRes();
    await CreatePacient(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("retorna 201 cuando el paciente se crea exitosamente", async () => {
    mockQuery.mockResolvedValueOnce({ rows: [{ identificacion: 'AB12345678' }] });
    const req = mockReq({ body: validBody });
    const res = mockRes();
    await CreatePacient(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String), id: 'AB12345678' }),
    );
  });

  it("retorna 409 cuando la identificación está duplicada", async () => {
    const dupError = new Error("duplicate");
    dupError.code = "23505";
    mockQuery.mockRejectedValueOnce(dupError);
    const req = mockReq({ body: validBody });
    const res = mockRes();
    await CreatePacient(req, res);
    expect(res.status).toHaveBeenCalledWith(409);
  });

  it("retorna 500 cuando hay un error inesperado", async () => {
    mockQuery.mockRejectedValueOnce(new Error("Error inesperado"));
    const req = mockReq({ body: validBody });
    const res = mockRes();
    await CreatePacient(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});

// ─────────────────────────────────────────────
// CreateVitalsPacient
// ─────────────────────────────────────────────
describe("CreateVitalsPacient", () => {
  const validBody = {
    frecuencia_cardiaca: 80,
    frecuencia_respiratoria: 16,
    saturacion_o2: 98,
    temperatura: 36.5,
    presion: "120/80",
    nivel_de_conciencia: "Alerta",
    nivel_de_dolor: 2,
  };

  const mockClient = {
    query: jest.fn(),
    release: jest.fn(),
  };

  beforeEach(() => {
    mockConnect.mockResolvedValue(mockClient);
    mockClient.query.mockReset();
    mockClient.release.mockReset();
  });

  it("retorna 400 cuando el body no es un objeto válido", async () => {
    const req = mockReq({ params: { patientId: "AB12345678" }, body: null });
    const res = mockRes();
    await CreateVitalsPacient(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("retorna 400 cuando patientId tiene menos de 10 caracteres", async () => {
    const req = mockReq({ params: { patientId: "abc" }, body: validBody });
    const res = mockRes();
    await CreateVitalsPacient(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "El parámetro pacientId debe tener 10 caracteres" }),
    );
  });

  it("retorna 400 cuando patientId contiene letras minúsculas", async () => {
    const req = mockReq({ params: { patientId: "ab12345678" }, body: validBody });
    const res = mockRes();
    await CreateVitalsPacient(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "El parámetro pacientId debe contener solo números y letras mayúsculas" }),
    );
  });

  it("retorna 400 cuando hay campos faltantes", async () => {
    const req = mockReq({
      params: { patientId: "AB12345678" },
      body: { frecuencia_cardiaca: 80 },
    });
    const res = mockRes();
    await CreateVitalsPacient(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("retorna 422 cuando la validación falla", async () => {
    validateVitals.mockReturnValueOnce({
      frecuencia_cardiaca: "Valor inválido",
    });
    const req = mockReq({ params: { patientId: "AB12345678" }, body: validBody });
    const res = mockRes();
    await CreateVitalsPacient(req, res);
    expect(res.status).toHaveBeenCalledWith(422);
  });

  it("retorna 404 cuando el paciente no existe", async () => {
    mockQuery.mockResolvedValueOnce({ rowCount: 0 });
    const req = mockReq({ params: { patientId: "XY99999999" }, body: validBody });
    const res = mockRes();
    await CreateVitalsPacient(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("retorna 201 cuando los signos vitales se registran exitosamente", async () => {
    // 1: checkPatient query
    mockQuery.mockResolvedValueOnce({
      rowCount: 1,
      rows: [{ nombres: "Juan", apellidos: "Pérez" }],
    });

    // client queries: BEGIN, INSERT, UPDATE, COMMIT
    mockClient.query
      .mockResolvedValueOnce({}) // BEGIN
      .mockResolvedValueOnce({ rows: [{ id: 1, id_paciente: 'AB12345678' }] }) // INSERT vitals
      .mockResolvedValueOnce({ rowCount: 1 }) // UPDATE criticidad
      .mockResolvedValueOnce({}); // COMMIT

    const req = mockReq({ params: { patientId: "AB12345678" }, body: validBody });
    const res = mockRes();
    await CreateVitalsPacient(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.any(String),
        criticidad: expect.any(Object),
      }),
    );
  });

  it("retorna 404 cuando el paciente no se puede actualizar", async () => {
    mockQuery.mockResolvedValueOnce({ rowCount: 1 });

    mockClient.query
      .mockResolvedValueOnce({}) // BEGIN
      .mockResolvedValueOnce({ rows: [{ id: 1 }] }) // INSERT vitals
      .mockResolvedValueOnce({ rowCount: 0 }) // UPDATE no encuentra paciente
      .mockResolvedValueOnce({}); // ROLLBACK

    const req = mockReq({ params: { patientId: "AB12345678" }, body: validBody });
    const res = mockRes();
    await CreateVitalsPacient(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("retorna 500 cuando hay un error en la transacción", async () => {
    mockQuery.mockResolvedValueOnce({ rowCount: 1 });

    mockClient.query
      .mockResolvedValueOnce({}) // BEGIN
      .mockRejectedValueOnce(new Error("Error de transacción")); // INSERT falla

    const req = mockReq({ params: { patientId: "AB12345678" }, body: validBody });
    const res = mockRes();
    await CreateVitalsPacient(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});

// ─────────────────────────────────────────────
// GetAllPacients
// ─────────────────────────────────────────────
describe("GetAllPacients", () => {
  it("retorna 200 con la lista de pacientes en orden por defecto (ASC)", async () => {
    const rows = [{ identificacion: 1, nombres: "Juan" }];
    mockQuery.mockResolvedValueOnce({ rows });
    const req = mockReq({ query: {} });
    const res = mockRes();
    await GetAllPacients(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(rows);
  });

  it("acepta el parámetro order=DESC", async () => {
    const rows = [{ identificacion: 2, nombres: "Ana" }];
    mockQuery.mockResolvedValueOnce({ rows });
    const req = mockReq({ query: { order: "DESC" } });
    const res = mockRes();
    await GetAllPacients(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('acepta el parámetro order en minúsculas "desc"', async () => {
    mockQuery.mockResolvedValueOnce({ rows: [] });
    const req = mockReq({ query: { order: "desc" } });
    const res = mockRes();
    await GetAllPacients(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("ignora valores inválidos de order y usa ASC", async () => {
    mockQuery.mockResolvedValueOnce({ rows: [] });
    const req = mockReq({ query: { order: "INVALID" } });
    const res = mockRes();
    await GetAllPacients(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("retorna 500 cuando hay un error de base de datos", async () => {
    mockQuery.mockRejectedValueOnce(new Error("DB fail"));
    const req = mockReq({ query: {} });
    const res = mockRes();
    await GetAllPacients(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
