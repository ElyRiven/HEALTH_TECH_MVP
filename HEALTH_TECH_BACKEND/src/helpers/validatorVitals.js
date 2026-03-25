import validator from 'validator';

function validateVitals(data) {
    const errors = {};

    if (typeof data.frecuencia_cardiaca === 'string') {
        errors.frecuencia_cardiaca = 'Debe ser un número entero, no otro tipo de dato';
    } else if (!validator.isFloat(String(data.frecuencia_cardiaca))) {
        errors.frecuencia_cardiaca = 'Debe ser un número (puede tener decimales)';
    } else if (!validator.isFloat(String(data.frecuencia_cardiaca), { min: 0, max: 300 })) {
        errors.frecuencia_cardiaca = 'Debe ser un número entre 0 y 300';
    }

    if (typeof data.frecuencia_respiratoria === 'string') {
        errors.frecuencia_respiratoria = 'Debe ser un número, no un texto: respiraciones por minuto';
    } else if (!validator.isFloat(String(data.frecuencia_respiratoria))) {
        errors.frecuencia_respiratoria = 'Debe ser un número (puede tener decimales)';
    } else if (!validator.isFloat(String(data.frecuencia_respiratoria), { min: 0, max: 100 })) {
        errors.frecuencia_respiratoria = 'Debe ser un número entre 0 y 100';
    }

    if (typeof data.saturacion_o2 === 'string') {
        errors.saturacion_o2 = 'Debe ser un número, no un texto';
    } else if (!validator.isFloat(String(data.saturacion_o2))) {
        errors.saturacion_o2 = 'Debe ser un número (puede tener decimales)';
    } else if (!validator.isFloat(String(data.saturacion_o2), { min: 0, max: 100 })) {
        errors.saturacion_o2 = 'Debe ser un número entre 0 y 100';
    }

    if (typeof data.temperatura === 'string') {
        errors.temperatura = 'Debe ser un número, no un texto';
    } else if (!validator.isFloat(String(data.temperatura))) {
        errors.temperatura = 'Debe ser un número (puede tener decimales)';
    } else if (!validator.isFloat(String(data.temperatura), { min: 20, max: 45 })) {
        errors.temperatura = 'Debe ser un número entre 20 y 45';
    }

    if (typeof data.presion !== 'string' || !validator.matches(data.presion, /^\d{2,3}\/\d{2,3}$/)) {
        errors.presion = "Debe tener el formato 'sistólica/diastólica' (ej: 120/80)";
    }

    if (typeof data.nivel_de_conciencia === 'string') {
        errors.nivel_de_conciencia = 'Debe ser un número entero, no un texto';
    } else if (!validator.isInt(String(data.nivel_de_conciencia))) {
        errors.nivel_de_conciencia = 'Debe ser un número entero';
    } else if (!validator.isInt(String(data.nivel_de_conciencia), { min: 1, max: 15 })) {
        errors.nivel_de_conciencia = 'Debe ser un número entre 1 y 15 (escala Glasgow)';
    }

    if (typeof data.nivel_de_dolor === 'string') {
        errors.nivel_de_dolor = 'Debe ser un número entero, no un texto';
    } else if (!validator.isInt(String(data.nivel_de_dolor))) {
        errors.nivel_de_dolor = 'Debe ser un número entero';
    } else if (!validator.isInt(String(data.nivel_de_dolor), { min: 0, max: 10 })) {
        errors.nivel_de_dolor = 'Debe ser un número entre 0 y 10';
    }

    return Object.keys(errors).length > 0 ? errors : null;
}

export { validateVitals };
