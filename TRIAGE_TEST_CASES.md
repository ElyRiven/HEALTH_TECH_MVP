# Casos de Prueba — Clasificación Manchester por Nivel de Criticidad

Endpoint: `POST /api/v1/vitals/:patientId`

---

## 🔴 Nivel 1 — Inmediato

**Justificación:** Frecuencia cardíaca de 35 bpm (< 40) indica paro cardíaco inminente. Un solo signo en nivel 1 clasifica al paciente como inmediato.

```json
{
    "frecuencia_cardiaca": 35,
    "frecuencia_respiratoria": 18,
    "saturacion_o2": 97.5,
    "temperatura": 37.2,
    "presion": "120/80",
    "nivel_de_conciencia": "Alerta",
    "nivel_de_dolor": 2
}
```

---

## 🟠 Nivel 2 — Muy Urgente

**Justificación:** Frecuencia cardíaca de 45 bpm (40–49) indica bradicardia grave. El resto de signos son normales, pero la FC grave eleva al nivel 2.

```json
{
    "frecuencia_cardiaca": 45,
    "frecuencia_respiratoria": 18,
    "saturacion_o2": 97.5,
    "temperatura": 37.2,
    "presion": "120/80",
    "nivel_de_conciencia": "Alerta",
    "nivel_de_dolor": 2
}
```

---

## 🟡 Nivel 3 — Urgente

**Justificación:** SpO₂ de 91% indica hipoxia leve (90–93), FC de 55 bpm indica bradicardia moderada (50–59) y dolor severo de 7. Todos los signos caen en nivel 3 como mínimo.

```json
{
    "frecuencia_cardiaca": 55,
    "frecuencia_respiratoria": 18,
    "saturacion_o2": 91.0,
    "temperatura": 37.2,
    "presion": "120/80",
    "nivel_de_conciencia": "Alerta",
    "nivel_de_dolor": 7
}
```

---

## 🟢 Nivel 4 — Menos Urgente

**Justificación:** Temperatura de 38.0°C es febrícula (37.5–38.4), presión sistólica de 145 mmHg es hipertensión leve (140–160), y el paciente está confuso. Ningún signo alcanza nivel 3 o superior.

```json
{
    "frecuencia_cardiaca": 75,
    "frecuencia_respiratoria": 16,
    "saturacion_o2": 96.0,
    "temperatura": 38.0,
    "presion": "145/95",
    "nivel_de_conciencia": "Confuso",
    "nivel_de_dolor": 5
}
```

---

## 🔵 Nivel 5 — No Urgente

**Justificación:** Todos los signos vitales dentro de rangos completamente normales. Paciente alerta, sin fiebre, sin dolor significativo. No requiere atención inmediata.

```json
{
    "frecuencia_cardiaca": 72,
    "frecuencia_respiratoria": 16,
    "saturacion_o2": 98.0,
    "temperatura": 36.8,
    "presion": "118/76",
    "nivel_de_conciencia": "Alerta",
    "nivel_de_dolor": 1
}
```
