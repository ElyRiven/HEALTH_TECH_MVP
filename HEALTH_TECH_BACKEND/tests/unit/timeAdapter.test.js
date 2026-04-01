import { adaptToTimeFormat } from '../../src/helpers/timeAdapter.js';

describe('adaptToTimeFormat', () => {
  describe('cuando recibe un objeto Date', () => {
    it('retorna una cadena ISO 8601 válida', () => {
      const date = new Date('2024-06-15T10:30:00.000Z');
      const result = adaptToTimeFormat(date);
      expect(result).toBe('2024-06-15T10:30:00.000Z');
    });

    it('retorna una cadena con formato terminado en Z (UTC)', () => {
      const date = new Date();
      const result = adaptToTimeFormat(date);
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    });
  });

  describe('cuando recibe una cadena de fecha', () => {
    it('parsea una cadena ISO y retorna el mismo formato', () => {
      const result = adaptToTimeFormat('2024-01-01T00:00:00.000Z');
      expect(result).toBe('2024-01-01T00:00:00.000Z');
    });

    it('parsea una cadena de fecha válida', () => {
      const result = adaptToTimeFormat('2023-12-25');
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    });

    it('usa la fecha actual cuando la cadena es inválida', () => {
      const before = Date.now();
      const result = adaptToTimeFormat('una-cadena-invalida');
      const after = Date.now();
      const resultTime = new Date(result).getTime();
      expect(resultTime).toBeGreaterThanOrEqual(before);
      expect(resultTime).toBeLessThanOrEqual(after);
    });
  });

  describe('cuando recibe un tipo no reconocido', () => {
    it('retorna la fecha actual en formato ISO cuando se pasa null', () => {
      const before = Date.now();
      const result = adaptToTimeFormat(null);
      const after = Date.now();
      const resultTime = new Date(result).getTime();
      expect(resultTime).toBeGreaterThanOrEqual(before);
      expect(resultTime).toBeLessThanOrEqual(after);
    });

    it('retorna la fecha actual en formato ISO cuando se pasa un número', () => {
      const before = Date.now();
      const result = adaptToTimeFormat(123);
      const after = Date.now();
      const resultTime = new Date(result).getTime();
      expect(resultTime).toBeGreaterThanOrEqual(before);
      expect(resultTime).toBeLessThanOrEqual(after);
    });

    it('retorna la fecha actual en formato ISO cuando no se pasa argumento', () => {
      const before = Date.now();
      const result = adaptToTimeFormat(undefined);
      const after = Date.now();
      const resultTime = new Date(result).getTime();
      expect(resultTime).toBeGreaterThanOrEqual(before);
      expect(resultTime).toBeLessThanOrEqual(after);
    });
  });
});
