# Reporte de Rendimiento — Prueba de Carga: Creación de Pacientes y Registro de Signos Vitales

## Datos de Identificación

| Campo                             | Detalle                                                    |
| --------------------------------- | ---------------------------------------------------------- |
| **Nombre del proyecto**           | Health Tech — Sistema de Triage                            |
| **Fecha de creación del reporte** | 2026-04-05                                                 |
| **Herramienta de pruebas**        | k6 v1.6.1 + xk6-dashboard v0.8.1                           |
| **Script de prueba**              | `patient-creation-load.js`                                 |
| **Endpoints bajo prueba**         | `POST /api/v1/pacients` + `POST /api/v1/vitals/:patientId` |
| **Autor/a**                       | QA Engineer                                                |

---

## Resumen Ejecutivo

### Objetivo de la Prueba

Verificar la estabilidad y el rendimiento del sistema bajo una carga normal esperada en el flujo de creación de nuevos pacientes y registro de sus primeros signos vitales. La prueba ejecuta de forma secuencial, dentro de cada iteración, una petición de creación de paciente (`POST /api/v1/pacients`) seguida de una petición de registro de signos vitales (`POST /api/v1/vitals/:patientId`), garantizando que el sistema soporte:

- Un mínimo de **25 TPS** (transacciones por segundo).
- Un tiempo de respuesta promedio por petición no mayor a **2 segundos** (umbral `p(95) < 2000 ms`).
- Una tasa de error máxima del **2%** de las peticiones generadas.

La prueba simuló hasta **45 usuarios virtuales (VUs)** concurrentes durante **110 segundos** de ejecución total.

### Veredicto de Calidad

> **APROBADO** ✅

Todos los umbrales definidos fueron superados con amplio margen. El sistema demostró estabilidad completa bajo la carga esperada, con tiempos de respuesta muy por debajo del límite establecido y sin ningún error en las peticiones ejecutadas.

---

## Análisis de Eficiencia de Desempeño (Métricas ISO 25010)

### Comportamiento Temporal

#### Tiempos de Respuesta HTTP — `http_req_duration` (en milisegundos)

| Métrica                | Valor                   |
| ---------------------- | ----------------------- |
| **Promedio (avg)**     | 2.063 ms                |
| **Mínimo (min)**       | 0.885 ms                |
| **Mediana (med)**      | 1.905 ms                |
| **Máximo (max)**       | 23.212 ms               |
| **Percentil 90 (p90)** | 2.615 ms                |
| **Percentil 95 (p95)** | 3.145 ms ✅ `< 2000 ms` |
| **Percentil 99 (p99)** | 5.752 ms                |

> Los tiempos de respuesta son excepcionalmente bajos, con un p95 de 3.145 ms que supera con amplitud el umbral de 2000 ms. El tiempo máximo registrado (23.212 ms) corresponde probablemente a peticiones durante la fase inicial de ramp-up de VUs o a un pico transiente puntual, y no representa un valor preocupante en el contexto general de la prueba.

#### Rendimiento del Sistema (TPS/RPS)

| Métrica                         | Valor                      |
| ------------------------------- | -------------------------- |
| **Total de peticiones HTTP**    | 5,438                      |
| **Tasa de peticiones (rate)**   | 67.605 req/s ✅ `≥ 25 TPS` |
| **Total de iteraciones**        | 2,719                      |
| **Tasa de iteraciones**         | 33.802 iter/s              |
| **Duración media de iteración** | 1,005.0 ms                 |
| **VUs máximos (vus_max)**       | 45                         |

> Cada iteración ejecuta 2 peticiones HTTP (POST paciente + POST vitales), por lo que la tasa efectiva de operaciones completas es 33.802 iter/s (doble del mínimo requerido de 25 TPS por endpoint individual). El umbral mínimo de 25 TPS es ampliamente superado con 67.605 req/s en total.

---

### Utilización de Recursos

> **Nota:** La prueba de carga fue ejecutada en un entorno de contenedores Docker local (sin instrumentación de sistema operativo mediante agentes de monitoreo como cAdvisor, Prometheus o Grafana). Los siguientes datos son estimaciones basadas en los indicadores de red reportados por k6.

| Recurso                   | Observación                                                                                                                                                                                        |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **CPU**                   | No instrumentada directamente. La duración media de iteración de ~1005 ms (dominada por el sleep de 1 segundo entre iteraciones) indica que la CPU del servidor no fue saturada durante la prueba. |
| **Memoria RAM**           | No instrumentada. Los tiempos de respuesta estables y sin degradación a lo largo de los 110 segundos de prueba sugieren que no hubo presión de memoria significativa.                               |
| **Red — Datos recibidos** | 3,630,341 bytes (≈ 3.46 MB total) a **44.1 KB/s** promedio. Aproximadamente **668 bytes por petición**.                                                                                             |
| **Red — Datos enviados**  | 1,638,421 bytes (≈ 1.56 MB total) a **19.9 KB/s** promedio.                                                                                                                                         |
| **Almacenamiento**        | No instrumentado. Se realizaron 2,719 inserciones en base de datos (pacientes + vitales). Sin evidencia de degradación por presión de I/O de disco.                                                 |

---

### Capacidad

| Parámetro                                | Valor                                                                                                                    |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **VUs concurrentes máximos soportados**  | 45 VUs                                                                                                                   |
| **Máxima tasa de peticiones sostenida**  | 67.605 req/s                                                                                                             |
| **Máxima tasa de iteraciones sostenida** | 33.802 iter/s                                                                                                            |
| **Duración de la prueba**                | 110 segundos                                                                                                             |
| **Degradación observada**                | Ninguna. Los tiempos de respuesta se mantuvieron estables durante toda la ejecución (p95 < 4 ms en todos los snapshots). |

> El sistema demostró capacidad de procesar simultáneamente 45 usuarios virtuales realizando registros de pacientes y signos vitales sin ningún signo de saturación. El límite máximo real del sistema no fue determinado en esta prueba (prueba de carga normal, no de estrés).

---

## Resultado de Errores y Fiabilidad

### Tasa de Error

| Métrica                 | Valor           |
| ----------------------- | --------------- |
| **Peticiones fallidas** | 0               |
| **Tasa de error**       | 0.00% ✅ `< 2%` |
| **Checks HTTP pasados** | 100%            |

> No se registró ningún error en las 5,438 peticiones ejecutadas durante la prueba. La tasa de error es exactamente 0%, superando el umbral máximo permitido del 2%.

### Códigos de Estado HTTP

| Código             | Cantidad | Descripción                                   |
| ------------------ | -------- | --------------------------------------------- |
| **2xx (éxito)**    | 5,438    | Todas las peticiones finalizaron exitosamente |
| **4xx (cliente)**  | 0        | Sin errores de cliente                        |
| **5xx (servidor)** | 0        | Sin errores de servidor                       |

> La ausencia total de errores 4xx y 5xx confirma que ni la lógica de negocio ni la infraestructura presentaron fallos bajo la carga ejecutada.

### Disponibilidad y Recuperabilidad

El sistema mantuvo **100% de disponibilidad** durante toda la duración de la prueba. No se detectaron caídas, timeouts ni períodos de recuperación necesarios. Los tiempos de respuesta se mantuvieron estables en todos los snapshots periódicos de 10 segundos, sin curvas de degradación ascendente que indiquen acumulación de carga o saturación de recursos.

---

## Conclusiones y Recomendaciones

### Conclusiones

1. **El sistema supera todos los umbrales de rendimiento definidos** para el flujo de creación de pacientes y registro de signos vitales bajo carga normal con 45 VUs.
2. **Los tiempos de respuesta son excepcionalmente bajos** (p95 = 3.145 ms), más de 630 veces por debajo del umbral máximo de 2000 ms, lo que indica que los endpoints POST presentan una latencia mínima en el entorno de prueba.
3. **La tasa de peticiones de 67.605 req/s** (más del doble del mínimo requerido de 25 TPS) demuestra que el sistema puede manejar con holgura la carga esperada del flujo de registro.
4. **No se registraron errores** en ninguna de las 5,438 peticiones ejecutadas, confirmando la fiabilidad del sistema bajo condiciones de carga normal.
5. **El tamaño de payload promedio de 668 bytes por respuesta** es apropiado para este tipo de endpoint de escritura, sin presión excesiva sobre el ancho de banda de red.

### Recomendaciones

#### Optimización y Resiliencia

1. **Ejecutar una prueba de estrés** (`stress test`) para determinar el límite máximo real de capacidad del sistema, incrementando los VUs progresivamente más allá de 45 hasta identificar el punto de saturación. Esto permitirá conocer el headroom real antes de la degradación.
2. **Ejecutar una prueba de carga sostenida** (`soak test`) durante al menos 30-60 minutos para detectar posibles fugas de memoria, degradación progresiva de tiempos de respuesta o acumulación de conexiones de base de datos en el tiempo.
3. **Agregar índices de base de datos** en el campo `identificacion` de la tabla `pacients` si no existen ya, para garantizar tiempos de respuesta constantes a medida que crece el volumen de datos.
4. **Implementar un limitador de tasa** (`rate limiter`) en los endpoints POST para proteger el sistema ante picos de tráfico repentinos en producción.

#### Monitoreo en Producción (Shift-Right)

5. **Implementar métricas de Application Performance Monitoring (APM)** en producción utilizando herramientas como Datadog, New Relic o Prometheus + Grafana para capturar tiempos de respuesta p95/p99, tasa de errores y uso de conexiones de base de datos en tiempo real.
6. **Configurar alertas de umbral** en producción para notificar al equipo cuando:
   - El p95 de `http_req_duration` supere los **500 ms** (alerta temprana) o los **1500 ms** (crítico).
   - La tasa de error exceda el **1%** de las peticiones en cualquier ventana de 5 minutos.
7. **Comparar métricas de producción vs. resultados de esta prueba** mensualmente para detectar degradación progresiva del rendimiento y planificar acciones de escalamiento preventivo antes de que los usuarios sean impactados.
