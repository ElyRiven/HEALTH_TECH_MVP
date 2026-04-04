import { renderHook, act, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import type { ReactNode } from "react";
import { useFormRegisterVitals } from "../../hooks/useFormRegisterVitals/useFormRegisterVitals";
import type { UseFormRegisterVitals } from "../../hooks/useFormRegisterVitals/types";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return { ...actual, useNavigate: () => mockNavigate };
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <MemoryRouter>{children}</MemoryRouter>
);

/** All-valid form values for testing partial scenarios */
const validForm = {
  frecuencia_cardiaca: "75",
  frecuencia_respiratoria: "18",
  saturacion_o2: "98.5",
  temperatura: "36.5",
  presion: "120/80",
  nivel_de_conciencia: "Alerta",
  nivel_de_dolor: "5",
};

function fillForm(
  result: { current: UseFormRegisterVitals },
  overrides: Partial<typeof validForm> = {},
) {
  const data = { ...validForm, ...overrides };
  Object.entries(data).forEach(([name, value]) => {
    act(() => {
      result.current.handleChange({
        target: { name, value },
      } as React.ChangeEvent<HTMLInputElement>);
    });
  });
}

describe("useFormRegisterVitals", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns correct initial state", () => {
    const { result } = renderHook(() => useFormRegisterVitals("123"), {
      wrapper,
    });
    expect(result.current.form.frecuencia_cardiaca).toBe("");
    expect(result.current.form.nivel_de_conciencia).toBe("Alerta");
    expect(result.current.loading).toBe(false);
    expect(result.current.formError).toBeNull();
    expect(result.current.formSuccess).toBeNull();
  });

  it("handleChange updates a field", () => {
    const { result } = renderHook(() => useFormRegisterVitals("123"), {
      wrapper,
    });
    act(() => {
      result.current.handleChange({
        target: { name: "frecuencia_cardiaca", value: "80" },
      } as React.ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.form.frecuencia_cardiaca).toBe("80");
  });

  // ── frecuencia_cardiaca ──────────────────────────────────────────────────
  it("errors when frecuencia_cardiaca is empty", async () => {
    const { result } = renderHook(() => useFormRegisterVitals("123"), {
      wrapper,
    });
    fillForm(result, { frecuencia_cardiaca: "" });
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });
    expect(result.current.formError).toEqual(
      expect.arrayContaining(["Frecuencia cardíaca: campo requerido"]),
    );
  });

  it("errors when frecuencia_cardiaca has decimals", async () => {
    const { result } = renderHook(() => useFormRegisterVitals("123"), {
      wrapper,
    });
    fillForm(result, { frecuencia_cardiaca: "75.5" });
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });
    expect(result.current.formError).toEqual(
      expect.arrayContaining([
        "Frecuencia cardíaca: debe ser un número entero (sin decimales)",
      ]),
    );
  });

  it("errors when frecuencia_cardiaca is below range", async () => {
    const { result } = renderHook(() => useFormRegisterVitals("123"), {
      wrapper,
    });
    fillForm(result, { frecuencia_cardiaca: "10" });
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });
    expect(result.current.formError).toEqual(
      expect.arrayContaining([
        "Frecuencia cardíaca: debe estar entre 20 y 300 bpm",
      ]),
    );
  });

  it("errors when frecuencia_cardiaca is above range", async () => {
    const { result } = renderHook(() => useFormRegisterVitals("123"), {
      wrapper,
    });
    fillForm(result, { frecuencia_cardiaca: "310" });
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });
    expect(result.current.formError).toEqual(
      expect.arrayContaining([
        "Frecuencia cardíaca: debe estar entre 20 y 300 bpm",
      ]),
    );
  });

  // ── frecuencia_respiratoria ──────────────────────────────────────────────
  it("errors when frecuencia_respiratoria is empty", async () => {
    const { result } = renderHook(() => useFormRegisterVitals("123"), {
      wrapper,
    });
    fillForm(result, { frecuencia_respiratoria: "" });
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });
    expect(result.current.formError).toEqual(
      expect.arrayContaining(["Frecuencia respiratoria: campo requerido"]),
    );
  });

  it("errors when frecuencia_respiratoria is not integer", async () => {
    const { result } = renderHook(() => useFormRegisterVitals("123"), {
      wrapper,
    });
    fillForm(result, { frecuencia_respiratoria: "18.5" });
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });
    expect(result.current.formError).toEqual(
      expect.arrayContaining([
        "Frecuencia respiratoria: debe ser un número entero (sin decimales)",
      ]),
    );
  });

  it("errors when frecuencia_respiratoria is out of range", async () => {
    const { result } = renderHook(() => useFormRegisterVitals("123"), {
      wrapper,
    });
    fillForm(result, { frecuencia_respiratoria: "65" });
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });
    expect(result.current.formError).toEqual(
      expect.arrayContaining([
        "Frecuencia respiratoria: debe estar entre 1 y 60 rpm",
      ]),
    );
  });

  // ── saturacion_o2 ────────────────────────────────────────────────────────
  it("errors when saturacion_o2 is empty", async () => {
    const { result } = renderHook(() => useFormRegisterVitals("123"), {
      wrapper,
    });
    fillForm(result, { saturacion_o2: "" });
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });
    expect(result.current.formError).toEqual(
      expect.arrayContaining(["Saturación O2: campo requerido"]),
    );
  });

  it("errors when saturacion_o2 has more than 1 decimal", async () => {
    const { result } = renderHook(() => useFormRegisterVitals("123"), {
      wrapper,
    });
    fillForm(result, { saturacion_o2: "98.55" });
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });
    expect(result.current.formError).toEqual(
      expect.arrayContaining([
        "Saturación O2: admite como máximo un decimal (ej: 98.5)",
      ]),
    );
  });

  it("errors when saturacion_o2 is out of range", async () => {
    const { result } = renderHook(() => useFormRegisterVitals("123"), {
      wrapper,
    });
    fillForm(result, { saturacion_o2: "40" });
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });
    expect(result.current.formError).toEqual(
      expect.arrayContaining([
        "Saturación O2: debe estar entre 50.0 y 100.0 %",
      ]),
    );
  });

  // ── temperatura ──────────────────────────────────────────────────────────
  it("errors when temperatura is empty", async () => {
    const { result } = renderHook(() => useFormRegisterVitals("123"), {
      wrapper,
    });
    fillForm(result, { temperatura: "" });
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });
    expect(result.current.formError).toEqual(
      expect.arrayContaining(["Temperatura: campo requerido"]),
    );
  });

  it("errors when temperatura has more than 1 decimal", async () => {
    const { result } = renderHook(() => useFormRegisterVitals("123"), {
      wrapper,
    });
    fillForm(result, { temperatura: "36.55" });
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });
    expect(result.current.formError).toEqual(
      expect.arrayContaining([
        "Temperatura: admite como máximo un decimal (ej: 36.5)",
      ]),
    );
  });

  it("errors when temperatura is out of range", async () => {
    const { result } = renderHook(() => useFormRegisterVitals("123"), {
      wrapper,
    });
    fillForm(result, { temperatura: "50" });
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });
    expect(result.current.formError).toEqual(
      expect.arrayContaining(["Temperatura: debe estar entre 25.0 y 45.0 °C"]),
    );
  });

  // ── presion ──────────────────────────────────────────────────────────────
  it("errors when presion is empty", async () => {
    const { result } = renderHook(() => useFormRegisterVitals("123"), {
      wrapper,
    });
    fillForm(result, { presion: "" });
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });
    expect(result.current.formError).toEqual(
      expect.arrayContaining(["Presión arterial: campo requerido"]),
    );
  });

  it("errors when presion has invalid format", async () => {
    const { result } = renderHook(() => useFormRegisterVitals("123"), {
      wrapper,
    });
    fillForm(result, { presion: "120-80" });
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });
    expect(result.current.formError).toEqual(
      expect.arrayContaining([expect.stringContaining("formato inválido")]),
    );
  });

  it("errors when sistolica is out of range", async () => {
    const { result } = renderHook(() => useFormRegisterVitals("123"), {
      wrapper,
    });
    fillForm(result, { presion: "40/20" });
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });
    expect(result.current.formError).toEqual(
      expect.arrayContaining([
        "Presión arterial: la sistólica debe estar entre 50 y 300 mmHg",
      ]),
    );
  });

  it("errors when diastolica is out of range", async () => {
    const { result } = renderHook(() => useFormRegisterVitals("123"), {
      wrapper,
    });
    fillForm(result, { presion: "120/10" });
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });
    expect(result.current.formError).toEqual(
      expect.arrayContaining([
        "Presión arterial: la diastólica debe estar entre 20 y 200 mmHg",
      ]),
    );
  });

  it("errors when diastolica >= sistolica", async () => {
    const { result } = renderHook(() => useFormRegisterVitals("123"), {
      wrapper,
    });
    fillForm(result, { presion: "80/120" });
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });
    expect(result.current.formError).toEqual(
      expect.arrayContaining([
        "Presión arterial: la diastólica debe ser menor que la sistólica",
      ]),
    );
  });

  // ── nivel_de_dolor ───────────────────────────────────────────────────────
  it("errors when nivel_de_dolor is empty", async () => {
    const { result } = renderHook(() => useFormRegisterVitals("123"), {
      wrapper,
    });
    fillForm(result, { nivel_de_dolor: "" });
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });
    expect(result.current.formError).toEqual(
      expect.arrayContaining(["Nivel de dolor: campo requerido"]),
    );
  });

  it("errors when nivel_de_dolor is not integer", async () => {
    const { result } = renderHook(() => useFormRegisterVitals("123"), {
      wrapper,
    });
    fillForm(result, { nivel_de_dolor: "5.5" });
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });
    expect(result.current.formError).toEqual(
      expect.arrayContaining(["Nivel de dolor: debe ser un número entero"]),
    );
  });

  it("errors when nivel_de_dolor is out of range", async () => {
    const { result } = renderHook(() => useFormRegisterVitals("123"), {
      wrapper,
    });
    fillForm(result, { nivel_de_dolor: "11" });
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });
    expect(result.current.formError).toEqual(
      expect.arrayContaining([
        "Nivel de dolor: debe estar entre 0 y 10 (escala EVA)",
      ]),
    );
  });

  it("errors when nivel_de_conciencia is Sin respuesta and dolor != 0", async () => {
    const { result } = renderHook(() => useFormRegisterVitals("123"), {
      wrapper,
    });
    fillForm(result, {
      nivel_de_conciencia: "Sin respuesta",
      nivel_de_dolor: "5",
    });
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });
    expect(result.current.formError).toEqual(
      expect.arrayContaining([
        "Nivel de dolor: debe ser 0 cuando el nivel de conciencia es 'Sin respuesta'",
      ]),
    );
  });

  it("accepts nivel_de_dolor = 0 when nivel_de_conciencia is Sin respuesta", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ message: "Registrado" }),
    });
    const { result } = renderHook(() => useFormRegisterVitals("123"), {
      wrapper,
    });
    fillForm(result, {
      nivel_de_conciencia: "Sin respuesta",
      nivel_de_dolor: "0",
    });
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });
    expect(result.current.formError).toBeNull();
  });

  // ── API success / error ─────────────────────────────────────────────────
  it("submits successfully and navigates to /dashboard", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ message: "Signos vitales registrados" }),
    });
    const onSuccess = vi.fn();
    const { result } = renderHook(
      () => useFormRegisterVitals("123", onSuccess),
      { wrapper },
    );
    fillForm(result);
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/v1/vitals/123",
      expect.objectContaining({ method: "POST" }),
    );
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard", expect.anything());
    await waitFor(() =>
      expect(onSuccess).toHaveBeenCalledWith("Signos vitales registrados"),
    );
  });

  it("handles API error with errores object", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: () =>
        Promise.resolve({ errores: { campo: "Error en campo vital" } }),
    });
    const { result } = renderHook(() => useFormRegisterVitals("123"), {
      wrapper,
    });
    fillForm(result);
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });
    expect(result.current.formError).toEqual(["Error en campo vital"]);
  });

  it("handles API error with campos_faltantes", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: () =>
        Promise.resolve({ campos_faltantes: ["frecuencia_cardiaca"] }),
    });
    const { result } = renderHook(() => useFormRegisterVitals("123"), {
      wrapper,
    });
    fillForm(result);
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });
    expect(result.current.formError).toEqual(["frecuencia_cardiaca"]);
  });

  it("handles API error with errors object", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ errors: { temp: "Temperatura inválida" } }),
    });
    const { result } = renderHook(() => useFormRegisterVitals("123"), {
      wrapper,
    });
    fillForm(result);
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });
    expect(result.current.formError).toEqual(["Temperatura inválida"]);
  });

  it("handles API error with message string", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ message: "Paciente no encontrado" }),
    });
    const { result } = renderHook(() => useFormRegisterVitals("123"), {
      wrapper,
    });
    fillForm(result);
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });
    expect(result.current.formError).toBe("Paciente no encontrado");
  });

  it("handles network error (fetch throws)", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network timeout"));
    const { result } = renderHook(() => useFormRegisterVitals("123"), {
      wrapper,
    });
    fillForm(result);
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });
    expect(result.current.formError).toBe(
      "No se pudo conectar con el servidor",
    );
    expect(result.current.loading).toBe(false);
  });

  it("calls onError through effect when formError is set", async () => {
    const onError = vi.fn();
    const { result } = renderHook(
      () => useFormRegisterVitals("123", undefined, onError),
      { wrapper },
    );
    fillForm(result, { frecuencia_cardiaca: "" });
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });
    await waitFor(() => expect(onError).toHaveBeenCalled());
  });
});
