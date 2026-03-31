const criticityLevel = {
  INMEDIATO:     1,
  MUY_URGENTE:   2,
  URGENTE:       3,
  MENOS_URGENTE: 4,
  NO_URGENTE:    5,
};

const consciousnessLevel = {
  ALERTA:         "Alerta",
  CONFUSO:        "Confuso",
  RESPONDE_VOZ:   "Responde a la voz",
  RESPONDE_DOLOR: "Responde al dolor",
  SIN_RESPUESTA:  "Sin respuesta",
};

const serviceHoursLevel = {
  [criticityLevel.INMEDIATO]:     { color: "🔴 Rojo",     denomination: "Inmediato",     maxAttentionTime: "0 minutos"   },
  [criticityLevel.MUY_URGENTE]:   { color: "🟠 Naranja",  denomination: "Muy Urgente",   maxAttentionTime: "10 minutos"  },
  [criticityLevel.URGENTE]:       { color: "🟡 Amarillo", denomination: "Urgente",        maxAttentionTime: "60 minutos"  },
  [criticityLevel.MENOS_URGENTE]: { color: "🟢 Verde",    denomination: "Menos Urgente", maxAttentionTime: "120 minutos" },
  [criticityLevel.NO_URGENTE]:    { color: "🔵 Azul",     denomination: "No Urgente",    maxAttentionTime: "240 minutos" },
};

function classifyHeartRate(hr) {
  if (hr < 40 || hr >= 150)                                 return criticityLevel.INMEDIATO;
  if ((hr >= 40 && hr <= 49) || (hr >= 130 && hr <= 149))  return criticityLevel.MUY_URGENTE;
  if ((hr >= 50 && hr <= 59) || (hr >= 101 && hr <= 129))  return criticityLevel.URGENTE;
  return criticityLevel.NO_URGENTE;
}

function classifyRespiratoryRate(rr) {
  if (rr < 8 || rr > 30)                                   return criticityLevel.INMEDIATO;
  if ((rr >= 8 && rr <= 10) || (rr >= 26 && rr <= 30))    return criticityLevel.MUY_URGENTE;
  if ((rr >= 11 && rr <= 12) || (rr >= 21 && rr <= 25))   return criticityLevel.URGENTE;
  return criticityLevel.NO_URGENTE;
}

function classifyOxygenSaturation(spo2) {
  if (spo2 < 85)                 return criticityLevel.INMEDIATO;
  if (spo2 >= 85 && spo2 <= 89) return criticityLevel.MUY_URGENTE;
  if (spo2 >= 90 && spo2 <= 93) return criticityLevel.URGENTE;
  return criticityLevel.NO_URGENTE;
}

function classifyTemperature(temp) {
  if (temp < 32.0 || temp > 40.0)                                        return criticityLevel.INMEDIATO;
  if ((temp >= 32.0 && temp <= 34.9) || (temp >= 39.1 && temp <= 40.0)) return criticityLevel.MUY_URGENTE;
  if ((temp >= 35.0 && temp <= 35.9) || (temp >= 38.5 && temp <= 39.0)) return criticityLevel.URGENTE;
  if (temp >= 37.5 && temp <= 38.4)                                      return criticityLevel.MENOS_URGENTE;
  return criticityLevel.NO_URGENTE;
}

function classifyBloodPressure(systolic, diastolic) {
  let sl, dl;

  if (systolic < 70 || systolic > 200)                                             sl = criticityLevel.INMEDIATO;
  else if ((systolic >= 70 && systolic <= 89) || (systolic >= 181 && systolic <= 200)) sl = criticityLevel.MUY_URGENTE;
  else if ((systolic >= 90 && systolic <= 99) || (systolic >= 161 && systolic <= 180)) sl = criticityLevel.URGENTE;
  else if (systolic >= 140 && systolic <= 160)                                      sl = criticityLevel.MENOS_URGENTE;
  else if (systolic >= 100 && systolic <= 139)                                     sl = criticityLevel.NO_URGENTE;
  else                                                                             sl = criticityLevel.NO_URGENTE;

  if (diastolic > 130)                         dl = criticityLevel.INMEDIATO;
  else if (diastolic >= 111 && diastolic <= 130) dl = criticityLevel.MUY_URGENTE;
  else if (diastolic >= 101 && diastolic <= 110) dl = criticityLevel.URGENTE;
  else if (diastolic >= 90  && diastolic <= 100) dl = criticityLevel.MENOS_URGENTE;
  else if (diastolic >= 60  && diastolic <= 89)  dl = criticityLevel.NO_URGENTE;
  else                                           dl = criticityLevel.NO_URGENTE;

  return Math.min(sl, dl);
}

function classifyConsciousnessLevel(consciousness) {
  switch (consciousness) {
    case consciousnessLevel.SIN_RESPUESTA:  return criticityLevel.INMEDIATO;
    case consciousnessLevel.RESPONDE_DOLOR: return criticityLevel.MUY_URGENTE;
    case consciousnessLevel.RESPONDE_VOZ:   return criticityLevel.URGENTE;
    case consciousnessLevel.CONFUSO:        return criticityLevel.MENOS_URGENTE;
    case consciousnessLevel.ALERTA:         return criticityLevel.NO_URGENTE;
    default: throw new Error(`Nivel de conciencia inválido: "${consciousness}"`);
  }
}

function classifyPainLevel(pain) {
  if (pain >= 9) return criticityLevel.MUY_URGENTE;
  if (pain >= 7) return criticityLevel.URGENTE;
  if (pain >= 4) return criticityLevel.MENOS_URGENTE;
  return criticityLevel.NO_URGENTE;
}

function validateVitalSigns(signs) {
  const errors = [];
  const rules = [
    {
      valid: signs.frecuencia_cardiaca >= 20 && signs.frecuencia_cardiaca <= 300,
      msg: `Frecuencia cardíaca fuera de rango (20-300): ${signs.frecuencia_cardiaca}`,
    },
    {
      valid: signs.frecuencia_respiratoria >= 1 && signs.frecuencia_respiratoria <= 60,
      msg: `Frecuencia respiratoria fuera de rango (1-60): ${signs.frecuencia_respiratoria}`,
    },
    {
      valid: signs.saturacion_o2 >= 50 && signs.saturacion_o2 <= 100,
      msg: `Saturación de O₂ fuera de rango (50-100): ${signs.saturacion_o2}`,
    },
    {
      valid: signs.temperatura >= 25.0 && signs.temperatura <= 45.0,
      msg: `Temperatura fuera de rango (25.0-45.0): ${signs.temperatura}`,
    },
    {
      valid: /^\d{2,3}\/\d{2,3}$/.test(signs.presion),
      msg: `Formato de presión arterial inválido (esperado NN/NN): ${signs.presion}`,
    },
    {
      valid: (() => {
        const [sys, dia] = signs.presion.split("/").map(Number);
        return sys >= 50 && sys <= 300 && dia >= 20 && dia <= 200 && dia < sys;
      })(),
      msg: `Valores de presión arterial fuera de rango o diastólica >= sistólica: ${signs.presion}`,
    },
    {
      valid: signs.nivel_de_dolor >= 0 && signs.nivel_de_dolor <= 10,
      msg: `Nivel de dolor fuera de rango (0-10): ${signs.nivel_de_dolor}`,
    },
    {
      valid: !(signs.nivel_de_conciencia === consciousnessLevel.SIN_RESPUESTA && signs.nivel_de_dolor !== 0),
      msg: `Si el paciente está inconsciente, el nivel de dolor debe ser 0 (actual: ${signs.nivel_de_dolor})`,
    },
  ];
  for (const rule of rules) {
    if (!rule.valid) errors.push(rule.msg);
  }
  if (errors.length > 0) {
    throw new Error(`Errores de validación:\n${errors.join("\n")}`);
  }
}

export function classifyTriage(signs) {
  const heartRateLevel       = classifyHeartRate(signs.frecuencia_cardiaca);
  const respiratoryRateLevel = classifyRespiratoryRate(signs.frecuencia_respiratoria);
  const spo2Level            = classifyOxygenSaturation(signs.saturacion_o2);
  const temperatureLevel     = classifyTemperature(signs.temperatura);
  const [sys, dia]           = signs.presion.split("/").map(Number);
  const bloodPressureLevel   = classifyBloodPressure(sys, dia);
  const consciousnessLevelVal = classifyConsciousnessLevel(signs.nivel_de_conciencia);
  const painLevel            = classifyPainLevel(signs.nivel_de_dolor);

  const level = Math.min(
    heartRateLevel,
    respiratoryRateLevel,
    spo2Level,
    temperatureLevel,
    bloodPressureLevel,
    consciousnessLevelVal,
    painLevel,
  );

  const criticalSigns = [];
  if (heartRateLevel        === level) criticalSigns.push("Frecuencia Cardíaca");
  if (respiratoryRateLevel  === level) criticalSigns.push("Frecuencia Respiratoria");
  if (spo2Level             === level) criticalSigns.push("Saturación de O₂");
  if (temperatureLevel      === level) criticalSigns.push("Temperatura");
  if (bloodPressureLevel    === level) criticalSigns.push("Presión Arterial");
  if (consciousnessLevelVal === level) criticalSigns.push("Nivel de Conciencia");
  if (painLevel             === level) criticalSigns.push("Nivel de Dolor");

  const meta = serviceHoursLevel[level];
  return {
    criticalityLevel: level,
    color:            meta.color,
    denomination:     meta.denomination,
    maxAttentionTime: meta.maxAttentionTime,
    criticalSigns,
    classificationDetail: {
      heartRate:         heartRateLevel,
      respiratoryRate:   respiratoryRateLevel,
      spo2:              spo2Level,
      temperature:       temperatureLevel,
      bloodPressure:     bloodPressureLevel,
      consciousnessLevel: consciousnessLevelVal,
      painLevel,
    },
  };
}
