import { pool } from '../db.js';
import { validatePacient } from '../helpers/validator.js';
import { validateVitals } from '../helpers/validatorVitals.js';
import { adaptToTimeFormat } from '../helpers/timeAdapter.js';
import { classifyTriage } from '../helpers/TriageEngine.js';

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

        if ('criticidad' in req.body) {
            return res.status(400).json({
                message: "Error de validación",
                errors: { criticidad: "Este campo es calculado automáticamente por el sistema al registrar los signos vitales y no debe enviarse" }
            });
        }

        let { identificacion, nombres, apellidos, fecha_de_nacimiento, genero, estado } = req.body;

        const hora_de_registro = adaptToTimeFormat(new Date());

        const validationErrors = validatePacient({
            identificacion,
            nombres,
            apellidos,
            fecha_de_nacimiento,
            genero,
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

        const values = [identificacion, nombres, apellidos, fecha_de_nacimiento, genero, 5, hora_de_registro, estado];

        try {
            const { rows } = await pool.query(query, values);
            console.log('[BACKEND] Insert exitoso, respuesta:', rows);
            res.status(201).json({ message: "Paciente registrado exitosamente", id: rows[0].identificacion });
        } catch (error) {
            console.error('[BACKEND] Error en pool.query:', error);
            if (error.code === '23505') { 
                return res.status(409).json({ message: "Identificación duplicada" });
            }
            // Lanzar el error para que lo capture el catch externo
            throw error; 
        }
    } catch (error) {
        console.error('[BACKEND] Error en CreatePacient:', error);
        res.status(500).json({ message: "Error al crear el paciente", error: error.message, stack: error.stack });
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

        const checkPatientQuery = 'SELECT nombres, apellidos FROM public.pacientes WHERE identificacion = $1';
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

        const triageResult = classifyTriage({
            frecuencia_cardiaca:     parseFloat(frecuencia_cardiaca),
            frecuencia_respiratoria: parseFloat(frecuencia_respiratoria),
            saturacion_o2:           parseFloat(saturacion_o2),
            temperatura:             parseFloat(temperatura),
            presion,
            nivel_de_conciencia,
            nivel_de_dolor:          parseInt(nivel_de_dolor),
        });

        const client = await pool.connect();
        let rows;
        try {
            await client.query('BEGIN');

            const insertResult = await client.query(insertQuery, values);
            rows = insertResult.rows;

            const updateResult = await client.query(
                'UPDATE public.pacientes SET criticidad = $1 WHERE identificacion = $2',
                [triageResult.criticalityLevel, patientId]
            );

            if (updateResult.rowCount === 0) {
                await client.query('ROLLBACK');
                return res.status(404).json({
                    message: "Paciente no encontrado al actualizar criticidad"
                });
            }

            await client.query('COMMIT');
        } catch (txError) {
            await client.query('ROLLBACK');
            throw txError;
        } finally {
            client.release();
        }

        const { nombres, apellidos } = patientResult.rows[0];

        return res.status(201).json({
            message:    "Signos vitales registrados exitosamente",
            criticidad: triageResult,
            data: {
                ...rows[0],
                nombres,
                apellidos,
                criticidad_texto: triageResult.denomination,
            },
        });

    } catch (error) {
        console.error("Error al registrar signos vitales:", error);
        return res.status(500).json({
            message: "Error interno al registrar constantes vitales",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export const GetAllPacients = async (req, res) => {
    try {
        const order = req.query.order?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
        console.log(`[BACKEND] GetAllPacients called with order: ${order}`);

        const queryText = `
            SELECT
                p.identificacion,
                p.nombres,
                p.apellidos,
                TO_CHAR(p.fecha_de_nacimiento, 'YYYY-MM-DD') AS fecha_de_nacimiento,
                p.genero,
                p.criticidad,
                TO_CHAR(p.hora_de_registro::timestamptz, 'HH12:MI:SS AM') AS hora_de_registro,
                p.estado
            FROM public.pacientes p
            WHERE EXISTS (
                SELECT 1 FROM constantes_vitales cv WHERE cv.id_paciente = p.identificacion
            )
            ORDER BY p.criticidad ${order}
        `;
        const { rows } = await pool.query(queryText);

        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ 
            message: "Error al obtener los pacientes", 
            error: error.message 
        });
    }
};


