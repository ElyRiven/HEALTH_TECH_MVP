import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "../test-utils";
import PatientTable from "../../components/PatientTable";
import type { UseGetListPacients } from "../../hooks/useGetListPacients/types";
import { useGetListPacients } from "../../hooks/useGetListPacients/useGetListPacients";

const mockFetchPacients = vi.fn();

vi.mock("../../hooks/useGetListPacients/useGetListPacients", () => ({
  useGetListPacients: vi.fn(),
}));

const mockHook = useGetListPacients as ReturnType<typeof vi.fn>;

function setHookState(state: Partial<UseGetListPacients>) {
  mockHook.mockReturnValue({
    pacients: [],
    loading: false,
    error: null,
    fetchPacients: mockFetchPacients,
    ...state,
  });
}

describe("PatientTable", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading text when loading=true", () => {
    setHookState({ loading: true });
    render(<PatientTable />);
    expect(screen.getByText(/cargando pacientes/i)).toBeInTheDocument();
  });

  it("shows error message when error is set", () => {
    setHookState({ error: "Error al obtener pacientes" });
    render(<PatientTable />);
    expect(screen.getByText("Error al obtener pacientes")).toBeInTheDocument();
  });

  it("shows empty state message when no patients", () => {
    setHookState({ pacients: [] });
    render(<PatientTable />);
    expect(screen.getByText(/no hay pacientes en espera/i)).toBeInTheDocument();
  });

  it("shows register link in empty state", () => {
    setHookState({ pacients: [] });
    render(<PatientTable />);
    const link = screen.getByRole("link", {
      name: /registra tu primer paciente/i,
    });
    expect(link).toHaveAttribute("href", "/register");
  });

  it("renders a table with patient data", () => {
    setHookState({
      pacients: [
        {
          identificacion: 1,
          nombres: "María",
          apellidos: "González",
          criticidad: 1,
          criticidadDenominacion: "Emergencia",
          criticidadColor: "manchester-criticidad-1",
          fecha_de_nacimiento: "1990-01-01",
          genero: "mujer",
          hora_de_registro: "10:00",
          estado: "En espera",
        },
      ],
    });
    render(<PatientTable />);
    expect(screen.getByText("María")).toBeInTheDocument();
    expect(screen.getByText("González")).toBeInTheDocument();
    expect(screen.getByText("Emergencia")).toBeInTheDocument();
  });

  it("renders multiple patients", () => {
    setHookState({
      pacients: [
        {
          identificacion: 1,
          nombres: "Juan",
          apellidos: "Perez",
          criticidad: 1,
          criticidadDenominacion: "Emergencia",
          criticidadColor: "manchester-criticidad-1",
          fecha_de_nacimiento: "1990-01-01",
          genero: "hombre",
          hora_de_registro: "10:00",
          estado: "En espera",
        },
        {
          identificacion: 2,
          nombres: "Ana",
          apellidos: "Lopez",
          criticidad: 3,
          criticidadDenominacion: "Urgente",
          criticidadColor: "manchester-criticidad-3",
          fecha_de_nacimiento: "1985-05-20",
          genero: "mujer",
          hora_de_registro: "11:00",
          estado: "En espera",
        },
      ],
    });
    render(<PatientTable />);
    expect(screen.getByText("Juan")).toBeInTheDocument();
    expect(screen.getByText("Ana")).toBeInTheDocument();
  });

  it("table header shows Nombres, Apellidos, Criticidad columns", () => {
    setHookState({ pacients: [] });
    render(<PatientTable />);
    // When empty state, no table rendered, check with a patient
    setHookState({
      pacients: [
        {
          identificacion: 1,
          nombres: "X",
          apellidos: "Y",
          criticidad: 1,
          criticidadDenominacion: "Emergencia",
          criticidadColor: "",
          fecha_de_nacimiento: "2000-01-01",
          genero: "hombre",
          hora_de_registro: "10:00",
          estado: "En espera",
        },
      ],
    });
    render(<PatientTable />);
    expect(screen.getByText("Nombres")).toBeInTheDocument();
    expect(screen.getByText("Apellidos")).toBeInTheDocument();
    expect(screen.getByText("Criticidad")).toBeInTheDocument();
  });

  it("sort button calls fetchPacients with toggled order", async () => {
    setHookState({
      pacients: [
        {
          identificacion: 1,
          nombres: "Juan",
          apellidos: "Perez",
          criticidad: 1,
          criticidadDenominacion: "Emergencia",
          criticidadColor: "",
          fecha_de_nacimiento: "1990-01-01",
          genero: "hombre",
          hora_de_registro: "10:00",
          estado: "En espera",
        },
      ],
    });
    render(<PatientTable />);
    const sortBtn = screen.getByRole("button", { name: /criticidad/i });
    fireEvent.click(sortBtn);
    await waitFor(() => expect(mockFetchPacients).toHaveBeenCalledWith("DESC"));
  });

  it("sort button toggles back to ASC on second click", async () => {
    setHookState({
      pacients: [
        {
          identificacion: 1,
          nombres: "Juan",
          apellidos: "Perez",
          criticidad: 1,
          criticidadDenominacion: "Emergencia",
          criticidadColor: "",
          fecha_de_nacimiento: "1990-01-01",
          genero: "hombre",
          hora_de_registro: "10:00",
          estado: "En espera",
        },
      ],
    });
    render(<PatientTable />);
    const sortBtn = screen.getByRole("button", { name: /criticidad/i });
    fireEvent.click(sortBtn);
    fireEvent.click(sortBtn);
    await waitFor(() =>
      expect(mockFetchPacients).toHaveBeenLastCalledWith("ASC"),
    );
  });
});
