# Tabla de Aplicación de Pruebas — API REST

> Documento de evidencia visual de las pruebas aplicadas a la API REST del sistema de triage.
>
> **Base URL:** `http://localhost:3000`

---

## Endpoint 1 — POST `/api/v1/pacients` (HU-001)

### 1.1 Códigos de estado semánticos

| Caso de prueba | Petición | URL | Mensaje Esperado | Imagen |
|---|---|---|---|---|
| Registro exitoso con todos los campos válidos | `POST` | `http://localhost:3000/api/v1/pacients` | `201` — `"Paciente registrado exitosamente"` + Id del paciente | [Ver imagen](API_PROOF/1.1-registro-exitoso.png) |
| Enviar identificación ya existente en la BD | `POST` | `http://localhost:3000/api/v1/pacients` | `409` — `"Identificación duplicada"` | [Ver imagen](API_PROOF/1.1-identificacion-duplicada.png) |
| Enviar body con campos obligatorios faltantes | `POST` | `http://localhost:3000/api/v1/pacients` | `400` — `"Error de validación"` + detalle de campos | [Ver imagen](API_PROOF/1.1-campos-obligatorios-faltantes.png) |
| Enviar el campo `hora_de_registro` manualmente | `POST` | `http://localhost:3000/api/v1/pacients` | `400` — `"Este campo es generado automáticamente por el servidor"` | [Ver imagen](API_PROOF/1.1-hora-registro-manual.png) |
| Enviar el campo `criticidad` manualmente | `POST` | `http://localhost:3000/api/v1/pacients` | `400` — `"Este campo es calculado automáticamente por el sistema"` | [Ver imagen](API_PROOF/1.1-criticidad-manual.png) |

### 1.2 Validaciones de campos

| Caso de prueba | Petición | URL | Mensaje Esperado | Imagen |
|---|---|---|---|---|
| `identificacion` — Enviar string en vez de número | `POST` | `http://localhost:3000/api/v1/pacients` | `400` — `"El id debe ser un número"` | [Ver imagen](API_PROOF/1.2-identificacion-string.png) |
| `nombres` — Enviar string vacío `""` | `POST` | `http://localhost:3000/api/v1/pacients` | `400` — `"Debe escribir tus nombres"` | [Ver imagen](API_PROOF/1.2-nombres-vacio.png) |
| `nombres` — Enviar string > 100 caracteres | `POST` | `http://localhost:3000/api/v1/pacients` | `400` — `"Debe escribir tus nombres"` | [Ver imagen](API_PROOF/1.2-nombres-mayor-100.png) |
| `apellidos` — Enviar string vacío `""` | `POST` | `http://localhost:3000/api/v1/pacients` | `400` — `"Debe escribir tus apellidos"` | [Ver imagen](API_PROOF/1.2-apellidos-vacio.png) |
| `fecha_de_nacimiento` — Enviar formato inválido (ej: `"31-12-1990"`) | `POST` | `http://localhost:3000/api/v1/pacients` | `400` — `"Debe tener un formato de yyyy-MM-dd"` | [Ver imagen](API_PROOF/1.2-fecha-formato-invalido.png) |
| `fecha_de_nacimiento` — Enviar año < 1900 (ej: `"1899-01-01"`) | `POST` | `http://localhost:3000/api/v1/pacients` | `400` — `"El año de nacimiento no puede ser menor a 1900"` | [Ver imagen](API_PROOF/1.2-fecha-menor-1900.png) |
| `genero` — Enviar string vacío `""` | `POST` | `http://localhost:3000/api/v1/pacients` | `400` — Error de validación | [Ver imagen](API_PROOF/1.2-genero-vacio.png) |
| `estado` — Enviar string vacío `""` | `POST` | `http://localhost:3000/api/v1/pacients` | `400` — Error de validación | [Ver imagen](API_PROOF/1.2-estado-vacio.png) |

### 1.3 Valores por defecto y respuesta

| Caso de prueba | Petición | URL | Mensaje Esperado | Imagen |
|---|---|---|---|---|
| `hora_de_registro` se genera automáticamente con la hora del servidor | `POST` | `http://localhost:3000/api/v1/pacients` | Registro creado con hora del servidor | [Ver imagen](API_PROOF/1.3-hora-registro-automatica.png) |
| `criticidad` se asigna valor por defecto `5` | `POST` | `http://localhost:3000/api/v1/pacients` | Registro creado con criticidad = 5 | [Ver imagen](API_PROOF/1.3-criticidad-por-defecto.png) |
| La respuesta exitosa incluye el campo `id` del paciente | `POST` | `http://localhost:3000/api/v1/pacients` | Body contiene `{ id: <identificacion> }` | [Ver imagen](API_PROOF/1.3-respuesta-incluye-id.png) |

---

## Endpoint 2 — POST `/api/v1/vitals/:patientId` (HU-002 / HU-003)

### 2.1 Códigos de estado semánticos

| Caso de prueba | Petición | URL | Mensaje Esperado | Imagen |
|---|---|---|---|---|
| Registro exitoso con todos los campos válidos | `POST` | `http://localhost:3000/api/v1/vitals/123456` | `201` — `"Signos vitales registrados exitosamente"` | [Ver imagen](API_PROOF/2.1-registro-exitoso-vitales.png) |
| Enviar body con campos obligatorios faltantes | `POST` | `http://localhost:3000/api/v1/vitals/123456` | `400` — `"Campos obligatorios faltantes"` | [Ver imagen](API_PROOF/2.1-campos-obligatorios-faltantes-vitales.png) |
| Enviar `patientId` inexistente en la BD | `POST` | `http://localhost:3000/api/v1/vitals/999999` | `404` — `"El paciente con Id enviado no fue encontrado"` | [Ver imagen](API_PROOF/2.1-paciente-inexistente-vitales.png) |
| Enviar datos fuera de rango permitido | `POST` | `http://localhost:3000/api/v1/vitals/123456` | `422` — `"Los datos no cumplen con las validaciones"` | [Ver imagen](API_PROOF/2.1-datos-fuera-de-rango.png) |
| Enviar `patientId` no numérico en la URL | `POST` | `http://localhost:3000/api/v1/vitals/abc` | `400` — `"El patientId debe ser un número entero válido"` | [Ver imagen](API_PROOF/2.1-patientid-no-numerico.png) |

### 2.2 Validaciones de campos obligatorios

| Caso de prueba | Petición | URL | Mensaje Esperado | Imagen |
|---|---|---|---|---|
| Omitir `frecuencia_cardiaca` | `POST` | `http://localhost:3000/api/v1/vitals/123456` | `400` — campo obligatorio faltante | [Ver imagen](API_PROOF/2.2-omitir-frecuencia-cardiaca.png) |
| Omitir `frecuencia_respiratoria` | `POST` | `http://localhost:3000/api/v1/vitals/123456` | `400` — campo obligatorio faltante | [Ver imagen](API_PROOF/2.2-omitir-frecuencia-respiratoria.png) |
| Omitir `saturacion_o2` | `POST` | `http://localhost:3000/api/v1/vitals/123456` | `400` — campo obligatorio faltante | [Ver imagen](API_PROOF/2.2-omitir-saturacion-o2.png) |
| Omitir `temperatura` | `POST` | `http://localhost:3000/api/v1/vitals/123456` | `400` — campo obligatorio faltante | [Ver imagen](API_PROOF/2.2-omitir-temperatura.png) |
| Omitir `presion` | `POST` | `http://localhost:3000/api/v1/vitals/123456` | `400` — campo obligatorio faltante | [Ver imagen](API_PROOF/2.2-omitir-presion.png) |
| Omitir `nivel_de_conciencia` | `POST` | `http://localhost:3000/api/v1/vitals/123456` | `400` — campo obligatorio faltante | [Ver imagen](API_PROOF/2.2-omitir-nivel-conciencia.png) |
| Omitir `nivel_de_dolor` | `POST` | `http://localhost:3000/api/v1/vitals/123456` | `400` — campo obligatorio faltante | [Ver imagen](API_PROOF/2.2-omitir-nivel-dolor.png) |

### 2.3 Validaciones de rangos — `frecuencia_cardiaca` (20–300 bpm, entero)

| Caso de prueba | Petición | URL | Mensaje Esperado | Imagen |
|---|---|---|---|---|
| Enviar valor < 20 (ej: `10`) | `POST` | `http://localhost:3000/api/v1/vitals/123456` | `422` — fuera de rango | [Ver imagen](API_PROOF/2.3-fc-menor-a-20.png) |
| Enviar valor > 300 (ej: `350`) | `POST` | `http://localhost:3000/api/v1/vitals/123456` | `422` — fuera de rango | [Ver imagen](API_PROOF/2.3-fc-mayor-a-300.png) |
| Enviar valor decimal (ej: `80.5`) | `POST` | `http://localhost:3000/api/v1/vitals/123456` | `422` — debe ser entero | [Ver imagen](API_PROOF/2.3-fc-decimal.png) |
| Enviar string (ej: `"alto"`) | `POST` | `http://localhost:3000/api/v1/vitals/123456` | `422` — debe ser número | [Ver imagen](API_PROOF/2.3-fc-string.png) |

### 2.4 Validaciones de rangos — `frecuencia_respiratoria` (1–60 rpm, entero)

| Caso de prueba | Petición | URL | Mensaje Esperado | Imagen |
|---|---|---|---|---|
| Enviar valor < 1 (ej: `0`) | `POST` | `http://localhost:3000/api/v1/vitals/123456` | `422` — fuera de rango | [Ver imagen](API_PROOF/2.4-fr-menor-a-1.png) |
| Enviar valor > 60 (ej: `65`) | `POST` | `http://localhost:3000/api/v1/vitals/123456` | `422` — fuera de rango | [Ver imagen](API_PROOF/2.4-fr-mayor-a-60.png) |
| Enviar valor decimal (ej: `15.5`) | `POST` | `http://localhost:3000/api/v1/vitals/123456` | `422` — debe ser entero | [Ver imagen](API_PROOF/2.4-fr-decimal.png) |

### 2.5 Validaciones de rangos — `saturacion_o2` (50.0–100.0 %, máx 1 decimal)

| Caso de prueba | Petición | URL | Mensaje Esperado | Imagen |
|---|---|---|---|---|
| Enviar valor < 50 (ej: `45.0`) | `POST` | `http://localhost:3000/api/v1/vitals/123456` | `422` — fuera de rango | [Ver imagen](API_PROOF/2.5-spo2-menor-a-50.png) |
| Enviar valor > 100 (ej: `101.0`) | `POST` | `http://localhost:3000/api/v1/vitals/123456` | `422` — fuera de rango | [Ver imagen](API_PROOF/2.5-spo2-mayor-a-100.png) |
| Enviar valor con más de 1 decimal (ej: `98.55`) | `POST` | `http://localhost:3000/api/v1/vitals/123456` | `422` — máximo 1 decimal | [Ver imagen](API_PROOF/2.5-spo2-mas-de-1-decimal.png) |

### 2.6 Validaciones de rangos — `temperatura` (25.0–45.0 °C, máx 1 decimal)

| Caso de prueba | Petición | URL | Mensaje Esperado | Imagen |
|---|---|---|---|---|
| Enviar valor < 25.0 (ej: `20.0`) | `POST` | `http://localhost:3000/api/v1/vitals/123456` | `422` — fuera de rango | [Ver imagen](API_PROOF/2.6-temp-menor-a-25.png) |
| Enviar valor > 45.0 (ej: `46.0`) | `POST` | `http://localhost:3000/api/v1/vitals/123456` | `422` — fuera de rango | [Ver imagen](API_PROOF/2.6-temp-mayor-a-45.png) |
| Enviar valor con más de 1 decimal (ej: `36.55`) | `POST` | `http://localhost:3000/api/v1/vitals/123456` | `422` — máximo 1 decimal | [Ver imagen](API_PROOF/2.6-temp-mas-de-1-decimal.png) |

### 2.7 Validaciones de rangos — `presion` (formato `sistólica/diastólica`)

| Caso de prueba | Petición | URL | Mensaje Esperado | Imagen |
|---|---|---|---|---|
| Enviar formato inválido (ej: `"120-80"`) | `POST` | `http://localhost:3000/api/v1/vitals/123456` | `422` — formato inválido | [Ver imagen](API_PROOF/2.7-presion-formato-invalido.png) |
| Enviar como número en vez de string (ej: `120`) | `POST` | `http://localhost:3000/api/v1/vitals/123456` | `422` — debe ser string | [Ver imagen](API_PROOF/2.7-presion-numero.png) |
| Enviar sistólica fuera de rango (ej: `"40/80"` o `"310/80"`) | `POST` | `http://localhost:3000/api/v1/vitals/123456` | `422` — sistólica entre 50–300 mmHg | [Ver imagen](API_PROOF/2.7-presion-sistolica-fuera-rango.png) |
| Enviar diastólica fuera de rango (ej: `"120/15"` o `"120/210"`) | `POST` | `http://localhost:3000/api/v1/vitals/123456` | `422` — diastólica entre 20–200 mmHg | [Ver imagen](API_PROOF/2.7-presion-diastolica-fuera-rango.png) |
| Enviar diastólica ≥ sistólica (ej: `"80/120"`) | `POST` | `http://localhost:3000/api/v1/vitals/123456` | `422` — diastólica debe ser menor | [Ver imagen](API_PROOF/2.7-presion-diastolica-mayor-sistolica.png) |

### 2.8 Validaciones de rangos — `nivel_de_conciencia`

| Caso de prueba | Petición | URL | Mensaje Esperado | Imagen |
|---|---|---|---|---|
| Enviar valor no permitido (ej: `"Dormido"`) | `POST` | `http://localhost:3000/api/v1/vitals/123456` | `422` — valor inválido | [Ver imagen](API_PROOF/2.8-nivel-conciencia-valor-no-permitido.png) |
| Enviar número en vez de string (ej: `1`) | `POST` | `http://localhost:3000/api/v1/vitals/123456` | `422` — debe ser string | [Ver imagen](API_PROOF/2.8-nivel-conciencia-numero-invalido.png) |
| Enviar valor permitido (ej: `"Alerta"`) | `POST` | `http://localhost:3000/api/v1/vitals/123456` | Aceptado | [Ver imagen](API_PROOF/2.8-nivel-conciencia-valor-permitido.png) |

### 2.9 Validaciones de rangos — `nivel_de_dolor` (0–10, entero)

| Caso de prueba | Petición | URL | Mensaje Esperado | Imagen |
|---|---|---|---|---|
| Enviar valor < 0 (ej: `-1`) | `POST` | `http://localhost:3000/api/v1/vitals/123456` | `422` — fuera de rango | [Ver imagen](API_PROOF/2.9-nivel-dolor-menor-a-cero.png) |
| Enviar valor > 10 (ej: `11`) | `POST` | `http://localhost:3000/api/v1/vitals/123456` | `422` — fuera de rango | [Ver imagen](API_PROOF/2.9-nivel-dolor-mayor-a-diez.png) |
| Enviar valor decimal (ej: `5.5`) | `POST` | `http://localhost:3000/api/v1/vitals/123456` | `422` — debe ser entero | [Ver imagen](API_PROOF/2.9-nivel-dolor-decimal.png) |
| Enviar valor ≠ 0 cuando `nivel_de_conciencia` = `"Sin respuesta"` | `POST` | `http://localhost:3000/api/v1/vitals/123456` | `422` — debe ser 0 | [Ver imagen](API_PROOF/2.9-nivel-dolor-no-cero-sin-respuesta.png) |

### 2.10 Clasificación automática de criticidad (HU-003)

| Caso de prueba | Petición | URL | Mensaje Esperado | Imagen |
|---|---|---|---|---|
| Vitales que resulten en **Nivel 1 — Emergencia (Rojo)** | `POST` | `http://localhost:3000/api/v1/vitals/123456` | Respuesta incluye `criticidad` con nivel 1 | [Ver imagen](API_PROOF/2.10-criticidad-nivel-1-emergencia.png) |
| Vitales que resulten en **Nivel 2 — Muy Urgente (Naranja)** | `POST` | `http://localhost:3000/api/v1/vitals/123456` | Respuesta incluye `criticidad` con nivel 2 | [Ver imagen](API_PROOF/2.10-criticidad-nivel-2-muy-urgente.png) |
| Vitales que resulten en **Nivel 3 — Urgente (Amarillo)** | `POST` | `http://localhost:3000/api/v1/vitals/123456` | Respuesta incluye `criticidad` con nivel 3 | [Ver imagen](API_PROOF/2.10-criticidad-nivel-3-urgente.png) |
| Vitales que resulten en **Nivel 4 — Poco Urgente (Verde)** | `POST` | `http://localhost:3000/api/v1/vitals/123456` | Respuesta incluye `criticidad` con nivel 4 | [Ver imagen](API_PROOF/2.10-criticidad-nivel-4-poco-urgente.png) |
| Vitales que resulten en **Nivel 5 — No Urgente (Azul)** | `POST` | `http://localhost:3000/api/v1/vitals/123456` | Respuesta incluye `criticidad` con nivel 5 | [Ver imagen](API_PROOF/2.10-criticidad-nivel-5-no-urgente.png) |
| Verificar que la respuesta incluya `{ criticidad: { criticalityLevel: N } }` | `POST` | `http://localhost:3000/api/v1/vitals/123456` | Objeto criticidad presente en el body | [Ver imagen](API_PROOF/2.10-criticidad-objeto-presente.png) |

### 2.11 Respuesta exitosa y transaccionalidad

| Caso de prueba | Petición | URL | Mensaje Esperado | Imagen |
|---|---|---|---|---|
| La respuesta incluye el campo `data` con el registro insertado | `POST` | `http://localhost:3000/api/v1/vitals/123456` | Body contiene `{ data: { ... } }` | [Ver imagen](API_PROOF/2.11-respuesta-incluye-data.png) |
| La transacción hace rollback si falla la actualización de criticidad | `POST` | `http://localhost:3000/api/v1/vitals/123456` | Ni vitales ni criticidad se persisten | [Ver imagen](API_PROOF/2.11-rollback-paciente-inexistente.png) |

---

## Endpoint 3 — GET `/api/v1/pacients` (HU-005)

### 3.1 Códigos de estado y ordenamiento

| Caso de prueba | Petición | URL | Mensaje Esperado | Imagen |
|---|---|---|---|---|
| Consultar lista con pacientes registrados y vitales | `GET` | `http://localhost:3000/api/v1/pacients` | `200` — Array JSON con datos de pacientes | [Ver imagen](API_PROOF/3.1-get-pacientes-con-vitales.png) |
| Consultar lista sin pacientes con vitales registradas | `GET` | `http://localhost:3000/api/v1/pacients` | `200` — Array vacío `[]` | [Ver imagen](API_PROOF/3.1-get-pacientes-sin-vitales.png) |
| Consultar con query param `?order=DESC` | `GET` | `http://localhost:3000/api/v1/pacients?order=DESC` | `200` — Lista ordenada descendente por criticidad | [Ver imagen](API_PROOF/3.1-get-pacientes-order-desc.png) |
| Consultar con query param `?order=ASC` | `GET` | `http://localhost:3000/api/v1/pacients?order=ASC` | `200` — Lista ordenada ascendente por criticidad | [Ver imagen](API_PROOF/3.1-get-pacientes-order-asc.png) |
| Consultar sin query param `order` | `GET` | `http://localhost:3000/api/v1/pacients` | `200` — Lista ordenada ascendente por defecto | [Ver imagen](API_PROOF/3.1-get-pacientes-sin-order.png) |

### 3.2 Estructura y lógica de negocio

| Caso de prueba | Petición | URL | Mensaje Esperado | Imagen |
|---|---|---|---|---|
| Cada registro contiene los 8 campos esperados | `GET` | `http://localhost:3000/api/v1/pacients` | Todos los campos presentes | [Ver imagen](API_PROOF/3.2-campos-esperados.png) |
| `fecha_de_nacimiento` tiene formato `YYYY-MM-DD` | `GET` | `http://localhost:3000/api/v1/pacients` | Formato correcto | [Ver imagen](API_PROOF/3.2-formato-fecha-nacimiento.png) |
| `hora_de_registro` tiene formato `HH:MI:SS AM/PM` | `GET` | `http://localhost:3000/api/v1/pacients` | Formato correcto | [Ver imagen](API_PROOF/3.2-formato-hora-registro.png) |
| Solo muestra pacientes que tienen constantes vitales registradas | `GET` | `http://localhost:3000/api/v1/pacients` | Pacientes sin vitales no aparecen | [Ver imagen](API_PROOF/3.2-solo-pacientes-con-vitales.png) |
| El orden DESC muestra criticidad 1 (más crítico) primero | `GET` | `http://localhost:3000/api/v1/pacients?order=DESC` | Primer elemento tiene criticidad más baja numéricamente | [Ver imagen](API_PROOF/3.2-order-desc-criticidad-primero.png) |

---

## Endpoint 4 — GET `/api/v1/pacients/:id`

### 4.1 Códigos de estado semánticos

| Caso de prueba | Petición | URL | Mensaje Esperado | Imagen |
|---|---|---|---|---|
| Consultar paciente existente con Id válido | `GET` | `http://localhost:3000/api/v1/pacients/123456` | `200` — `{ id: <identificacion> }` | [Ver imagen](API_PROOF/4.1-get-paciente-existente.png) |
| Consultar paciente con Id inexistente | `GET` | `http://localhost:3000/api/v1/pacients/999999` | `404` — `"Paciente no encontrado"` | [Ver imagen](API_PROOF/4.1-get-paciente-inexistente.png) |
| Enviar Id no numérico (ej: `abc`) | `GET` | `http://localhost:3000/api/v1/pacients/abc` | `400` — `"El id debe ser un número entero válido"` | [Ver imagen](API_PROOF/4.1-get-paciente-id-no-numerico.png) |

---

## Endpoint 5 — PATCH `/api/v1/pacients/:pacientId` (HU-008)

### 5.1 Códigos de estado semánticos

| Caso de prueba | Petición | URL | Mensaje Esperado | Imagen |
|---|---|---|---|---|
| Actualizar estado con valor válido | `PATCH` | `http://localhost:3000/api/v1/pacients/123456` | `200` — `"Estado del paciente actualizado correctamente"` | [Ver imagen](API_PROOF/5.1-patch-estado-valido.png) |
| Enviar estado no válido (ej: `"Eliminado"`) | `PATCH` | `http://localhost:3000/api/v1/pacients/123456` | `404` — `"El valor recibido no es un estado válido"` | [Ver imagen](API_PROOF/5.1-patch-estado-invalido.png) |
| Enviar `pacientId` inexistente | `PATCH` | `http://localhost:3000/api/v1/pacients/999999` | `404` — Paciente no encontrado | [Ver imagen](API_PROOF/5.1-patch-paciente-inexistente.png) |

### 5.2 Transiciones de estado

| Caso de prueba | Petición | URL | Mensaje Esperado | Imagen |
|---|---|---|---|---|
| `"En espera"` → `"Siendo atendido"` | `PATCH` | `http://localhost:3000/api/v1/pacients/123456` | `200` — Estado actualizado | [Ver imagen](API_PROOF/5.2-transicion-espera-a-atendido.png) |
| `"Siendo atendido"` → `"Finalizado"` | `PATCH` | `http://localhost:3000/api/v1/pacients/123456` | `200` — Estado actualizado | [Ver imagen](API_PROOF/5.2-transicion-atendido-a-finalizado.png) |
| `"Finalizado"` → `"En espera"` | `PATCH` | `http://localhost:3000/api/v1/pacients/123456` | Verificar si se permite o se rechaza | [Ver imagen](API_PROOF/5.2-transicion-finalizado-a-espera.png) |

### 5.3 Persistencia

| Caso de prueba | Petición | URL | Mensaje Esperado | Imagen |
|---|---|---|---|---|
| Verificar que el endpoint GET devuelva el estado actualizado | `GET` | `http://localhost:3000/api/v1/pacients` | El nuevo estado aparece en la lista | [Ver imagen](API_PROOF/5.3-persistencia-estado-actualizado.png) |

---

## Resumen de Cobertura

| Endpoint | Método | Ruta | Total pruebas | Con imagen | Sin imagen |
|---|---|---|---|---|---|
| 1 | `POST` | `/api/v1/pacients` | 16 | 16 | 0 |
| 2 | `POST` | `/api/v1/vitals/:patientId` | 45 | 45 | 0 |
| 3 | `GET` | `/api/v1/pacients` | 10 | 10 | 0 |
| 4 | `GET` | `/api/v1/pacients/:id` | 3 | 3 | 0 |
| 5 | `PATCH` | `/api/v1/pacients/:pacientId` | 7 | 7 | 0 |
| | | **TOTAL** | **81** | **81** | **0** |
