# Bug Report — BUG-FE-003

## Identificación del Defecto

| Campo              | Detalle     |
| ------------------ | ----------- |
| **Id del defecto** | BUG-FE-003  |
| **Fecha**          | 2026-04-05  |
| **Autor/a**        | QA Engineer |

---

## Título y Descripción

**Título:** Los mensajes de error de validación del formulario de signos vitales se agrupan al final del formulario en lugar de mostrarse debajo de cada campo

**Descripción:** Al intentar guardar el formulario de registro de signos vitales con todos los campos vacíos (pulsando el botón "Guardar"), todos los mensajes de error de validación se muestran agrupados al final del formulario, debajo del último campo visible, en lugar de aparecer inmediatamente debajo de cada campo de entrada correspondiente. Este comportamiento dificulta al usuario identificar qué campo específico presenta el error, especialmente en formularios con múltiples campos.

---

## Pasos para Reproducir el Defecto

1. Levantar el entorno de pruebas ejecutando `docker-compose up` con el archivo `docker-compose.yml` del repositorio.
2. Acceder a la aplicación desde el navegador en `http://localhost:5173`.
3. Registrar o seleccionar un paciente existente para acceder al formulario de registro de signos vitales (ruta `/register/{pacientId}`).
4. No completar ningún campo del formulario (dejar todos los campos vacíos).
5. Hacer clic en el botón **"Guardar"**.
6. Observar la ubicación de los mensajes de error de validación mostrados.

---

## Resultado Esperado vs. Resultado Actual

|                        | Descripción                                                                                                                                                                                                                                                                                                                                                                         |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Resultado esperado** | Cada mensaje de error de validación aparece inmediatamente debajo del campo de entrada al que corresponde. Por ejemplo: el error de "Frecuencia cardiaca: campo requerido" aparece debajo del input de Frecuencia Cardiaca, el error de "Frecuencia respiratoria: campo requerido" debajo del input de Frecuencia Respiratoria, y así sucesivamente para cada campo del formulario. |
| **Resultado actual**   | Todos los mensajes de error de validación (Frecuencia cardiaca, Frecuencia respiratoria, Saturación O2, Temperatura, Presión arterial y Nivel de dolor) se muestran agrupados al final del formulario, debajo del último campo "Nivel de dolor", en lugar de mostrarse cada uno debajo de su campo correspondiente.                                                                 |

---

## Detalles del Entorno

| Campo                      | Detalle                                      |
| -------------------------- | -------------------------------------------- |
| **Sistema operativo**      | Windows 11                                   |
| **Navegador**              | Brave v1.88.138 (Chromium v146.0.7680.178)   |
| **Imagen Docker frontend** | `elyriven/health-tech-frontend:88d9c29`      |
| **Entorno de ejecución**   | Local — levantado con `docker-compose.yml`   |
| **URL de acceso**          | `http://localhost:5173/register/{pacientId}` |

---

## Evidencias

| Archivo                                                               | Descripción                                                                                                                                                                                                                                                                                                                                                                                                    |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`field_errors_grouped.png`](../assets/bugs/field_errors_grouped.png) | Captura de pantalla del formulario de signos vitales mostrando todos los mensajes de error agrupados al final del formulario: "Frecuencia cardiaca: campo requerido", "Frecuencia respiratoria: campo requerido", "Saturación O2: campo requerido", "Temperatura: campo requerido", "Presión arterial: campo requerido" y "Nivel de dolor: campo requerido", todos listados en bloque debajo del último campo. |

---

## Severidad y Prioridad

| Campo         | Valor    | Justificación                                                                                                                                                                                                                                     |
| ------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Severidad** | Moderada | El defecto no bloquea la funcionalidad del sistema — los errores sí se muestran — pero la presentación incorrecta de los mensajes dificulta la usabilidad del formulario, especialmente para el personal médico que opera bajo presión de tiempo. |
| **Prioridad** | Media    | Debe corregirse antes de producción ya que afecta directamente la experiencia de usuario del flujo principal de registro de signos vitales. La corrección requiere ajuste de la lógica de renderizado de errores en el componente del formulario. |
