import type { PacientForm } from "./types";
import { API_BASE_URL } from "@/config/api";

export const API_URL = `${API_BASE_URL}/api/v1/pacients`;

export const initialForm: PacientForm = {
  identificacion: "",
  nombres: "",
  apellidos: "",
  fecha_de_nacimiento: "",
  genero: "hombre",
};
