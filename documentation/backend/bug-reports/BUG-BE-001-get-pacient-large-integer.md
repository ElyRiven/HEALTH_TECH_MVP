# Bug Report — BUG-BE-001

## Identificación del Defecto

| Campo              | Detalle     |
| ------------------ | ----------- |
| **Id del defecto** | BUG-BE-001  |
| **Fecha**          | 2026-04-05  |
| **Autor/a**        | QA Engineer |

---

## Título y Descripción

**Título:** El endpoint GET `/api/v1/pacients/:pacientId` retorna error 500 al recibir un número de identificación excesivamente grande

**Descripción:** Al enviar una petición GET al endpoint de consulta de paciente por ID con un valor numérico excesivamente grande en el parámetro de ruta `pacientId` (por ejemplo, `9999999999999999999999999`), la API responde con un código de estado HTTP 500 (Internal Server Error), exponiendo en el cuerpo de la respuesta un mensaje de error interno del motor de base de datos PostgreSQL: _"invalid input syntax for type integer: \"1e+24\""_. La causa raíz es que JavaScript convierte el número muy grande a notación científica (`1e+24`) antes de enviarlo a la base de datos, y PostgreSQL no puede convertir ese formato a tipo entero. La API no realiza validación previa del rango del parámetro numérico, lo que provoca que el error llegue hasta la capa de base de datos y se propague como un error 500 no controlado.

---

## Pasos para Reproducir el Defecto

1. Levantar el entorno de pruebas ejecutando `docker-compose up` con el archivo `docker-compose.yml` del repositorio.
2. Abrir Postman v12.4.8.
3. Crear una nueva petición de tipo `GET` con la URL: `http://localhost:3000/api/v1/pacients/9999999999999999999999999`.
4. Enviar la petición haciendo clic en **Send**.
5. Observar el código de estado HTTP y el cuerpo de la respuesta.

---

## Resultado Esperado vs. Resultado Actual

|                        | Descripción                                                                                                                                                                                                                                                                                                                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Resultado esperado** | La API valida el parámetro `pacientId` antes de realizar la consulta a la base de datos. El campo debe cumplir dos reglas: (1) longitud exacta de 10 caracteres — si no la cumple, retorna `400 Bad Request` con `{"message": "El parámetro pacientId debe tener 10 caracteres"}`; (2) solo letras mayúsculas y dígitos — si no la cumple, retorna `400 Bad Request` con `{"message": "El parámetro pacientId debe contener solo números y letras mayúsculas"}`. El campo `identificacion` de la base de datos es de tipo `VARCHAR(10)` (no `INTEGER`). |
| **Resultado actual**   | La API retorna un código de estado `500 Internal Server Error` con el siguiente cuerpo: `{"message": "Error al buscar el paciente", "error": "invalid input syntax for type integer: \"1e+24\""}`. El error interno de PostgreSQL queda expuesto en la respuesta, lo que también representa un riesgo de seguridad al revelar detalles de la infraestructura interna.                            |

---

## Detalles del Entorno

| Campo                     | Detalle                                    |
| ------------------------- | ------------------------------------------ |
| **Sistema operativo**     | Windows 11                                 |
| **Cliente HTTP**          | Postman v12.4.8                            |
| **Imagen Docker backend** | `elyriven/health-tech-backend:88d9c29`     |
| **Entorno de ejecución**  | Local — levantado con `docker-compose.yml` |
| **URL base de la API**    | `http://localhost:3000/api/v1/`            |
| **Endpoint afectado**     | `GET /api/v1/pacients/:pacientId`          |

---

## Evidencias

| Archivo                                                                         | Descripción                                                                                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`large_integer_get_pacient.png`](../assets/bugs/large_integer_get_pacient.png) | Captura de pantalla de Postman mostrando la petición GET con `pacientId = 9999999999999999999999999...`, el código de respuesta `500 Internal Server Error` (15 ms, 369 B) y el cuerpo de error con el mensaje interno de PostgreSQL: `"invalid input syntax for type integer: \"1e+24\""`. |

---

## Severidad y Prioridad

| Campo         | Valor | Justificación                                                                                                                                                                                                                                                                                              |
| ------------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Severidad** | Mayor | El defecto expone un error interno de la base de datos en la respuesta HTTP, lo que revela detalles de implementación de la infraestructura (PostgreSQL) al cliente. Adicionalmente, genera un fallo no controlado (error 500) que podría provocar comportamientos inesperados en otras capas del sistema. |
| **Prioridad** | Alta  | La exposición de mensajes internos de la base de datos representa un riesgo de seguridad (CWE-209: Information Exposure Through an Error Message) y debe corregirse con la mayor urgencia antes de cualquier despliegue en entornos accesibles externamente.                                               |
