import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import RegisterVitals from "../../pages/RegisterVitals";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return { ...actual, useNavigate: () => mockNavigate };
});

function renderRegisterVitals(patientId: string, state?: Record<string, unknown>) {
  const router = createMemoryRouter(
    [{ path: "/register/:id", element: <RegisterVitals /> }],
    { initialEntries: [{ pathname: `/register/${patientId}`, state: state ?? null }] },
  );
  return render(<RouterProvider router={router} />);
}

describe("RegisterVitals page (integration)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the VitalSignsForm when id is present", () => {
    renderRegisterVitals("123");
    expect(screen.getByLabelText(/frecuencia cardiaca/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/temperatura/i)).toBeInTheDocument();
  });

  it("does NOT show success alert when accessing route directly (no fromRegistration state)", () => {
    renderRegisterVitals("456");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("shows success alert when navigating from registration (fromRegistration state)", () => {
    renderRegisterVitals("456", { fromRegistration: true });
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(
      screen.getByText(
        /paciente con identificación 456 registrado exitosamente/i,
      ),
    ).toBeInTheDocument();
  });

  it("renders submit button", () => {
    renderRegisterVitals("123");
    expect(
      screen.getByRole("button", { name: /guardar/i }),
    ).toBeInTheDocument();
  });

  it("shows validation errors on empty form submission", async () => {
    renderRegisterVitals("123");
    fireEvent.click(screen.getByRole("button", { name: /guardar/i }));
    await waitFor(() => {
      expect(screen.getAllByText(/campo requerido/i).length).toBeGreaterThan(0);
    });
  });

  it("shows multiple validation errors", async () => {
    renderRegisterVitals("123");
    fireEvent.click(screen.getByRole("button", { name: /guardar/i }));
    await waitFor(() => {
      const errors = screen.getAllByText(
        /frecuencia cardíaca: campo requerido/i,
      );
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  it("submits successfully and navigates to /dashboard", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ message: "Signos vitales registrados" }),
    });
    renderRegisterVitals("789");

    fireEvent.change(screen.getByLabelText(/frecuencia cardiaca/i), {
      target: { name: "frecuencia_cardiaca", value: "75" },
    });
    fireEvent.change(screen.getByLabelText(/frecuencia respiratoria/i), {
      target: { name: "frecuencia_respiratoria", value: "18" },
    });
    fireEvent.change(screen.getByLabelText(/saturación o2/i), {
      target: { name: "saturacion_o2", value: "98" },
    });
    fireEvent.change(screen.getByLabelText(/temperatura/i), {
      target: { name: "temperatura", value: "37" },
    });
    fireEvent.change(screen.getByLabelText(/presión/i), {
      target: { name: "presion", value: "120/80" },
    });
    fireEvent.change(screen.getByLabelText(/nivel de dolor/i), {
      target: { name: "nivel_de_dolor", value: "3" },
    });

    fireEvent.click(screen.getByRole("button", { name: /guardar/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:3000/api/v1/vitals/789",
        expect.objectContaining({ method: "POST" }),
      );
      expect(mockNavigate).toHaveBeenCalledWith(
        "/dashboard",
        expect.anything(),
      );
    });
  });

  it("shows error alert when API returns error", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ message: "Paciente no encontrado" }),
    });
    renderRegisterVitals("999");

    fireEvent.change(screen.getByLabelText(/frecuencia cardiaca/i), {
      target: { name: "frecuencia_cardiaca", value: "75" },
    });
    fireEvent.change(screen.getByLabelText(/frecuencia respiratoria/i), {
      target: { name: "frecuencia_respiratoria", value: "18" },
    });
    fireEvent.change(screen.getByLabelText(/saturación o2/i), {
      target: { name: "saturacion_o2", value: "98" },
    });
    fireEvent.change(screen.getByLabelText(/temperatura/i), {
      target: { name: "temperatura", value: "37" },
    });
    fireEvent.change(screen.getByLabelText(/presión/i), {
      target: { name: "presion", value: "120/80" },
    });
    fireEvent.change(screen.getByLabelText(/nivel de dolor/i), {
      target: { name: "nivel_de_dolor", value: "3" },
    });

    fireEvent.click(screen.getByRole("button", { name: /guardar/i }));

    await waitFor(() => {
      expect(screen.getByText("Paciente no encontrado")).toBeInTheDocument();
    });
  });
});
