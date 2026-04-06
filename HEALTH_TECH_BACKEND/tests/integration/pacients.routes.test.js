import { jest } from "@jest/globals";
import { pool } from "../../src/db.js";
import request from "supertest";
import express from "express";
import pacientsRouter from "../../src/routes/pacients.routes.js";

// Mock the DB pool — factory must not reference outer variables (hoisting)
jest.mock("../../src/db.js", () => ({
  pool: {
    query: jest.fn(),
    connect: jest.fn(),
  },
}));

const mockQuery = pool.query;
const mockConnect = pool.connect;

// Create the Express app inline (mirrors src/index.js without app.listen)

const app = express();
app.use(express.json());
app.use(pacientsRouter);

const mockClient = {
  query: jest.fn(),
  release: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
  mockConnect.mockResolvedValue(mockClient);
});

// ─────────────────────────────────────────────
// POST /api/v1/pacients
// ─────────────────────────────────────────────
describe("POST /api/v1/pacients", () => {
  const validBody = {
    identificacion: 'AB12345678',
    nombres: "Juan",
    apellidos: "Pérez",
    fecha_de_nacimiento: "1990-05-15",
    genero: "Masculino",
    estado: "En espera",
  };

  it("retorna 201 al crear un paciente válido", async () => {
    mockQuery.mockResolvedValueOnce({ rows: [{ identificacion: 'AB12345678' }] });
    const res = await request(app).post("/api/v1/pacients").send(validBody);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id", 'AB12345678');
    expect(res.body).toHaveProperty("message");
  });

  it("retorna 400 si se envía hora_de_registro en el body", async () => {
    const res = await request(app)
      .post("/api/v1/pacients")
      .send({ ...validBody, hora_de_registro: "2024-01-01T00:00:00Z" });
    expect(res.status).toBe(400);
    expect(res.body.errors).toHaveProperty("hora_de_registro");
  });

  it("retorna 400 si se envía criticidad en el body", async () => {
    const res = await request(app)
      .post("/api/v1/pacients")
      .send({ ...validBody, criticidad: 1 });
    expect(res.status).toBe(400);
    expect(res.body.errors).toHaveProperty("criticidad");
  });

  it("retorna 400 cuando identificacion no es string válido de 10 chars", async () => {
    const res = await request(app)
      .post("/api/v1/pacients")
      .send({ ...validBody, identificacion: "corto" });
    expect(res.status).toBe(400);
  });

  it("retorna 400 cuando identificacion contiene caracteres especiales", async () => {
    const res = await request(app)
      .post("/api/v1/pacients")
      .send({ ...validBody, identificacion: "AB1234-678" });
    expect(res.status).toBe(400);
  });

  it("retorna 400 cuando identificacion tiene más de 10 caracteres", async () => {
    const res = await request(app)
      .post("/api/v1/pacients")
      .send({ ...validBody, identificacion: "AB12345678EXTRA" });
    expect(res.status).toBe(400);
  });

  it("acepta identificacion como string de 10 chars alfanuméricos mayúsculas", async () => {
    mockQuery.mockResolvedValueOnce({ rows: [{ identificacion: 'ABC1234567' }] });
    const res = await request(app)
      .post("/api/v1/pacients")
      .send({ ...validBody, identificacion: 'ABC1234567' });
    expect(res.status).toBe(201);
  });

  it("retorna 400 cuando nombres está vacío", async () => {
    const res = await request(app)
      .post("/api/v1/pacients")
      .send({ ...validBody, nombres: "" });
    expect(res.status).toBe(400);
  });

  it("retorna 400 cuando fecha_de_nacimiento es inválida", async () => {
    const res = await request(app)
      .post("/api/v1/pacients")
      .send({ ...validBody, fecha_de_nacimiento: "15/05/1990" });
    expect(res.status).toBe(400);
  });

  it("retorna 409 cuando la identificación ya existe", async () => {
    const dupError = new Error("duplicate");
    dupError.code = "23505";
    mockQuery.mockRejectedValueOnce(dupError);
    const res = await request(app).post("/api/v1/pacients").send(validBody);
    expect(res.status).toBe(409);
  });

  it("retorna 500 cuando hay un error de base de datos", async () => {
    mockQuery.mockRejectedValueOnce(new Error("DB error"));
    const res = await request(app).post("/api/v1/pacients").send(validBody);
    expect(res.status).toBe(500);
  });
});

// ─────────────────────────────────────────────
// GET /api/v1/pacients/:id
// ─────────────────────────────────────────────
describe("GET /api/v1/pacients/:id", () => {
  it("retorna 200 con el id del paciente cuando existe", async () => {
    mockQuery.mockResolvedValueOnce({ rows: [{ identificacion: 'AB12345678' }] });
    const res = await request(app).get("/api/v1/pacients/AB12345678");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", 'AB12345678');
  });

  it("retorna 404 cuando el paciente no existe", async () => {
    mockQuery.mockResolvedValueOnce({ rows: [] });
    const res = await request(app).get("/api/v1/pacients/XY99999999");
    expect(res.status).toBe(404);
  });

  it("retorna 400 cuando el id tiene menos de 10 caracteres", async () => {
    const res = await request(app).get("/api/v1/pacients/abc");
    expect(res.status).toBe(400);
  });

  it("retorna 400 cuando el id contiene letras minúsculas", async () => {
    const res = await request(app).get("/api/v1/pacients/ab12345678");
    expect(res.status).toBe(400);
  });

  it("retorna 400 cuando el id tiene más de 10 caracteres", async () => {
    const res = await request(app).get("/api/v1/pacients/AB12345678EXTRA");
    expect(res.status).toBe(400);
  });

  it("retorna 400 con mensaje correcto para id con longitud incorrecta", async () => {
    const res = await request(app).get("/api/v1/pacients/123");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "El parámetro pacientId debe tener 10 caracteres");
  });

  it("retorna 400 con mensaje correcto para id con caracteres inválidos", async () => {
    const res = await request(app).get("/api/v1/pacients/ab-1234567");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "El parámetro pacientId debe contener solo números y letras mayúsculas");
  });

  it("retorna 500 cuando hay un error de base de datos", async () => {
    mockQuery.mockRejectedValueOnce(new Error("DB fail"));
    const res = await request(app).get("/api/v1/pacients/AB12345678");
    expect(res.status).toBe(500);
  });
});

// ─────────────────────────────────────────────
// GET /api/v1/pacients
// ─────────────────────────────────────────────
describe("GET /api/v1/pacients", () => {
  it("retorna 200 con array de pacientes", async () => {
    const patients = [
      { identificacion: 1, nombres: "Juan", criticidad: 3 },
      { identificacion: 2, nombres: "Ana", criticidad: 5 },
    ];
    mockQuery.mockResolvedValueOnce({ rows: patients });
    const res = await request(app).get("/api/v1/pacients");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);
  });

  it("retorna 200 con array vacío cuando no hay pacientes", async () => {
    mockQuery.mockResolvedValueOnce({ rows: [] });
    const res = await request(app).get("/api/v1/pacients");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("acepta el parámetro query order=DESC", async () => {
    mockQuery.mockResolvedValueOnce({ rows: [] });
    const res = await request(app).get("/api/v1/pacients?order=DESC");
    expect(res.status).toBe(200);
  });

  it("retorna 500 cuando hay un error de base de datos", async () => {
    mockQuery.mockRejectedValueOnce(new Error("DB error"));
    const res = await request(app).get("/api/v1/pacients");
    expect(res.status).toBe(500);
  });
});

// ─────────────────────────────────────────────
// POST /api/v1/vitals/:patientId
// ─────────────────────────────────────────────
describe("POST /api/v1/vitals/:patientId", () => {
  const validVitals = {
    frecuencia_cardiaca: 80,
    frecuencia_respiratoria: 16,
    saturacion_o2: 98,
    temperatura: 36.5,
    presion: "120/80",
    nivel_de_conciencia: "Alerta",
    nivel_de_dolor: 2,
  };

  it("retorna 201 al registrar signos vitales válidos", async () => {
    // checkPatient
    mockQuery.mockResolvedValueOnce({
      rowCount: 1,
      rows: [{ nombres: "Juan", apellidos: "Pérez" }],
    });

    mockClient.query
      .mockResolvedValueOnce({}) // BEGIN
      .mockResolvedValueOnce({ rows: [{ id: 10, id_paciente: 'AB12345678' }] }) // INSERT vitals
      .mockResolvedValueOnce({ rowCount: 1 }) // UPDATE criticidad
      .mockResolvedValueOnce({}); // COMMIT

    const res = await request(app).post("/api/v1/vitals/AB12345678").send(validVitals);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("criticidad");
  });

  it("retorna 400 cuando patientId tiene menos de 10 caracteres", async () => {
    const res = await request(app).post("/api/v1/vitals/abc").send(validVitals);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "El parámetro pacientId debe tener 10 caracteres");
  });

  it("retorna 400 cuando patientId contiene letras minúsculas", async () => {
    const res = await request(app).post("/api/v1/vitals/ab12345678").send(validVitals);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "El parámetro pacientId debe contener solo números y letras mayúsculas");
  });

  it("retorna 400 cuando patientId tiene más de 10 caracteres", async () => {
    const res = await request(app).post("/api/v1/vitals/AB12345678EXTRA").send(validVitals);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "El parámetro pacientId debe tener 10 caracteres");
  });

  it("retorna 400 cuando faltan campos obligatorios", async () => {
    const res = await request(app)
      .post("/api/v1/vitals/AB12345678")
      .send({ frecuencia_cardiaca: 80 });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("campos_faltantes");
  });

  it("retorna 422 cuando los datos no pasan la validación (FC fuera de rango)", async () => {
    const res = await request(app)
      .post("/api/v1/vitals/AB12345678")
      .send({ ...validVitals, frecuencia_cardiaca: 5 });
    expect(res.status).toBe(422);
  });

  it("retorna 422 cuando nivel_de_conciencia es inválido", async () => {
    const res = await request(app)
      .post("/api/v1/vitals/AB12345678")
      .send({ ...validVitals, nivel_de_conciencia: "Dormido" });
    expect(res.status).toBe(422);
  });

  it("retorna 422 cuando nivel_de_dolor es string", async () => {
    const res = await request(app)
      .post("/api/v1/vitals/AB12345678")
      .send({ ...validVitals, nivel_de_dolor: "mucho" });
    expect(res.status).toBe(422);
  });

  it("retorna 422 cuando presion tiene formato incorrecto", async () => {
    const res = await request(app)
      .post("/api/v1/vitals/AB12345678")
      .send({ ...validVitals, presion: "invalid" });
    expect(res.status).toBe(422);
  });

  it("retorna 404 cuando el paciente no existe", async () => {
    mockQuery.mockResolvedValueOnce({ rowCount: 0 });
    const res = await request(app).post("/api/v1/vitals/XY99999999").send(validVitals);
    expect(res.status).toBe(404);
  });

  it("retorna 500 cuando hay un error en la transacción", async () => {
    mockQuery.mockResolvedValueOnce({ rowCount: 1 });
    mockClient.query
      .mockResolvedValueOnce({}) // BEGIN
      .mockRejectedValueOnce(new Error("Error en INSERT"))
      .mockResolvedValueOnce({}); // ROLLBACK

    const res = await request(app).post("/api/v1/vitals/AB12345678").send(validVitals);
    expect(res.status).toBe(500);
  });

  it("retorna 404 cuando el UPDATE de criticidad no encontró el paciente", async () => {
    mockQuery.mockResolvedValueOnce({ rowCount: 1 });
    mockClient.query
      .mockResolvedValueOnce({}) // BEGIN
      .mockResolvedValueOnce({ rows: [{ id: 10 }] }) // INSERT
      .mockResolvedValueOnce({ rowCount: 0 }) // UPDATE - no encontró
      .mockResolvedValueOnce({}); // ROLLBACK

    const res = await request(app).post("/api/v1/vitals/AB12345678").send(validVitals);
    expect(res.status).toBe(404);
  });
});
