export interface Pacient {
  identificacion: number;
  nombres: string;
  apellidos: string;
  fecha_de_nacimiento: string;
  genero: string;
  criticidad: number;
  hora_de_registro: string;
  estado: string;
  criticidadColor?: string;
  criticidadDenominacion?: string;
}

export interface UseGetListPacients {
  pacients: Pacient[];
  loading: boolean;
  error: string | null;
  fetchPacients: (order?: 'ASC' | 'DESC') => Promise<void>;
}
