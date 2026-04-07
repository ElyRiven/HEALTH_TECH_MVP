# Bug Report — BUG-BE-002

## Identificación del Defecto

| Campo              | Detalle     |
| ------------------ | ----------- |
| **Id del defecto** | BUG-BE-002  |
| **Fecha**          | 2026-04-05  |
| **Autor/a**        | QA Engineer |

---

## Título y Descripción

**Título:** El endpoint POST `/api/v1/vitals/:patientId` retorna error 500 al recibir un número de identificación excesivamente grande en el parámetro de ruta

**Descripción:** Al enviar una petición POST al endpoint de registro de signos vitales con un valor numérico excesivamente grande en el parámetro de ruta `patientId` (por ejemplo, `9999999999999999999999999`), la API responde con un código de estado HTTP 500 (Internal Server Error) y el mensaje genérico _"Error interno al registrar constantes vitales"_. Al igual que en el bug BUG-BE-001, la causa raíz es la conversión de JavaScript de números muy grandes a notación científica antes de consultar la base de datos, lo que provoca que PostgreSQL no pueda procesar el valor. La falta de validación del rango del parámetro `patientId` en este endpoint permite que el error llegue hasta la capa de persistencia.

---

## Pasos para Reproducir el Defecto

1. Levantar el entorno de pruebas ejecutando `docker-compose up` con el archivo `docker-compose.yml` del repositorio.
2. Abrir Postman v12.4.8.
3. Crear una nueva petición de tipo `POST` con la URL: `http://localhost:3000/api/v1/vitals/9999999999999999999999999`.
4. En la pestaña **Body**, seleccionar `raw` → `JSON` y agregar un body con signos vitales válidos, por ejemplo:
   ```json
   {
     "frecuencia_cardiaca": 80,
     "frecuencia_respiratoria": 18,
     "saturacion_o2": 98.5,
     "temperatura": 36.5,
     "presion": "120/80",
     "nivel_de_conciencia": "Alerta",
     "nivel_de_dolor": 2
   }
   ```
5. Enviar la petición haciendo clic en **Send**.
6. Observar el código de estado HTTP y el cuerpo de la respuesta.

---

## Resultado Esperado vs. Resultado Actual

|                        | Descripción                                                                                                                                                                                                                                                                                                                                    |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Resultado esperado** | La API valida el parámetro `patientId` antes de realizar cualquier operación sobre la base de datos. El campo debe cumplir dos reglas: (1) longitud exacta de 10 caracteres — si no la cumple, retorna `400 Bad Request` con `{"message": "El parámetro pacientId debe tener 10 caracteres"}`; (2) solo letras mayúsculas y dígitos — si no la cumple, retorna `400 Bad Request` con `{"message": "El parámetro pacientId debe contener solo números y letras mayúsculas"}`. |
| **Resultado actual**   | La API retorna un código de estado `500 Internal Server Error` con el siguiente cuerpo: `{"message": "Error interno al registrar constantes vitales"}`. El error interno se produce en la capa de base de datos al intentar procesar el valor en notación científica como entero de PostgreSQL.                                                |

---

## Detalles del Entorno

| Campo                     | Detalle                                    |
| ------------------------- | ------------------------------------------ |
| **Sistema operativo**     | Windows 11                                 |
| **Cliente HTTP**          | Postman v12.4.8                            |
| **Imagen Docker backend** | `elyriven/health-tech-backend:88d9c29`     |
| **Entorno de ejecución**  | Local — levantado con `docker-compose.yml` |
| **URL base de la API**    | `http://localhost:3000/api/v1/`            |
| **Endpoint afectado**     | `POST /api/v1/vitals/:patientId`           |

---

## Evidencias

| Archivo                                                                                         | Descripción                                                                                                                                                                                                                                                                                       |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`large_integer_post_pacient_vitals.png`](../assets/bugs/large_integer_post_pacient_vitals.png) | Captura de pantalla de Postman mostrando la petición POST a `/api/v1/vitals/:patientId` con `patientId = 9999999999999999999999999...`, el código de respuesta `500 Internal Server Error` (15 ms, 327 B) y el cuerpo de error con el mensaje: `"Error interno al registrar constantes vitales"`. |

---

## Severidad y Prioridad

| Campo         | Valor | Justificación                                                                                                                                                                                                                                                                                                |
| ------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Severidad** | Mayor | El defecto provoca un error interno no controlado (HTTP 500) en el endpoint principal de recepción de signos vitales del sistema de triage. Un fallo en este endpoint puede interrumpir el flujo de atención médica al impedir el registro de información clínica crítica para la priorización de pacientes. |
| **Prioridad** | Alta  | Aunque el caso de uso del valor excesivamente grande puede parecer improbable en la práctica clínica, la ausencia de validación robusta en este endpoint expone un vector de fallo fácilmente explotable. Requiere corrección urgente antes de cualquier despliegue en producción.                           |
