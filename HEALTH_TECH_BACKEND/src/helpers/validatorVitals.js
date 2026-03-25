import validator from 'validator';

const NIVEL_CONCIENCIA_VALORES = ['Alerta', 'Confuso', 'Responde a la voz', 'Responde al dolor', 'Sin respuesta'];

function validateVitals(data) {
    const errors = {};

    if (typeof data.frecuencia_cardiaca === 'string') {
        errors.frecuencia_cardiaca = 'Debe ser un número entero, no un texto';
    } else if (!validator.isInt(String(data.frecuencia_cardiaca))) {
        errors.frecuencia_cardiaca = 'Debe ser un número entero (sin decimales)';
    } else if (!validator.isInt(String(data.frecuencia_cardiaca), { min: 20, max: 300 })) {
        errors.frecuencia_cardiaca = 'Debe ser un número entero entre 20 y 300 bpm';
    }

    if (typeof data.frecuencia_respiratoria === 'string') {
        errors.frecuencia_respiratoria = 'Debe ser un número entero, no un texto';
    } else if (!validator.isInt(String(data.frecuencia_respiratoria))) {
        errors.frecuencia_respiratoria = 'Debe ser un número entero (sin decimales)';
    } else if (!validator.isInt(String(data.frecuencia_respiratoria), { min: 1, max: 60 })) {
        errors.frecuencia_respiratoria = 'Debe ser un número entero entre 1 y 60 rpm';
    }

    if (typeof data.saturacion_o2 === 'string') {
        errors.saturacion_o2 = 'Debe ser un número, no un texto';
    } else if (!validator.isFloat(String(data.saturacion_o2))) {
        errors.saturacion_o2 = 'Debe ser un número (admite un decimal, ej: 98.5)';
    } else if (!/^\d+(\.\d)?$/.test(String(data.saturacion_o2))) {
        errors.saturacion_o2 = 'Admite como máximo un decimal (ej: 98.5)';
    } else if (!validator.isFloat(String(data.saturacion_o2), { min: 50, max: 100 })) {
        errors.saturacion_o2 = 'Debe ser un número entre 50.0 y 100.0 %';
    }

    if (typeof data.temperatura === 'string') {
        errors.temperatura = 'Debe ser un número, no un texto';
    } else if (!validator.isFloat(String(data.temperatura))) {
        errors.temperatura = 'Debe ser un número (admite un decimal, ej: 36.5)';
    } else if (!/^\d+(\.\d)?$/.test(String(data.temperatura))) {
        errors.temperatura = 'Admite como máximo un decimal (ej: 36.5)';
    } else if (!validator.isFloat(String(data.temperatura), { min: 25.0, max: 45.0 })) {
        errors.temperatura = 'Debe ser un número entre 25.0 y 45.0 °C';
    }

    if (typeof data.presion !== 'string') {
        errors.presion = "Debe ser una cadena con el formato 'sistólica/diastólica' (ej: 120/80)";
    } else if (!validator.matches(data.presion, /^\d{2,3}\/\d{2,3}$/)) {
        errors.presion = "Formato inválido. Use 'sistólica/diastólica' con 2 o 3 dígitos cada parte (ej: 120/80)";
    } else {
        const [sistolicaStr, diastolicaStr] = data.presion.split('/');
        const sistolica = parseInt(sistolicaStr, 10);
        const diastolica = parseInt(diastolicaStr, 10);

        if (sistolica < 50 || sistolica > 300) {
            errors.presion = 'La presión sistólica debe estar entre 50 y 300 mmHg';
        } else if (diastolica < 20 || diastolica > 200) {
            errors.presion = 'La presión diastólica debe estar entre 20 y 200 mmHg';
        } else if (diastolica >= sistolica) {
            errors.presion = 'La presión diastólica debe ser menor que la sistólica';
        }
    }

    if (typeof data.nivel_de_conciencia !== 'string') {
        errors.nivel_de_conciencia = `Debe ser uno de los siguientes valores: ${NIVEL_CONCIENCIA_VALORES.join(', ')}`;
    } else if (!NIVEL_CONCIENCIA_VALORES.includes(data.nivel_de_conciencia)) {
        errors.nivel_de_conciencia = `Valor inválido. Valores permitidos: ${NIVEL_CONCIENCIA_VALORES.join(', ')}`;
    }

    if (typeof data.nivel_de_dolor === 'string') {
        errors.nivel_de_dolor = 'Debe ser un número entero, no un texto';
    } else if (!validator.isInt(String(data.nivel_de_dolor))) {
        errors.nivel_de_dolor = 'Debe ser un número entero';
    } else if (!validator.isInt(String(data.nivel_de_dolor), { min: 0, max: 10 })) {
        errors.nivel_de_dolor = 'Debe ser un número entero entre 0 y 10 (escala EVA)';
    } else if (data.nivel_de_conciencia === 'Sin respuesta' && parseInt(String(data.nivel_de_dolor), 10) !== 0) {
        errors.nivel_de_dolor = "Debe ser 0 cuando el nivel de conciencia es 'Sin respuesta'";
    }

    return Object.keys(errors).length > 0 ? errors : null;
}

export { validateVitals };
