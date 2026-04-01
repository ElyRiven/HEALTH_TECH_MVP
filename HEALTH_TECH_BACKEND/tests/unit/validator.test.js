import { validatePacient } from '../../src/helpers/validator.js';

const validPacient = () => ({
  identificacion: 123456789,
  nombres: 'Juan',
  apellidos: 'Pérez',
  fecha_de_nacimiento: '1990-05-15',
  genero: 'Masculino',
  hora_de_registro: '2024-06-15T10:30:00.000Z',
  estado: 'En espera',
});

describe('validatePacient', () => {
  it('retorna null cuando todos los campos son válidos', () => {
    expect(validatePacient(validPacient())).toBeNull();
  });

  describe('identificacion', () => {
    it('retorna error cuando identificacion no es entero', () => {
      const result = validatePacient({ ...validPacient(), identificacion: '123abc' });
      expect(result).toHaveProperty('identificacion');
    });

    it('retorna error cuando identificacion es un número flotante', () => {
      const result = validatePacient({ ...validPacient(), identificacion: 12.5 });
      expect(result).toHaveProperty('identificacion');
    });

    it('acepta identificacion como entero positivo', () => {
      const result = validatePacient({ ...validPacient(), identificacion: 1 });
      expect(result).toBeNull();
    });
  });

  describe('nombres', () => {
    it('retorna error cuando nombres está vacío', () => {
      const result = validatePacient({ ...validPacient(), nombres: '' });
      expect(result).toHaveProperty('nombres');
    });

    it('retorna error cuando nombres supera 100 caracteres', () => {
      const result = validatePacient({ ...validPacient(), nombres: 'A'.repeat(101) });
      expect(result).toHaveProperty('nombres');
    });

    it('retorna error cuando nombres no es string', () => {
      const result = validatePacient({ ...validPacient(), nombres: 123 });
      expect(result).toHaveProperty('nombres');
    });

    it('acepta nombres con exactamente 100 caracteres', () => {
      const result = validatePacient({ ...validPacient(), nombres: 'A'.repeat(100) });
      expect(result).toBeNull();
    });
  });

  describe('apellidos', () => {
    it('retorna error cuando apellidos está vacío', () => {
      const result = validatePacient({ ...validPacient(), apellidos: '' });
      expect(result).toHaveProperty('apellidos');
    });

    it('retorna error cuando apellidos supera 100 caracteres', () => {
      const result = validatePacient({ ...validPacient(), apellidos: 'B'.repeat(101) });
      expect(result).toHaveProperty('apellidos');
    });

    it('acepta apellidos con exactamente 1 carácter', () => {
      const result = validatePacient({ ...validPacient(), apellidos: 'Z' });
      expect(result).toBeNull();
    });
  });

  describe('fecha_de_nacimiento', () => {
    it('retorna error cuando fecha no tiene formato yyyy-MM-dd', () => {
      const result = validatePacient({ ...validPacient(), fecha_de_nacimiento: '15-05-1990' });
      expect(result).toHaveProperty('fecha_de_nacimiento');
    });

    it('retorna error cuando año es menor a 1900', () => {
      const result = validatePacient({ ...validPacient(), fecha_de_nacimiento: '1899-12-31' });
      expect(result).toHaveProperty('fecha_de_nacimiento');
    });

    it('acepta fecha con año 1900', () => {
      const result = validatePacient({ ...validPacient(), fecha_de_nacimiento: '1900-01-01' });
      expect(result).toBeNull();
    });

    it('retorna error cuando fecha_de_nacimiento es null', () => {
      const result = validatePacient({ ...validPacient(), fecha_de_nacimiento: null });
      expect(result).toHaveProperty('fecha_de_nacimiento');
    });

    it('retorna error cuando fecha_de_nacimiento está vacía', () => {
      const result = validatePacient({ ...validPacient(), fecha_de_nacimiento: '' });
      expect(result).toHaveProperty('fecha_de_nacimiento');
    });
  });

  describe('genero', () => {
    it('retorna error cuando genero está vacío', () => {
      const result = validatePacient({ ...validPacient(), genero: '' });
      expect(result).toHaveProperty('genero');
    });

    it('retorna error cuando genero supera 50 caracteres', () => {
      const result = validatePacient({ ...validPacient(), genero: 'G'.repeat(51) });
      expect(result).toHaveProperty('genero');
    });

    it('acepta cualquier string de genero válido', () => {
      const result = validatePacient({ ...validPacient(), genero: 'Otro' });
      expect(result).toBeNull();
    });
  });

  describe('hora_de_registro', () => {
    it('retorna error cuando hora_de_registro no es ISO 8601', () => {
      const result = validatePacient({ ...validPacient(), hora_de_registro: '10:30:00' });
      expect(result).toHaveProperty('hora_de_registro');
    });

    it('retorna error cuando hora_de_registro es null', () => {
      const result = validatePacient({ ...validPacient(), hora_de_registro: null });
      expect(result).toHaveProperty('hora_de_registro');
    });

    it('acepta hora_de_registro en formato ISO 8601 con UTC offset', () => {
      const result = validatePacient({ ...validPacient(), hora_de_registro: '2024-06-15T10:30:00+00:00' });
      expect(result).toBeNull();
    });
  });

  describe('estado', () => {
    it('retorna error cuando estado está vacío', () => {
      const result = validatePacient({ ...validPacient(), estado: '' });
      expect(result).toHaveProperty('estado');
    });

    it('retorna error cuando estado supera 50 caracteres', () => {
      const result = validatePacient({ ...validPacient(), estado: 'E'.repeat(51) });
      expect(result).toHaveProperty('estado');
    });

    it('acepta "En espera" como estado', () => {
      const result = validatePacient({ ...validPacient(), estado: 'En espera' });
      expect(result).toBeNull();
    });

    it('acepta "Siendo atendido" como estado', () => {
      const result = validatePacient({ ...validPacient(), estado: 'Siendo atendido' });
      expect(result).toBeNull();
    });

    it('acepta "Finalizado" como estado', () => {
      const result = validatePacient({ ...validPacient(), estado: 'Finalizado' });
      expect(result).toBeNull();
    });
  });

  it('retorna múltiples errores cuando hay varios campos inválidos', () => {
    const result = validatePacient({
      identificacion: 'no-entero',
      nombres: '',
      apellidos: '',
      fecha_de_nacimiento: 'invalida',
      genero: '',
      hora_de_registro: 'no-fecha',
      estado: '',
    });
    expect(result).not.toBeNull();
    expect(Object.keys(result).length).toBeGreaterThan(1);
  });
});
