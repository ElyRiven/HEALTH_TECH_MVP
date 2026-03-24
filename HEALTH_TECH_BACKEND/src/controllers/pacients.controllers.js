import { pool } from '../db.js';

export const CreatePacient = async (req, res) => {
    try {
        // Extraer los datos del cuerpo de la solicitud
        const { identificacion, nombres, apellidos, fecha_de_nacimiento, genero, criticidad, hora_de_registro, estado } = req.body;

        // Validar que todos los campos requeridos estén presentes
        if (!identificacion || !nombres || !apellidos || !fecha_de_nacimiento || !genero || !criticidad || !hora_de_registro || !estado) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        // Consulta SQL para insertar un nuevo paciente
        const query = `
            INSERT INTO public.pacientes (
                identificacion,
                nombres,
                apellidos,
                fecha_de_nacimiento,
                genero,
                criticidad,
                hora_de_registro,
                estado
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `;

        const values = [identificacion, nombres, apellidos, fecha_de_nacimiento, genero, criticidad, hora_de_registro, estado];

        // Ejecutar la consulta
        const { rows } = await pool.query(query, values);

        // Responder con el paciente creado
        res.status(201).json({ message: "Paciente creado exitosamente", paciente: rows[0] });
    } catch (error) {
        // Manejo de errores
        res.status(500).json({ message: "Error al crear el paciente", error: error.message });
    }
};