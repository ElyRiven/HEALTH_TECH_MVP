import { classifyTriage } from '../../src/helpers/TriageEngine.js';

const validSigns = () => ({
  frecuencia_cardiaca: 75,
  frecuencia_respiratoria: 16,
  saturacion_o2: 98,
  temperatura: 37.0,
  presion: '120/80',
  nivel_de_conciencia: 'Alerta',
  nivel_de_dolor: 0,
});

describe('classifyTriage', () => {
  describe('estructura de respuesta', () => {
    it('retorna un objeto con todos los campos esperados', () => {
      const result = classifyTriage(validSigns());
      expect(result).toHaveProperty('criticalityLevel');
      expect(result).toHaveProperty('color');
      expect(result).toHaveProperty('denomination');
      expect(result).toHaveProperty('maxAttentionTime');
      expect(result).toHaveProperty('criticalSigns');
      expect(result).toHaveProperty('classificationDetail');
    });

    it('criticalSigns es un array', () => {
      const result = classifyTriage(validSigns());
      expect(Array.isArray(result.criticalSigns)).toBe(true);
    });

    it('classificationDetail contiene todos los signos', () => {
      const result = classifyTriage(validSigns());
      expect(result.classificationDetail).toHaveProperty('heartRate');
      expect(result.classificationDetail).toHaveProperty('respiratoryRate');
      expect(result.classificationDetail).toHaveProperty('spo2');
      expect(result.classificationDetail).toHaveProperty('temperature');
      expect(result.classificationDetail).toHaveProperty('bloodPressure');
      expect(result.classificationDetail).toHaveProperty('consciousnessLevel');
      expect(result.classificationDetail).toHaveProperty('painLevel');
    });
  });

  describe('nivel NO_URGENTE (5 - Azul)', () => {
    it('clasifica signos normales como No Urgente', () => {
      const result = classifyTriage(validSigns());
      expect(result.criticalityLevel).toBe(5);
      expect(result.denomination).toBe('No Urgente');
      expect(result.color).toBe('🔵 Azul');
      expect(result.maxAttentionTime).toBe('240 minutos');
    });

    it('clasifica dolor 3 como No Urgente cuando el resto de signos son normales', () => {
      // dolor 3 → MENOS_URGENTE(4), pero MIN(...all 5s, 4) = 4 → Menos Urgente
      const result = classifyTriage({ ...validSigns(), nivel_de_dolor: 3 });
      // dolor 0-3 → NO_URGENTE(5), so all signs remain at level 5
      expect(result.criticalityLevel).toBe(5);
    });
  });

  describe('nivel MENOS_URGENTE (4 - Verde)', () => {
    it('clasifica dolor de 4 como menos urgente', () => {
      const result = classifyTriage({ ...validSigns(), nivel_de_dolor: 4 });
      expect(result.criticalityLevel).toBe(4);
      expect(result.denomination).toBe('Menos Urgente');
    });

    it('clasifica temperatura 38.0 como menos urgente', () => {
      const result = classifyTriage({ ...validSigns(), temperatura: 38.0 });
      expect(result.criticalityLevel).toBe(4);
    });

    it('clasifica temperatura 38.4 como menos urgente', () => {
      const result = classifyTriage({ ...validSigns(), temperatura: 38.4 });
      expect(result.criticalityLevel).toBe(4);
    });

    it('clasifica presión 140/80 como menos urgente', () => {
      const result = classifyTriage({ ...validSigns(), presion: '140/80' });
      expect(result.criticalityLevel).toBe(4);
    });

    it('clasifica conciencia "Confuso" como menos urgente', () => {
      const result = classifyTriage({ ...validSigns(), nivel_de_conciencia: 'Confuso' });
      expect(result.criticalityLevel).toBe(4);
    });
  });

  describe('nivel URGENTE (3 - Amarillo)', () => {
    it('clasifica frecuencia cardiaca 55 como urgente', () => {
      const result = classifyTriage({ ...validSigns(), frecuencia_cardiaca: 55 });
      expect(result.criticalityLevel).toBe(3);
      expect(result.denomination).toBe('Urgente');
      expect(result.maxAttentionTime).toBe('60 minutos');
    });

    it('clasifica frecuencia cardiaca 110 como urgente', () => {
      const result = classifyTriage({ ...validSigns(), frecuencia_cardiaca: 110 });
      expect(result.criticalityLevel).toBe(3);
    });

    it('clasifica frecuencia respiratoria 11 como urgente', () => {
      const result = classifyTriage({ ...validSigns(), frecuencia_respiratoria: 11 });
      expect(result.criticalityLevel).toBe(3);
    });

    it('clasifica frecuencia respiratoria 25 como urgente', () => {
      const result = classifyTriage({ ...validSigns(), frecuencia_respiratoria: 25 });
      expect(result.criticalityLevel).toBe(3);
    });

    it('clasifica saturacion_o2 90 como urgente', () => {
      const result = classifyTriage({ ...validSigns(), saturacion_o2: 90 });
      expect(result.criticalityLevel).toBe(3);
    });

    it('clasifica temperatura 38.5 como urgente', () => {
      const result = classifyTriage({ ...validSigns(), temperatura: 38.5 });
      expect(result.criticalityLevel).toBe(3);
    });

    it('clasifica presión sistólica 95 como urgente', () => {
      const result = classifyTriage({ ...validSigns(), presion: '95/60' });
      expect(result.criticalityLevel).toBe(3);
    });

    it('clasifica presión sistólica 170 como urgente', () => {
      const result = classifyTriage({ ...validSigns(), presion: '170/90' });
      expect(result.criticalityLevel).toBe(3);
    });

    it('clasifica conciencia "Responde a la voz" como urgente', () => {
      const result = classifyTriage({ ...validSigns(), nivel_de_conciencia: 'Responde a la voz' });
      expect(result.criticalityLevel).toBe(3);
    });

    it('clasifica dolor 7 como urgente', () => {
      const result = classifyTriage({ ...validSigns(), nivel_de_dolor: 7 });
      expect(result.criticalityLevel).toBe(3);
    });

    it('clasifica dolor 8 como urgente', () => {
      const result = classifyTriage({ ...validSigns(), nivel_de_dolor: 8 });
      expect(result.criticalityLevel).toBe(3);
    });
  });

  describe('nivel MUY_URGENTE (2 - Naranja)', () => {
    it('clasifica frecuencia cardiaca 45 como muy urgente', () => {
      const result = classifyTriage({ ...validSigns(), frecuencia_cardiaca: 45 });
      expect(result.criticalityLevel).toBe(2);
      expect(result.denomination).toBe('Muy Urgente');
      expect(result.maxAttentionTime).toBe('10 minutos');
    });

    it('clasifica frecuencia cardiaca 140 como muy urgente', () => {
      const result = classifyTriage({ ...validSigns(), frecuencia_cardiaca: 140 });
      expect(result.criticalityLevel).toBe(2);
    });

    it('clasifica frecuencia respiratoria 9 como muy urgente', () => {
      const result = classifyTriage({ ...validSigns(), frecuencia_respiratoria: 9 });
      expect(result.criticalityLevel).toBe(2);
    });

    it('clasifica frecuencia respiratoria 28 como muy urgente', () => {
      const result = classifyTriage({ ...validSigns(), frecuencia_respiratoria: 28 });
      expect(result.criticalityLevel).toBe(2);
    });

    it('clasifica saturacion_o2 87 como muy urgente', () => {
      const result = classifyTriage({ ...validSigns(), saturacion_o2: 87 });
      expect(result.criticalityLevel).toBe(2);
    });

    it('clasifica temperatura 33.0 como muy urgente', () => {
      const result = classifyTriage({ ...validSigns(), temperatura: 33.0 });
      expect(result.criticalityLevel).toBe(2);
    });

    it('clasifica temperatura 39.5 como muy urgente', () => {
      const result = classifyTriage({ ...validSigns(), temperatura: 39.5 });
      expect(result.criticalityLevel).toBe(2);
    });

    it('clasifica presión sistólica 80 como muy urgente', () => {
      const result = classifyTriage({ ...validSigns(), presion: '80/50' });
      expect(result.criticalityLevel).toBe(2);
    });

    it('clasifica presión sistólica 190 como muy urgente', () => {
      const result = classifyTriage({ ...validSigns(), presion: '190/90' });
      expect(result.criticalityLevel).toBe(2);
    });

    it('clasifica conciencia "Responde al dolor" como muy urgente', () => {
      const result = classifyTriage({ ...validSigns(), nivel_de_conciencia: 'Responde al dolor' });
      expect(result.criticalityLevel).toBe(2);
    });

    it('clasifica dolor 9 como muy urgente', () => {
      const result = classifyTriage({ ...validSigns(), nivel_de_dolor: 9 });
      expect(result.criticalityLevel).toBe(2);
    });

    it('clasifica dolor 10 como muy urgente', () => {
      const result = classifyTriage({ ...validSigns(), nivel_de_dolor: 10 });
      expect(result.criticalityLevel).toBe(2);
    });
  });

  describe('nivel INMEDIATO (1 - Rojo)', () => {
    it('clasifica frecuencia cardiaca < 40 como inmediato', () => {
      const result = classifyTriage({ ...validSigns(), frecuencia_cardiaca: 30 });
      expect(result.criticalityLevel).toBe(1);
      expect(result.denomination).toBe('Inmediato');
      expect(result.color).toBe('🔴 Rojo');
      expect(result.maxAttentionTime).toBe('0 minutos');
    });

    it('clasifica frecuencia cardiaca >= 150 como inmediato', () => {
      const result = classifyTriage({ ...validSigns(), frecuencia_cardiaca: 155 });
      expect(result.criticalityLevel).toBe(1);
    });

    it('clasifica frecuencia respiratoria < 8 como inmediato', () => {
      const result = classifyTriage({ ...validSigns(), frecuencia_respiratoria: 5 });
      expect(result.criticalityLevel).toBe(1);
    });

    it('clasifica frecuencia respiratoria > 30 como inmediato', () => {
      const result = classifyTriage({ ...validSigns(), frecuencia_respiratoria: 35 });
      expect(result.criticalityLevel).toBe(1);
    });

    it('clasifica saturacion_o2 < 85 como inmediato', () => {
      const result = classifyTriage({ ...validSigns(), saturacion_o2: 80 });
      expect(result.criticalityLevel).toBe(1);
    });

    it('clasifica temperatura < 32 como inmediato', () => {
      const result = classifyTriage({ ...validSigns(), temperatura: 30 });
      expect(result.criticalityLevel).toBe(1);
    });

    it('clasifica temperatura > 40 como inmediato', () => {
      const result = classifyTriage({ ...validSigns(), temperatura: 41 });
      expect(result.criticalityLevel).toBe(1);
    });

    it('clasifica presión sistólica < 70 como inmediato', () => {
      const result = classifyTriage({ ...validSigns(), presion: '60/40' });
      expect(result.criticalityLevel).toBe(1);
    });

    it('clasifica presión sistólica > 200 como inmediato', () => {
      const result = classifyTriage({ ...validSigns(), presion: '210/100' });
      expect(result.criticalityLevel).toBe(1);
    });

    it('clasifica presión diastólica > 130 como inmediato', () => {
      const result = classifyTriage({ ...validSigns(), presion: '200/135' });
      expect(result.criticalityLevel).toBe(1);
    });

    it('clasifica conciencia "Sin respuesta" como inmediato', () => {
      const result = classifyTriage({ ...validSigns(), nivel_de_conciencia: 'Sin respuesta', nivel_de_dolor: 0 });
      expect(result.criticalityLevel).toBe(1);
    });
  });

  describe('signos críticos', () => {
    it('incluye "Frecuencia Cardíaca" en criticalSigns cuando es el peor signo', () => {
      const result = classifyTriage({ ...validSigns(), frecuencia_cardiaca: 30 });
      expect(result.criticalSigns).toContain('Frecuencia Cardíaca');
    });

    it('incluye múltiples signos críticos cuando varios tienen el mismo nivel', () => {
      const result = classifyTriage({
        frecuencia_cardiaca: 30,
        frecuencia_respiratoria: 5,
        saturacion_o2: 80,
        temperatura: 30,
        presion: '60/40',
        nivel_de_conciencia: 'Sin respuesta',
        nivel_de_dolor: 0,
      });
      expect(result.criticalSigns.length).toBeGreaterThan(1);
    });
  });

  describe('nivel de conciencia inválido', () => {
    it('lanza un error cuando nivel_de_conciencia es un valor desconocido', () => {
      expect(() => classifyTriage({ ...validSigns(), nivel_de_conciencia: 'Desconocido' })).toThrow();
    });
  });

  describe('presion con diastólica entre 111 y 130', () => {
    it('clasifica diastólica 120 como muy urgente', () => {
      const result = classifyTriage({ ...validSigns(), presion: '150/120' });
      expect(result.criticalityLevel).toBe(2);
    });
  });

  describe('presion con diastólica entre 101 y 110', () => {
    it('clasifica diastólica 105 como urgente', () => {
      const result = classifyTriage({ ...validSigns(), presion: '150/105' });
      expect(result.criticalityLevel).toBe(3);
    });
  });

  describe('presion con diastólica entre 90 y 100', () => {
    it('clasifica diastólica 95 como menos urgente', () => {
      const result = classifyTriage({ ...validSigns(), presion: '150/95' });
      expect(result.criticalityLevel).toBe(4);
    });
  });

  describe('presion sistólica entre 100 y 139', () => {
    it('clasifica sistólica 120 como no urgente', () => {
      const result = classifyTriage({ ...validSigns(), presion: '120/80' });
      expect(result.classificationDetail.bloodPressure).toBe(5);
    });
  });
});
