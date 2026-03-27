import { pool } from '../db.js';
import { validatePacient } from '../helpers/validator.js';
import { validateVitals } from '../helpers/validatorVitals.js';
import { adaptToTimeFormat } from '../helpers/timeAdapter.js';

export const GetPacient = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ message: "El id debe ser un número entero válido" });
        }
        const { rows } = await pool.query(
            'SELECT identificacion FROM public.pacientes WHERE identificacion = $1',
            [id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ message: "Paciente no encontrado" });
        }
        res.status(200).json({ id: rows[0].identificacion });
    } catch (error) {
        res.status(500).json({ message: "Error al buscar el paciente", error: error.message });
    }
};

export const CreatePacient = async (req,res) => {
    try {
        if ('hora_de_registro' in req.body) {
            return res.status(400).json({ 
                message: "Error de validación", 
                errors: { hora_de_registro: "Este campo es generado automáticamente por el servidor y no debe enviarse" } 
            });
        }

        let { identificacion, nombres, apellidos, fecha_de_nacimiento, genero, criticidad, estado } = req.body;

        const hora_de_registro = adaptToTimeFormat(new Date());

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

export const CreateVitalsPacient = async (req, res) => {
    try {
        if (!req.body || typeof req.body !== 'object') {
            return res.status(400).json({
                message: 'El cuerpo de la petición no es un JSON válido. Verifica el formato en tu cliente (ej: Postman) y que el header Content-Type sea application/json.'
            });
        }
        
        let { patientId } = req.params;
        if (typeof patientId === 'string') {
            patientId = patientId.replace(/^:/, ''); 
        }
        patientId = parseInt(patientId, 10);
        if (isNaN(patientId)) {
            return res.status(400).json({
                message: "El patientId debe ser un número entero válido",
                patientId: req.params.patientId
            });
        }
        const {
            frecuencia_cardiaca,
            frecuencia_respiratoria,
            saturacion_o2,
            temperatura,
            presion,
            nivel_de_conciencia,
            nivel_de_dolor
        } = req.body;

        const camposObligatorios = {
            patientId,
            frecuencia_cardiaca,
            frecuencia_respiratoria,
            saturacion_o2,
            temperatura,
            presion,
            nivel_de_conciencia,
            nivel_de_dolor
        };

        const camposFaltantes = Object.entries(camposObligatorios)
            .filter(([_, valor]) => valor === undefined || valor === null || valor === '')
            .map(([campo, _]) => campo);

        if (camposFaltantes.length > 0) {
            return res.status(400).json({
                message: "Campos obligatorios faltantes",
                campos_faltantes: camposFaltantes
            });
        }

        const erroresValidacion = validateVitals({
            frecuencia_cardiaca,
            frecuencia_respiratoria,
            saturacion_o2,
            temperatura,
            presion,
            nivel_de_conciencia,
            nivel_de_dolor
        });

        if (erroresValidacion) {
            return res.status(422).json({
                message: "Los datos no cumplen con las validaciones",
                errores: erroresValidacion
            });
        }

        const checkPatientQuery = 'SELECT 1 FROM public.pacientes WHERE identificacion = $1';
        const patientResult = await pool.query(checkPatientQuery, [patientId]);
        
        if (patientResult.rowCount === 0) {
            return res.status(404).json({
                message: "El paciente con Id enviado no fue encontrado",
                id_paciente: patientId
            });
        }

        const insertQuery = `
            INSERT INTO constantes_vitales (
                id_paciente,
                frecuencia_cardiaca,
                frecuencia_respiratoria,
                saturacion_o2,
                temperatura,
                presion,
                nivel_de_conciencia,
                nivel_de_dolor
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `;
        
        const values = [
            patientId,
            parseFloat(frecuencia_cardiaca),
            parseFloat(frecuencia_respiratoria),
            parseFloat(saturacion_o2),
            parseFloat(temperatura),
            presion,
            nivel_de_conciencia,
            parseInt(nivel_de_dolor)
        ];

        const { rows } = await pool.query(insertQuery, values);
        
        return res.status(201).json({
            message: "Signos vitales registrados exitosamente",
            data: rows[0]
        });

    } catch (error) {
        console.error("Error al registrar signos vitales:", error);
        return res.status(500).json({
            message: "Error interno al registrar constantes vitales",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};