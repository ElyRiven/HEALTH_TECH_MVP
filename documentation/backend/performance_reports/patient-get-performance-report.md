# Reporte de Rendimiento — Prueba de Carga: Consulta de Paciente por ID

## Datos de Identificación

| Campo                             | Detalle                           |
| --------------------------------- | --------------------------------- |
| **Nombre del proyecto**           | Health Tech — Sistema de Triage   |
| **Fecha de creación del reporte** | 2026-04-05                        |
| **Herramienta de pruebas**        | k6 v1.6.1 + xk6-dashboard v0.8.1  |
| **Script de prueba**              | `patient-get-load.js`             |
| **Endpoint bajo prueba**          | `GET /api/v1/pacients/:patientId` |
| **Autor/a**                       | QA Engineer                       |

---

## Resumen Ejecutivo

### Objetivo de la Prueba

Evaluar la estabilidad y la capacidad de respuesta del sistema ante una carga normal de consultas individuales de pacientes por número de identificación. La prueba simula el flujo de trabajo de personal médico que consulta el estado y la información de un paciente específico durante la atención de triage, garantizando que el sistema soporte:

- Un mínimo de **25 TPS** (transacciones por segundo).
- Un tiempo de respuesta máximo en el percentil 95 no mayor a **2 segundos** (umbral `p(95) < 2000 ms`).
- Una tasa de error máxima del **2%** de las peticiones generadas.

La prueba simuló hasta **45 usuarios virtuales (VUs)** concurrentes durante **110 segundos** de ejecución total, incluyendo una fase de configuración (`setup`) previa a la carga principal para preparar los datos de prueba.

### Veredicto de Calidad

> **APROBADO** ✅

Todos los umbrales definidos fueron superados con margen significativo. El endpoint de consulta individual de paciente demostró ser el de mejor rendimiento del sistema, con tiempos de respuesta sub-milisegundo en la mediana y ausencia total de errores.

---

## Análisis de Eficiencia de Desempeño (Métricas ISO 25010)

### Comportamiento Temporal

#### Tiempos de Respuesta HTTP — `http_req_duration` (en milisegundos)

| Métrica                | Valor                   |
| ---------------------- | ----------------------- |
| **Promedio (avg)**     | 0.941 ms                |
| **Mínimo (min)**       | 0.608 ms                |
| **Mediana (med)**      | 0.805 ms                |
| **Máximo (max)**       | 7.499 ms                |
| **Percentil 90 (p90)** | 1.330 ms                |
| **Percentil 95 (p95)** | 1.492 ms ✅ `< 2000 ms` |
| **Percentil 99 (p99)** | 1.972 ms                |

> Los tiempos de respuesta son notablemente bajos. La mediana sub-milisegundo (0.805 ms) indica que el 50% de las peticiones fueron atendidas en menos de 1 ms, lo que refleja un endpoint altamente eficiente respaldado por una consulta de base de datos bien optimizada. El máximo registrado de 7.499 ms no compromete en absoluto el rendimiento general.

#### Rendimiento del Sistema (TPS/RPS)

| Métrica                              | Valor                      |
| ------------------------------------ | -------------------------- |
| **Total de peticiones HTTP (test)**  | 2,729                      |
| **Total de peticiones HTTP (setup)** | 10                         |
| **Total de peticiones HTTP**         | 2,739                      |
| **Tasa de peticiones (rate)**        | 34.175 req/s ✅ `≥ 25 TPS` |
| **Total de iteraciones**             | 2,729                      |
| **Tasa de iteraciones**              | 34.05 iter/s               |
| **Duración media de iteración**      | 1,001.6 ms                 |
| **VUs máximos (vus_max)**            | 45                         |

> La tasa de 34.175 req/s supera el mínimo requerido de 25 TPS. Las 10 peticiones adicionales de la fase de `setup` corresponden a la preparación de datos de prueba (creación de pacientes de referencia) y no se contabilizan en los umbrales funcionales.

---

### Utilización de Recursos

> **Nota:** La prueba de carga fue ejecutada en un entorno de contenedores Docker local sin instrumentación directa de recursos de sistema operativo. Los datos de red son los reportados por k6.

| Recurso                           | Observación                                                                                                                                                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **CPU**                           | No instrumentada directamente. La latencia media de 0.941 ms por petición GET indica que el procesamiento en servidor y el acceso a BD son mínimos, con carga de CPU muy baja. |
| **Memoria RAM**                   | No instrumentada. Sin indicadores de degradación de rendimiento que sugieran presión de memoria durante la prueba.                                                             |
| **Red — Datos recibidos**         | 716,190 bytes (≈ 700 KB total) a **8.9 KB/s** promedio. Aproximadamente **261 bytes por respuesta**.                                                                           |
| **Red — Datos recibidos (setup)** | 6,650 bytes adicionales de la fase de setup.                                                                                                                                   |
| **Red — Datos enviados**          | 251,334 bytes (≈ 245 KB total) a **3.1 KB/s** promedio.                                                                                                                        |
| **Almacenamiento**                | No instrumentado. Solo operaciones de lectura (SELECT), sin presión de escritura en disco.                                                                                     |

---

### Capacidad

| Parámetro                               | Valor                                                                                               |
| --------------------------------------- | --------------------------------------------------------------------------------------------------- |
| **VUs concurrentes máximos soportados** | 45 VUs                                                                                              |
| **Máxima tasa de peticiones sostenida** | 34.175 req/s                                                                                        |
| **Duración de la prueba**               | 110 segundos                                                                                        |
| **Degradación observada**               | Ninguna. Los tiempos de respuesta se mantuvieron estables y consistentes durante toda la ejecución. |

> El endpoint de consulta individual presenta el mejor perfil de escalabilidad del sistema. Al ser una operación de solo lectura con payload de respuesta pequeño (~261 bytes), su capacidad de manejo de carga es alta. El límite de capacidad real no fue determinado en esta prueba de carga normal.

---

## Resultado de Errores y Fiabilidad

### Tasa de Error

| Métrica                         | Valor           |
| ------------------------------- | --------------- |
| **Peticiones fallidas (test)**  | 0               |
| **Peticiones fallidas (setup)** | 0               |
| **Tasa de error**               | 0.00% ✅ `< 2%` |
| **Checks HTTP pasados**         | 100%            |

> No se registró ningún error en las 2,739 peticiones totales ejecutadas (2,729 del test principal y 10 del setup). La tasa de error es exactamente 0%.

### Códigos de Estado HTTP

| Código             | Cantidad | Descripción                                   |
| ------------------ | -------- | --------------------------------------------- |
| **2xx (éxito)**    | 2,739    | Todas las peticiones finalizaron exitosamente |
| **4xx (cliente)**  | 0        | Sin errores de cliente                        |
| **5xx (servidor)** | 0        | Sin errores de servidor                       |

> La ausencia total de errores, incluyendo la fase de setup, confirma que la lógica de preparación de datos de prueba funcionó correctamente y que el endpoint respondió de forma íntegra durante toda la ejecución.

### Disponibilidad y Recuperabilidad

El sistema mantuvo **100% de disponibilidad** durante toda la duración de la prueba. La consistencia de los tiempos de respuesta entre snapshots, sin ningún pico o período de latencia elevada, confirma que el sistema es completamente estable ante consultas concurrentes.

---

## Conclusiones y Recomendaciones

### Conclusiones

1. **El endpoint GET de consulta de paciente por ID es el de mayor rendimiento del sistema**, con una mediana de respuesta de 0.805 ms y un p95 de 1.492 ms, superando el umbral de 2000 ms por más de 1,300 veces.
2. **La tasa de 34.175 req/s** supera el mínimo requerido de 25 TPS, confirmando que el sistema puede soportar la demanda esperada del flujo de consulta durante las operaciones de triage.
3. **El payload de respuesta promedio de 261 bytes** es muy compacto y eficiente, minimizando el consumo de ancho de banda incluso ante cargas elevadas.
4. **No se registró ningún error** en las 2,739 peticiones (0% de tasa de error), confirmando la fiabilidad absoluta del endpoint bajo carga normal.
5. **La fase de setup funcionó correctamente**, preparando los datos de prueba sin errores y sin impacto en las métricas principales del test.

### Recomendaciones

#### Optimización y Resiliencia

1. **Verificar la existencia de índice en la columna `identificacion`** (o `id`, según el esquema) en la tabla de pacientes. Los tiempos sub-milisegundo sugieren que ya existe, pero debe confirmarse mediante `EXPLAIN ANALYZE` en PostgreSQL.
2. **Evaluar la implementación de una capa de caché** (por ejemplo, Redis) para las consultas frecuentes de pacientes en atención activa, especialmente en escenarios de alta concurrencia donde el mismo paciente es consultado múltiples veces por diferentes usuarios.
3. **Ejecutar pruebas con mayor volumen de datos** en la base de datos (por ejemplo, con 100,000+ pacientes registrados) para validar que los tiempos de respuesta se mantienen estables cuando el índice maneja más datos.

#### Monitoreo en Producción (Shift-Right)

4. **Implementar trazabilidad distribuida** (por ejemplo, con OpenTelemetry) para correlacionar los tiempos de respuesta del endpoint con los tiempos de ejecución de queries SQL en producción, permitiendo identificar rápidamente si una degradación futura proviene de la API o de la base de datos.
5. **Configurar alertas de rendimiento** para el endpoint de consulta con umbrales más estrictos dado su excelente rendimiento base:
   - Alerta temprana cuando el p95 supere **50 ms** (indicio de posible carga no habitual o problema de índice).
   - Alerta crítica cuando supere **500 ms**.
6. **Comparar el p95 de producción vs. p95 de prueba** (1.492 ms) periódicamente. Una desviación sostenida mayor a 10x podría indicar problemas de infraestructura, saturación de conexiones a la BD o ausencia de índices.
