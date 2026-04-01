import { validateVitals } from '../../src/helpers/validatorVitals.js';

const validVitals = () => ({
  frecuencia_cardiaca: 80,
  frecuencia_respiratoria: 16,
  saturacion_o2: 98,
  temperatura: 36.5,
  presion: '120/80',
  nivel_de_conciencia: 'Alerta',
  nivel_de_dolor: 2,
});

describe('validateVitals', () => {
  it('retorna null cuando todos los campos son válidos', () => {
    expect(validateVitals(validVitals())).toBeNull();
  });

  describe('frecuencia_cardiaca', () => {
    it('retorna error cuando es una cadena de texto', () => {
      const result = validateVitals({ ...validVitals(), frecuencia_cardiaca: '80' });
      expect(result).toHaveProperty('frecuencia_cardiaca');
    });

    it('retorna error cuando es un número decimal', () => {
      const result = validateVitals({ ...validVitals(), frecuencia_cardiaca: 80.5 });
      expect(result).toHaveProperty('frecuencia_cardiaca');
    });

    it('retorna error cuando está fuera del rango (< 20)', () => {
      const result = validateVitals({ ...validVitals(), frecuencia_cardiaca: 19 });
      expect(result).toHaveProperty('frecuencia_cardiaca');
    });

    it('retorna error cuando está fuera del rango (> 300)', () => {
      const result = validateVitals({ ...validVitals(), frecuencia_cardiaca: 301 });
      expect(result).toHaveProperty('frecuencia_cardiaca');
    });

    it('acepta el valor mínimo 20', () => {
      expect(validateVitals({ ...validVitals(), frecuencia_cardiaca: 20 })).toBeNull();
    });

    it('acepta el valor máximo 300', () => {
      expect(validateVitals({ ...validVitals(), frecuencia_cardiaca: 300 })).toBeNull();
    });
  });

  describe('frecuencia_respiratoria', () => {
    it('retorna error cuando es una cadena de texto', () => {
      const result = validateVitals({ ...validVitals(), frecuencia_respiratoria: '16' });
      expect(result).toHaveProperty('frecuencia_respiratoria');
    });

    it('retorna error cuando es un decimal', () => {
      const result = validateVitals({ ...validVitals(), frecuencia_respiratoria: 16.5 });
      expect(result).toHaveProperty('frecuencia_respiratoria');
    });

    it('retorna error cuando está fuera de rango (< 1)', () => {
      const result = validateVitals({ ...validVitals(), frecuencia_respiratoria: 0 });
      expect(result).toHaveProperty('frecuencia_respiratoria');
    });

    it('retorna error cuando está fuera de rango (> 60)', () => {
      const result = validateVitals({ ...validVitals(), frecuencia_respiratoria: 61 });
      expect(result).toHaveProperty('frecuencia_respiratoria');
    });

    it('acepta el valor mínimo 1', () => {
      expect(validateVitals({ ...validVitals(), frecuencia_respiratoria: 1 })).toBeNull();
    });

    it('acepta el valor máximo 60', () => {
      expect(validateVitals({ ...validVitals(), frecuencia_respiratoria: 60 })).toBeNull();
    });
  });

  describe('saturacion_o2', () => {
    it('retorna error cuando es una cadena de texto', () => {
      const result = validateVitals({ ...validVitals(), saturacion_o2: '98' });
      expect(result).toHaveProperty('saturacion_o2');
    });

    it('retorna error con más de un decimal', () => {
      const result = validateVitals({ ...validVitals(), saturacion_o2: 98.55 });
      expect(result).toHaveProperty('saturacion_o2');
    });

    it('retorna error cuando está fuera de rango (< 50)', () => {
      const result = validateVitals({ ...validVitals(), saturacion_o2: 49 });
      expect(result).toHaveProperty('saturacion_o2');
    });

    it('retorna error cuando está fuera de rango (> 100)', () => {
      const result = validateVitals({ ...validVitals(), saturacion_o2: 101 });
      expect(result).toHaveProperty('saturacion_o2');
    });

    it('acepta el valor mínimo 50', () => {
      expect(validateVitals({ ...validVitals(), saturacion_o2: 50 })).toBeNull();
    });

    it('acepta el valor máximo 100', () => {
      expect(validateVitals({ ...validVitals(), saturacion_o2: 100 })).toBeNull();
    });

    it('acepta un decimal (ej: 98.5)', () => {
      expect(validateVitals({ ...validVitals(), saturacion_o2: 98.5 })).toBeNull();
    });
  });

  describe('temperatura', () => {
    it('retorna error cuando es una cadena de texto', () => {
      const result = validateVitals({ ...validVitals(), temperatura: '36.5' });
      expect(result).toHaveProperty('temperatura');
    });

    it('retorna error con más de un decimal', () => {
      const result = validateVitals({ ...validVitals(), temperatura: 36.55 });
      expect(result).toHaveProperty('temperatura');
    });

    it('retorna error cuando está fuera de rango (< 25.0)', () => {
      const result = validateVitals({ ...validVitals(), temperatura: 24.9 });
      expect(result).toHaveProperty('temperatura');
    });

    it('retorna error cuando está fuera de rango (> 45.0)', () => {
      const result = validateVitals({ ...validVitals(), temperatura: 45.1 });
      expect(result).toHaveProperty('temperatura');
    });

    it('acepta el valor mínimo 25.0', () => {
      expect(validateVitals({ ...validVitals(), temperatura: 25.0 })).toBeNull();
    });

    it('acepta el valor máximo 45.0', () => {
      expect(validateVitals({ ...validVitals(), temperatura: 45.0 })).toBeNull();
    });
  });

  describe('presion', () => {
    it('retorna error cuando no es una cadena', () => {
      const result = validateVitals({ ...validVitals(), presion: 120 });
      expect(result).toHaveProperty('presion');
    });

    it('retorna error con formato incorrecto (sin barra)', () => {
      const result = validateVitals({ ...validVitals(), presion: '12080' });
      expect(result).toHaveProperty('presion');
    });

    it('retorna error con formato incorrecto (solo un dígito por lado)', () => {
      const result = validateVitals({ ...validVitals(), presion: '1/8' });
      expect(result).toHaveProperty('presion');
    });

    it('retorna error cuando sistólica está fuera de rango (< 50)', () => {
      const result = validateVitals({ ...validVitals(), presion: '49/30' });
      expect(result).toHaveProperty('presion');
    });

    it('retorna error cuando sistólica está fuera de rango (> 300)', () => {
      const result = validateVitals({ ...validVitals(), presion: '301/80' });
      expect(result).toHaveProperty('presion');
    });

    it('retorna error cuando diastólica está fuera de rango (< 20)', () => {
      const result = validateVitals({ ...validVitals(), presion: '120/19' });
      expect(result).toHaveProperty('presion');
    });

    it('retorna error cuando diastólica está fuera de rango (> 200)', () => {
      const result = validateVitals({ ...validVitals(), presion: '220/201' });
      expect(result).toHaveProperty('presion');
    });

    it('retorna error cuando diastólica >= sistólica', () => {
      const result = validateVitals({ ...validVitals(), presion: '80/80' });
      expect(result).toHaveProperty('presion');
    });

    it('acepta formato válido "120/80"', () => {
      expect(validateVitals({ ...validVitals(), presion: '120/80' })).toBeNull();
    });

    it('acepta formato válido con 3 dígitos "200/100"', () => {
      expect(validateVitals({ ...validVitals(), presion: '200/100' })).toBeNull();
    });
  });

  describe('nivel_de_conciencia', () => {
    it('retorna error cuando no es una cadena', () => {
      const result = validateVitals({ ...validVitals(), nivel_de_conciencia: 1 });
      expect(result).toHaveProperty('nivel_de_conciencia');
    });

    it('retorna error cuando es un valor no permitido', () => {
      const result = validateVitals({ ...validVitals(), nivel_de_conciencia: 'Dormido' });
      expect(result).toHaveProperty('nivel_de_conciencia');
    });

    it('acepta "Alerta"', () => {
      expect(validateVitals({ ...validVitals(), nivel_de_conciencia: 'Alerta' })).toBeNull();
    });

    it('acepta "Confuso"', () => {
      expect(validateVitals({ ...validVitals(), nivel_de_conciencia: 'Confuso' })).toBeNull();
    });

    it('acepta "Responde a la voz"', () => {
      expect(validateVitals({ ...validVitals(), nivel_de_conciencia: 'Responde a la voz' })).toBeNull();
    });

    it('acepta "Responde al dolor"', () => {
      expect(validateVitals({ ...validVitals(), nivel_de_conciencia: 'Responde al dolor' })).toBeNull();
    });

    it('acepta "Sin respuesta" con dolor = 0', () => {
      expect(validateVitals({ ...validVitals(), nivel_de_conciencia: 'Sin respuesta', nivel_de_dolor: 0 })).toBeNull();
    });
  });

  describe('nivel_de_dolor', () => {
    it('retorna error cuando es una cadena de texto', () => {
      const result = validateVitals({ ...validVitals(), nivel_de_dolor: '5' });
      expect(result).toHaveProperty('nivel_de_dolor');
    });

    it('retorna error cuando es un decimal', () => {
      const result = validateVitals({ ...validVitals(), nivel_de_dolor: 5.5 });
      expect(result).toHaveProperty('nivel_de_dolor');
    });

    it('retorna error cuando está fuera de rango (< 0)', () => {
      const result = validateVitals({ ...validVitals(), nivel_de_dolor: -1 });
      expect(result).toHaveProperty('nivel_de_dolor');
    });

    it('retorna error cuando está fuera de rango (> 10)', () => {
      const result = validateVitals({ ...validVitals(), nivel_de_dolor: 11 });
      expect(result).toHaveProperty('nivel_de_dolor');
    });

    it('retorna error cuando nivel de conciencia es "Sin respuesta" y dolor > 0', () => {
      const result = validateVitals({
        ...validVitals(),
        nivel_de_conciencia: 'Sin respuesta',
        nivel_de_dolor: 3,
      });
      expect(result).toHaveProperty('nivel_de_dolor');
    });

    it('acepta el valor mínimo 0', () => {
      expect(validateVitals({ ...validVitals(), nivel_de_dolor: 0 })).toBeNull();
    });

    it('acepta el valor máximo 10', () => {
      expect(validateVitals({ ...validVitals(), nivel_de_dolor: 10 })).toBeNull();
    });
  });
});
