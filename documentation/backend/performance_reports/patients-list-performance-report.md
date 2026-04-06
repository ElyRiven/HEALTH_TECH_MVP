# Reporte de Rendimiento — Prueba de Carga: Consulta de Listado de Pacientes con Signos Vitales

## Datos de Identificación

| Campo                             | Detalle                          |
| --------------------------------- | -------------------------------- |
| **Nombre del proyecto**           | Health Tech — Sistema de Triage  |
| **Fecha de creación del reporte** | 2026-04-05                       |
| **Herramienta de pruebas**        | k6 v1.6.1 + xk6-dashboard v0.8.1 |
| **Script de prueba**              | `patients-list-load.js`          |
| **Endpoint bajo prueba**          | `GET /api/v1/pacients`           |
| **Autor/a**                       | QA Engineer                      |

---

## Resumen Ejecutivo

### Objetivo de la Prueba

Evaluar la estabilidad y el rendimiento del sistema bajo una carga normal de consultas al listado completo de pacientes con signos vitales registrados. Esta es la vista principal del sistema de triage que el personal médico consulta constantemente para monitorear y priorizar la atención. La prueba garantiza que el sistema soporte:

- Un mínimo de **25 TPS** (transacciones por segundo).
- Un tiempo de respuesta máximo en el percentil 95 no mayor a **2 segundos** (umbral `p(95) < 2000 ms`).
- Una tasa de error máxima del **2%** de las peticiones generadas.

La prueba simuló hasta **45 usuarios virtuales (VUs)** concurrentes durante **110 segundos** de ejecución total.

### Veredicto de Calidad

> **APROBADO** ✅

Todos los umbrales definidos fueron superados. Sin embargo, se identificó un **hallazgo crítico de optimización**: el endpoint retorna un volumen de datos muy elevado por respuesta (~541 KB promedio, 1.46 GB total durante la prueba), lo que representa un riesgo significativo para el rendimiento en producción ante un crecimiento del volumen de datos.

---

## Análisis de Eficiencia de Desempeño (Métricas ISO 25010)

### Comportamiento Temporal

#### Tiempos de Respuesta HTTP — `http_req_duration` (en milisegundos)

| Métrica                | Valor                   |
| ---------------------- | ----------------------- |
| **Promedio (avg)**     | 11.54 ms                |
| **Mínimo (min)**       | 10.24 ms                |
| **Mediana (med)**      | 11.43 ms                |
| **Máximo (max)**       | 18.89 ms                |
| **Percentil 90 (p90)** | 12.28 ms                |
| **Percentil 95 (p95)** | 12.87 ms ✅ `< 2000 ms` |
| **Percentil 99 (p99)** | 15.46 ms                |

> Los tiempos de respuesta pasan el umbral con amplio margen (p95 = 12.87 ms vs. límite de 2000 ms). Sin embargo, son significativamente más altos que los del endpoint de consulta individual (0.941 ms en promedio vs. 11.54 ms aquí), lo que es esperado dado que este endpoint retorna un conjunto completo de datos con joins entre tablas de pacientes y signos vitales. La brecha entre mínimo y máximo (10.24–18.89 ms) es reducida, lo que indica estabilidad en los tiempos de respuesta.

#### Rendimiento del Sistema (TPS/RPS)

| Métrica                         | Valor                     |
| ------------------------------- | ------------------------- |
| **Total de peticiones HTTP**    | 2,700                     |
| **Tasa de peticiones (rate)**   | 33.33 req/s ✅ `≥ 25 TPS` |
| **Total de iteraciones**        | 2,700                     |
| **Tasa de iteraciones**         | 33.33 iter/s              |
| **Duración media de iteración** | 1,012.2 ms                |
| **VUs máximos (vus_max)**       | 45                        |

> La tasa de 33.33 req/s supera el mínimo requerido de 25 TPS. La duración media de iteración de 1,012.2 ms refleja el sleep de 1 segundo entre iteraciones más los ~12 ms del tiempo de respuesta, lo que indica que el endpoint no representa un cuello de botella para el ciclo de trabajo del usuario virtual.

---

### Utilización de Recursos

> **Nota:** La prueba de carga fue ejecutada en un entorno de contenedores Docker local sin instrumentación directa de los recursos del sistema operativo. Se destaca el consumo de red como indicador clave de este endpoint.

| Recurso                   | Observación                                                                                                                                                                                                                                                      |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **CPU**                   | No instrumentada directamente. Los tiempos de respuesta de ~12 ms sugieren que la consulta SQL con JOIN implica un procesamiento moderado en la base de datos. La carga de CPU es proporcional al volumen de datos retornado.                                    |
| **Memoria RAM**           | No instrumentada. El alto volumen de datos por respuesta (~541 KB) implica que la memoria del servidor se ve más presionada en este endpoint que en los anteriores, ya que los resultados del JOIN deben mantenerse en memoria antes de serializar la respuesta. |
| **Red — Datos recibidos** | **1,461,834,000 bytes (≈ 1.46 GB total)** a **18.05 MB/s** promedio. Aproximadamente **~541 KB por respuesta**. ⚠️ **Hallazgo crítico**                                                                                                                          |
| **Red — Datos enviados**  | 229,500 bytes (≈ 224 KB total) a **2.8 KB/s** promedio.                                                                                                                                                                                                          |
| **Almacenamiento**        | No instrumentado. Solo operaciones de lectura. El volumen de datos retornados indica que la base de datos contenía un número considerable de registros durante la prueba.                                                                                        |

> ⚠️ **Hallazgo de optimización — Volumen de datos por respuesta:** El promedio de 541 KB por respuesta es muy elevado para un endpoint de listado. Este comportamiento indica que el endpoint **no implementa paginación** y retorna todos los registros de la base de datos en una sola respuesta. En un entorno de producción con miles de pacientes, este volumen puede escalar a varios MB o GB por petición, lo que degradará severamente los tiempos de respuesta, el consumo de memoria y el ancho de banda de red.

---

### Capacidad

| Parámetro                               | Valor                                                                                                                                                                                                             |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **VUs concurrentes máximos soportados** | 45 VUs                                                                                                                                                                                                            |
| **Máxima tasa de consultas sostenida**  | 33.33 req/s                                                                                                                                                                                                       |
| **Duración de la prueba**               | 110 segundos                                                                                                                                                                                                      |
| **Degradación observada**               | Ninguna dentro del contexto de la prueba. Los tiempos se mantuvieron estables (10–19 ms). Sin embargo, se anticipa degradación significativa en producción a medida que crece el volumen de datos sin paginación. |

> El sistema soportó 45 VUs sin degradación dentro del alcance de esta prueba. Sin embargo, la capacidad real en producción está condicionada al número de registros en la base de datos, dado que el endpoint retorna todos los registros sin filtro de paginación.

---

## Resultado de Errores y Fiabilidad

### Tasa de Error

| Métrica                 | Valor           |
| ----------------------- | --------------- |
| **Peticiones fallidas** | 0               |
| **Tasa de error**       | 0.00% ✅ `< 2%` |
| **Checks HTTP pasados** | 100%            |

> No se registró ningún error en las 2,700 peticiones ejecutadas durante la prueba. La tasa de error es exactamente 0%, superando el umbral máximo del 2%.

### Códigos de Estado HTTP

| Código             | Cantidad | Descripción                                   |
| ------------------ | -------- | --------------------------------------------- |
| **2xx (éxito)**    | 2,700    | Todas las peticiones finalizaron exitosamente |
| **4xx (cliente)**  | 0        | Sin errores de cliente                        |
| **5xx (servidor)** | 0        | Sin errores de servidor                       |

> La ausencia total de errores confirma que el endpoint se comporta de forma fiable bajo carga normal. No se detectaron timeouts ni errores de conectividad con la base de datos durante los 110 segundos de la prueba.

### Disponibilidad y Recuperabilidad

El sistema mantuvo **100% de disponibilidad** durante toda la duración de la prueba. Los tiempos de respuesta mostraron una varianza muy reducida (10.24–18.89 ms), indicando comportamiento predecible y estable. No se detectaron caídas ni períodos de recuperación.

---

## Conclusiones y Recomendaciones

### Conclusiones

1. **El sistema supera todos los umbrales funcionales definidos** para el endpoint de listado de pacientes bajo carga normal con 45 VUs: 0% de errores, 33.33 req/s y p95 de 12.87 ms.
2. **El hallazgo más significativo de esta prueba es el volumen de datos por respuesta** (~541 KB promedio, 1.46 GB total para 2,700 peticiones). Esta cifra confirma que el endpoint **no implementa paginación** y retorna la totalidad de registros en cada consulta, lo que representa el mayor riesgo de rendimiento del sistema en producción.
3. **Los tiempos de respuesta actuales (avg 11.54 ms)** son aceptables en el entorno de prueba, pero se espera una **degradación directamente proporcional al número de registros** en producción. Con 10x más datos, los tiempos podrían escalar a 100+ ms; con 100x más datos, podría superar el umbral de 2000 ms.
4. **El endpoint es el de mayor impacto en red** de todos los evaluados: 18.05 MB/s de descarga frente a los 44.9 KB/s del endpoint de creación y los 8.9 KB/s del endpoint de consulta individual.
5. **La tasa de 33.33 req/s** supera el mínimo de 25 TPS, pero es la más baja de los tres endpoints evaluados, correlacionando con el mayor tiempo de procesamiento por petición.

### Recomendaciones

#### Optimización Prioritaria

1. **⚠️ Implementar paginación en el endpoint `GET /api/v1/pacients`** — Esta es la recomendación de mayor prioridad. Añadir parámetros de query `?page=N&limit=N` (o `?offset=N&limit=N`) que limiten el número de registros retornados por petición (por ejemplo, 50 por página). Esto reducirá el consumo de memoria, red y tiempo de respuesta de forma drástica y garantizará tiempos de respuesta estables independientemente del volumen de datos.
2. **Revisar el plan de ejecución SQL del JOIN** entre la tabla de pacientes y signos vitales mediante `EXPLAIN ANALYZE` en PostgreSQL, asegurando que existan índices en las columnas de unión (`patientId` / `identificacion`) para evitar full scans a medida que crece el volumen.
3. **Considerar una respuesta comprimida (gzip/br)** para este endpoint. Dado el alto volumen de datos JSON retornado, la compresión HTTP puede reducir el tráfico de red en un 60-80%, mejorando los tiempos de transferencia especialmente en redes de baja velocidad.

#### Escalamiento de Infraestructura

4. **Evaluar la implementación de una caché a nivel de listado** (por ejemplo, Redis con TTL de 5-10 segundos) para el resultado del listado de pacientes activos. Dado que esta vista es consultada constantemente por múltiples usuarios simultáneamente, una caché de corta duración puede reducir significativamente la carga sobre la base de datos sin comprometer la frescura de los datos.
5. **Planificar réplicas de lectura** en la base de datos PostgreSQL para el escalamiento horizontal del endpoint de listado, separando el tráfico de lectura (GET) del tráfico de escritura (POST) en diferentes nodos.

#### Monitoreo en Producción (Shift-Right)

6. **Monitorear activamente el tamaño promedio de respuesta** de este endpoint en producción. Configurar una alerta cuando el tamaño promedio de respuesta supere los **5 MB**, lo que indicaría un volumen de datos que podría comprometer el rendimiento.
7. **Establecer un baseline de tiempo de respuesta** en producción desde el primer día e implementar alertas cuando el p95 supere los **200 ms**. Un alerta en este umbral —muy por encima del p95 actual de 12.87 ms— dará tiempo suficiente para intervenir antes de que el sistema impacte a los usuarios.
8. **Comparar la tasa de crecimiento de datos** (nuevos pacientes/día) con las proyecciones de degradación del endpoint para planificar proactivamente cuándo implementar la paginación u otras optimizaciones.
