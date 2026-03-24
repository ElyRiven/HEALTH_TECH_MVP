import { pool } from '../db.js';
import { validatePacient } from '../helpers/validator.js';
import { parseISO, format } from 'date-fns';

export const CreatePacient = async (req, res) => {
    try {
        let { identificacion, nombres, apellidos, fecha_de_nacimiento, genero, criticidad, hora_de_registro, estado } = req.body;

        const validationErrors = validatePacient({
            identificacion,
            nombres,
            apellidos,
            fecha_de_nacimiento,
            genero,
            criticidad,
            hora_de_registro,
            estado
        });

        if (validationErrors) {
            return res.status(400).json({ message: "Error de validación", errors: validationErrors });
        }

        hora_de_registro = hora_de_registro ? format(parseISO(hora_de_registro), "yyyy-MM-dd'T'HH:mm:ssXXX") : hora_de_registro;

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
            RETURNING identificacion;
        `;

        const values = [identificacion, nombres, apellidos, fecha_de_nacimiento, genero, criticidad, hora_de_registro, estado];

        try {
            const { rows } = await pool.query(query, values);

            res.status(201).json({ message: "Paciente registrado exitosamente", id: rows[0].identificacion });
        } catch (error) {
            if (error.code === '23505') { 
                return res.status(409).json({ message: "Identificación duplicada" });
            }
            throw error; 
        }
    } catch (error) {
        res.status(500).json({ message: "Error al crear el paciente", error: error.message });
    }
};