# Bug Report — BUG-BE-003

## Identificación del Defecto

| Campo              | Detalle     |
| ------------------ | ----------- |
| **Id del defecto** | BUG-BE-003  |
| **Fecha**          | 2026-04-05  |
| **Autor/a**        | QA Engineer |

---

## Título y Descripción

**Título:** El endpoint POST `/api/v1/pacients` retorna error 500 al recibir un número de identificación excesivamente grande en el cuerpo de la petición

**Descripción:** Al enviar una petición POST al endpoint de registro de pacientes con un valor numérico excesivamente grande en el campo `identificacion` del body de la petición (por ejemplo, `999999999999999999999999999999`), la API responde con un código de estado HTTP 500 (Internal Server Error), exponiendo en el cuerpo de la respuesta el mensaje de error interno de PostgreSQL: _"invalid input syntax for type integer: \"1e+30\""_ junto con el stack trace completo de la aplicación Node.js. Este defecto, de la misma familia que los reportados en BUG-BE-001 y BUG-BE-002, expone además rutas internas del servidor (`/app/src/controllers/pacients.controllers.js`), lo que constituye una vulnerabilidad de seguridad adicional.

---

## Pasos para Reproducir el Defecto

1. Levantar el entorno de pruebas ejecutando `docker-compose up` con el archivo `docker-compose.yml` del repositorio.
2. Abrir Postman v12.4.8.
3. Crear una nueva petición de tipo `POST` con la URL: `http://localhost:3000/api/v1/pacients`.
4. En la pestaña **Body**, seleccionar `raw` → `JSON` y agregar el siguiente body:
   ```json
   {
     "identificacion": 999999999999999999999999999999,
     "nombres": "Datos Prueba",
     "apellidos": "Datos Prueba",
     "fecha_de_nacimiento": "1990-05-15",
     "genero": "femenino",
     "estado": "En espera"
   }
   ```
5. Enviar la petición haciendo clic en **Send**.
6. Observar el código de estado HTTP y el cuerpo de la respuesta.

---

## Resultado Esperado vs. Resultado Actual

|                        | Descripción                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Resultado esperado** | La API valida el campo `identificacion` del body antes de realizar cualquier operación sobre la base de datos. El campo debe cumplir dos reglas: (1) longitud exacta de 10 caracteres — si no la cumple, retorna `400 Bad Request` con `{"message": "El parámetro pacientId debe tener 10 caracteres"}`; (2) solo letras mayúsculas y dígitos — si no la cumple, retorna `400 Bad Request` con `{"message": "El parámetro pacientId debe contener solo números y letras mayúsculas"}`. El backend siempre convierte el valor de `identificacion` a mayúsculas antes de validarlo y guardarlo. Ante cualquier error 500, la respuesta no incluye el `stack trace` ni información interna del servidor. |
| **Resultado actual**   | La API retorna un código de estado `500 Internal Server Error` con el siguiente cuerpo que expone información sensible del sistema: `{"message": "Error al crear el paciente", "error": "invalid input syntax for type integer: \"1e+30\"", "stack": "error: invalid input syntax for type integer: \"1e+30\"\n    at /app/node_modules/pg-pool/index.js:45:11\n    at process.processTicksAndRejections (node:internal/process/task_queues:103:5)\n    at async CreatePacient (file:///app/src/controllers/pacients.controllers.js:77:30)"}`. Se expone el stack trace completo con rutas del servidor interno. |

---

## Detalles del Entorno

| Campo                     | Detalle                                    |
| ------------------------- | ------------------------------------------ |
| **Sistema operativo**     | Windows 11                                 |
| **Cliente HTTP**          | Postman v12.4.8                            |
| **Imagen Docker backend** | `elyriven/health-tech-backend:88d9c29`     |
| **Entorno de ejecución**  | Local — levantado con `docker-compose.yml` |
| **URL base de la API**    | `http://localhost:3000/api/v1/`            |
| **Endpoint afectado**     | `POST /api/v1/pacients`                    |

---

## Evidencias

| Archivo                                                                           | Descripción                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`large_integer_post_pacient.png`](../assets/bugs/large_integer_post_pacient.png) | Captura de pantalla de Postman mostrando la petición POST a `/api/v1/pacients` con el campo `identificacion` con un valor excesivamente grande (`9999999999...`), el código de respuesta `500 Internal Server Error` (25 ms, 656 B) y el cuerpo de error completo incluyendo el mensaje de PostgreSQL `"invalid input syntax for type integer: \"1e+30\""` y el stack trace con la ruta interna del controlador `pacients.controllers.js:77:30`. |

---

## Severidad y Prioridad

| Campo         | Valor   | Justificación                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Severidad** | Crítica | Además de provocar un error 500 no controlado, este defecto expone en la respuesta HTTP el stack trace completo de la aplicación incluyendo rutas internas del servidor, versiones de dependencias (`pg-pool`) y nombres de archivos y líneas de código. Esta información puede ser explotada por actores maliciosos para planear ataques dirigidos (OWASP A05 — Security Misconfiguration, CWE-209). |
| **Prioridad** | Alta    | La exposición del stack trace en respuestas HTTP es una vulnerabilidad de seguridad activa que debe corregirse de inmediato. En ningún entorno (desarrollo, staging ni producción) debería enviarse información interna del servidor al cliente HTTP. Requiere corrección urgente con doble acción: validación del rango del campo y supresión del stack trace en las respuestas de error.            |
