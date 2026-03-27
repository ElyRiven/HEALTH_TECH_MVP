import validator from 'validator';

function validatePacient(pacient) {
    const errors = {};

    if (!Number.isInteger(pacient.identificacion)) {
        errors.identificacion = 'El id debe ser un número';
    }

    if (typeof pacient.nombres !== 'string' || !validator.isLength(pacient.nombres, { min: 1, max: 100 })) {
        errors.nombres = 'Debe escribir tus nombres';
    }

    if (typeof pacient.apellidos !== 'string' || !validator.isLength(pacient.apellidos, { min: 1, max: 100 })) {
        errors.apellidos = 'Debe escribir tus apellidos';
    }

    if (!pacient.fecha_de_nacimiento || !/^\d{4}-\d{2}-\d{2}$/.test(pacient.fecha_de_nacimiento)) {
        errors.fecha_de_nacimiento = 'Debe tener un formato de yyyy-MM-dd';
    }

    if (typeof pacient.genero !== 'string' || !validator.isLength(pacient.genero, { min: 1, max: 50 })) {
        errors.genero = 'Debes poner genero: masculino, femenino u otro';
    }

    if (!pacient.hora_de_registro || typeof pacient.hora_de_registro !== 'string' || !validator.isISO8601(pacient.hora_de_registro)) {
        errors.hora_de_registro = 'Debe ser un formato de fecha y hora válido';
    }

    if (typeof pacient.estado !== 'string' || !validator.isLength(pacient.estado, { min: 1, max: 50 })) {
        errors.estado = 'Debe ser: En espera, Siendo atendido, Finalizado';
    }

    return Object.keys(errors).length > 0 ? errors : null;
}

export { validatePacient };