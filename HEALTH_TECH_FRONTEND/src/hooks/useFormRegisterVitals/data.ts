import type { VitalsForm } from "./types";
import { API_BASE_URL } from "@/config/api";

export const API_URL = (patientId: string) =>
  `${API_BASE_URL}/api/v1/vitals/${patientId}`;

export const initialForm: VitalsForm = {
  frecuencia_cardiaca: "",
  frecuencia_respiratoria: "",
  saturacion_o2: "",
  temperatura: "",
  presion: "",
  nivel_de_conciencia: "Alerta",
  nivel_de_dolor: "",
};

export const NIVEL_CONCIENCIA_OPTIONS = [
  "Alerta",
  "Confuso",
  "Responde a la voz",
  "Responde al dolor",
  "Sin respuesta",
];
