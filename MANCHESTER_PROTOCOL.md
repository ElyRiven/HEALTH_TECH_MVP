# Protocolo Manchester - Guía de Validaciones y Rangos de Signos Vitales

## Descripción General

El Sistema de Triaje de Manchester (MTS) es un protocolo de clasificación clínica que organiza a los pacientes en **5 niveles de criticidad** según la gravedad de sus signos vitales y síntomas. Este documento define los rangos utilizados por el sistema para:

1. **Validar** que los valores ingresados sean fisiológicamente posibles.
2. **Clasificar automáticamente** la criticidad de cada paciente al registrar sus constantes vitales.

> **Regla de clasificación:** El nivel de criticidad final del paciente corresponde al nivel más crítico (menor número) presente en cualquiera de sus signos vitales. Si un solo signo vital cae en Nivel 1, el paciente es clasificado como Nivel 1, independientemente de los demás valores.

---

## Reglas de Criticidad

Los 5 niveles del Protocolo Manchester y sus rangos por signo vital son:

| Nivel | Color       | Denominación  | Tiempo máx. de atención |
| ----- | ----------- | ------------- | ----------------------- |
| 1     | 🔴 Rojo     | Emergencia    | 0 minutos               |
| 2     | 🟠 Naranja  | Muy Urgente   | 10 minutos              |
| 3     | 🟡 Amarillo | Urgente       | 60 minutos              |
| 4     | 🟢 Verde    | Menos Urgente | 120 minutos             |
| 5     | 🔵 Azul     | No Urgente    | 240 minutos             |

### Tabla de Clasificación por Signo Vital

#### Frecuencia Cardíaca (bpm)

| Nivel | Denominación  | Rango               | Interpretación clínica                |
| ----- | ------------- | ------------------- | ------------------------------------- |
| 1     | Emergencia    | < 40 o ≥ 150        | Paro inminente / Taquicardia severa   |
| 2     | Muy Urgente   | 40 – 49 o 130 – 149 | Bradicardia grave / Taquicardia grave |
| 3     | Urgente       | 50 – 59 o 101 – 129 | Bradicardia moderada / Taquicardia    |
| 4     | Menos Urgente | 60 – 100            | Rango normal                          |
| 5     | No Urgente    | 60 – 100            | Normal, sin otros síntomas            |

#### Frecuencia Respiratoria (rpm)

| Nivel | Denominación  | Rango             | Interpretación clínica                    |
| ----- | ------------- | ----------------- | ----------------------------------------- |
| 1     | Emergencia    | < 8 o > 30        | Apnea inminente / Dificultad respiratoria |
| 2     | Muy Urgente   | 8 – 10 o 26 – 30  | Bradipnea severa / Taquipnea severa       |
| 3     | Urgente       | 11 – 12 o 21 – 25 | Bradipnea leve / Taquipnea moderada       |
| 4     | Menos Urgente | 13 – 20           | Rango normal                              |
| 5     | No Urgente    | 13 – 20           | Normal, sin otros síntomas                |

#### Saturación de Oxígeno — SpO₂ (%)

| Nivel | Denominación  | Rango    | Interpretación clínica                       |
| ----- | ------------- | -------- | -------------------------------------------- |
| 1     | Emergencia    | < 85     | Hipoxia severa / Compromiso vital Emergencia |
| 2     | Muy Urgente   | 85 – 89  | Hipoxia moderada                             |
| 3     | Urgente       | 90 – 93  | Hipoxia leve                                 |
| 4     | Menos Urgente | 94 – 100 | Saturación normal                            |
| 5     | No Urgente    | 94 – 100 | Normal, sin otros síntomas                   |

#### Temperatura (°C)

| Nivel | Denominación  | Rango                     | Interpretación clínica                   |
| ----- | ------------- | ------------------------- | ---------------------------------------- |
| 1     | Emergencia    | < 32.0 o > 40.0           | Hipotermia severa / Hipertermia severa   |
| 2     | Muy Urgente   | 32.0 – 34.9 o 39.1 – 40.0 | Hipotermia moderada / Fiebre muy alta    |
| 3     | Urgente       | 35.0 – 35.9 o 38.5 – 39.0 | Hipotermia leve / Fiebre alta            |
| 4     | Menos Urgente | 36.0 – 37.4 o 37.5 – 38.4 | Afebril normal / Febrícula o fiebre baja |
| 5     | No Urgente    | 36.0 – 37.4               | Temperatura normal                       |

> **Nota:** Para la temperatura, los rangos de Nivel 4 se dividen en dos sub-rangos: normal (36.0–37.4) y febrícula (37.5–38.4), ambos clasificados como Menos Urgente.

#### Presión Arterial — Sistólica / Diastólica (mmHg)

| Nivel | Denominación  | Sistólica             | Diastólica | Interpretación clínica                          |
| ----- | ------------- | --------------------- | ---------- | ----------------------------------------------- |
| 1     | Emergencia    | < 70 o > 200          | > 130      | Shock circulatorio / Crisis hipertensiva severa |
| 2     | Muy Urgente   | 70 – 89 o 181 – 200   | 111 – 130  | Hipotensión grave / Hipertensión severa         |
| 3     | Urgente       | 90 – 99 o 161 – 180   | 101 – 110  | Hipotensión leve / Hipertensión moderada        |
| 4     | Menos Urgente | 100 – 139 o 140 – 160 | 60 – 100   | Normal / Hipertensión leve                      |
| 5     | No Urgente    | 100 – 139             | 60 – 89    | Óptimo / Normal                                 |

> **Formato de entrada:** La presión se registra como `sistólica/diastólica` (ej. `120/80`). La clasificación aplica el nivel más crítco entre la sistólica y la diastólica.

#### Nivel de Conciencia — Escala AVPU

| Nivel | Denominación  | Valor AVPU          | Descripción                                          |
| ----- | ------------- | ------------------- | ---------------------------------------------------- |
| 1     | Emergencia    | `Sin respuesta`     | Sin respuesta a ningún estímulo                      |
| 2     | Muy Urgente   | `Responde al dolor` | Responde únicamente a estímulos dolorosos            |
| 3     | Urgente       | `Responde a la voz` | Responde a estímulos verbales, sin plena orientación |
| 4     | Menos Urgente | `Confuso`           | Alerta pero desorientado                             |
| 5     | No Urgente    | `Alerta`            | Totalmente alerta y orientado                        |

> **Escala AVPU:** A = Alert (Alerta), V = Voice (Voz), P = Pain (Dolor), U = Unresponsive (Sin respuesta).

#### Nivel de Dolor — Escala EVA (0 – 10)

| Nivel | Denominación  | Rango  | Interpretación clínica      |
| ----- | ------------- | ------ | --------------------------- |
| 1     | Emergencia    | —      | Paciente inconsciente (N/A) |
| 2     | Muy Urgente   | 9 – 10 | Dolor insoportable          |
| 3     | Urgente       | 7 – 8  | Dolor severo                |
| 4     | Menos Urgente | 4 – 6  | Dolor moderado              |
| 5     | No Urgente    | 0 – 3  | Sin dolor / Dolor leve      |

> **Nota:** Cuando el nivel de conciencia es `Sin respuesta` (Nivel 1), el nivel de dolor se registra como `0` o se omite, dado que el paciente no puede autoreportar dolor. El nivel de criticidad en ese caso lo determina el nivel de conciencia.

---

## Valores Permitidos por el Sistema

Esta sección define los límites de validación de entrada: el rango fisiológicamente posible que puede registrar un ser humano vivo. Cualquier valor fuera de este rango debe ser **rechazado** por la API con HTTP `422 Unprocessable Entity`.

Los límites inferiores y superiores se derivan extendiendo los extremos de cada Nivel 1 del Protocolo Manchester para abarcar los valores extremos registrables en humanos.

| Signo Vital                 | Tipo    | Unidad        | Mínimo permitido | Máximo permitido | Valores aceptados (si aplica)                                                  |
| --------------------------- | ------- | ------------- | ---------------- | ---------------- | ------------------------------------------------------------------------------ |
| Frecuencia Cardíaca         | Entero  | bpm           | 20               | 300              | —                                                                              |
| Frecuencia Respiratoria     | Entero  | rpm           | 1                | 60               | —                                                                              |
| Saturación de Oxígeno       | Decimal | %             | 50               | 100              | —                                                                              |
| Temperatura                 | Decimal | °C            | 25.0             | 45.0             | —                                                                              |
| Presión Arterial Sistólica  | Entero  | mmHg          | 50               | 300              | —                                                                              |
| Presión Arterial Diastólica | Entero  | mmHg          | 20               | 200              | —                                                                              |
| Nivel de Conciencia         | Texto   | —             | —                | —                | `Alerta`, `Confuso`, `Responde a la voz`, `Responde al dolor`, `Sin respuesta` |
| Nivel de Dolor              | Entero  | Escala 0 – 10 | 0                | 10               | —                                                                              |

### Reglas de validación adicionales

| Regla                               | Descripción                                                                                                       |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Presión arterial**                | La presión diastólica debe ser siempre menor que la sistólica. Si `diastólica ≥ sistólica`, el valor es inválido. |
| **Temperatura**                     | Se acepta un decimal (ej. `36.5`). Más de un decimal se rechaza por imprecisión clínica.                          |
| **Saturación de O₂**                | Se acepta un decimal (ej. `98.5`).                                                                                |
| **Nivel de dolor con inconsciente** | Si `nivel_conciencia = Sin respuesta`, el campo `nivel_dolor` debe ser `0`.                                       |
| **Campos obligatorios**             | Todos los campos de la tabla son obligatorios. La API rechaza con `400` si alguno está ausente.                   |

### Formato de entrada de presión arterial

La presión se recibe como una cadena con el formato `sistólica/diastólica`:

```
120/80       ✅ Válido
200/130      ✅ Válido (aunque clasifica en Nivel 1)
301/80       ❌ Inválido — sistólica fuera de rango
120/19       ❌ Inválido — diastólica fuera de rango
80/90        ❌ Inválido — diastólica mayor o igual que sistólica
120_80       ❌ Inválido — formato incorrecto
```

---

## Resumen de Rangos para Implementación

### Tabla consolidada de validación rápida

```
Signo Vital             | Min    | Max     | Tipo
------------------------|--------|---------|--------
frecuencia_cardiaca     | 20     | 300     | int
frecuencia_respiratoria | 1      | 60      | int
saturacion_o2           | 50.0   | 100.0   | float
temperatura             | 25.0   | 45.0    | float
presion_sistolica       | 50     | 300     | int
presion_diastolica      | 20     | 200     | int  (debe ser < presion_sistolica)
nivel_conciencia        | —      | —       | enum ['Alerta','Confuso','Responde a la voz','Responde al dolor','Sin respuesta']
nivel_dolor             | 0      | 10      | int
```

### Tabla consolidada de clasificación por nivel

```
Nivel | FC (bpm)        | FR (rpm)      | SpO2 (%)   | Temp (°C)        | PAS (mmHg)     | Conciencia          | Dolor
------|-----------------|---------------|------------|------------------|----------------|---------------------|-------
1     | <40 o ≥150      | <8 o >30      | <85        | <32.0 o >40.0    | <70 o >200     | Sin respuesta        | N/A
2     | 40-49 o 130-149 | 8-10 o 26-30  | 85-89      | 32.0-34.9 o 39.1-40.0 | 70-89 o 181-200 | Responde al dolor | 9-10
3     | 50-59 o 101-129 | 11-12 o 21-25 | 90-93      | 35.0-35.9 o 38.5-39.0 | 90-99 o 161-180 | Responde a la voz | 7-8
4     | 60-100          | 13-20         | 94-100     | 36.0-38.4        | 100-160        | Confuso              | 4-6
5     | 60-100          | 13-20         | 94-100     | 36.0-37.4        | 100-139        | Alerta               | 0-3
```

---

_Documento de referencia clínica para el equipo de desarrollo — HealthTech MVP_  
_Basado en: Manchester Triage System (MTS) 3ª edición y rangos fisiológicos estándar de la OMS._
