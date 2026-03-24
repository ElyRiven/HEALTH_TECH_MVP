# Plan de Pruebas de QA

**Nombre del proyecto:** HealthTech: Sistema de Triaje de Urgencias  
**Sistema bajo prueba:** Frontend (React) y Backend (Node + Express)  
**Versión:** v0.0.1  
**Fecha:** 2026/24/03  
**Equipo:** Elizabeth Tamayo (QA) y Juan David Franco (DEV)  

## Contexto del proyecto

Los proveedores de salud enfrentan cuellos de botella críticos en sus procesos de atención: la toma de datos y síntomas de pacientes de forma manual genera demoras, y los tiempos de respuesta extensos entre el ingreso y la clasificación de riesgo aumentan la probabilidad de eventos adversos en pacientes de alta prioridad.

El sistema **HealthTech: Sistema de Triaje de Urgencias** resuelve este problema mediante:

### Interfaz de Usuario (React)

- Formulario estandarizado para el registro rápido de datos de un paciente.
- Formulario estandarizado para el registro de signos vitales de un paciente.
- Dashboard que muestra los pacientes registrados en el sistema.
- Notificación visual del registro exitoso de un nuevo paciente en el sistema.

### Backend (Node + Express)

- Creación del registro de un nuevo paciente con sus datos personales.
- Creación del registro de constantes vitales asociadas a un paciente.
- Algoritmo automático de clasificación de criticidad basado en el **Protocolo Manchester (MTS)**, que asigna uno de 5 niveles: Emergencia (Rojo), Muy Urgente (Naranja), Urgente (Amarillo), Poco Urgente (Verde) y No Urgente (Azul).

## Alcance de las Pruebas

El alcance de las pruebas cubre el flujo completo: desde el registro del paciente hasta su visualización ordenada en el dashboard y la recepción de notificaciones por parte del personal médico.

### Historias de usuario incluidas

| ID | Título | Story Points |
|----|--------|--------------|
| HU-001 | Registro de paciente en el sistema | 13 SP |
| HU-002 | Registro de constantes vitales de un paciente | 13 SP |
| HU-003 | Clasificación automatizada de criticidad de un paciente | 13 SP |
| HU-005 | Visualización de lista de pacientes ordenados por criticidad | 8 SP |
| HU-009 | Notificación visual de nuevo registro de paciente al personal médico disponible | 2 SP |

**Total en alcance:** 49 Story Points

### Fuera del alcance

Las siguientes historias de usuario **no serán probadas** en esta versión:

- HU-004 — Asignación visual de criticidad (colores)
- HU-006 — Texto de color por tiempo de espera transcurrido
- HU-007 — Filtrado del Dashboard por nivel de criticidad
- HU-008 — Cambio de estado del paciente
- HU-010 — Alerta sonora para ingresos Nivel 1 y 2
- HU-011 — Alerta visual por superación de tiempo máximo de espera

Adicionalmente, están fuera del alcance: autenticación y roles, conexión con dispositivos médicos, historial clínico electrónico, facturación, gestión de recursos internos y auditoría de trazabilidad de pacientes.

## Estrategia de Pruebas

Se implementará una estrategia de pruebas transversal con una combinación de validación de API, automatización funcional y pruebas de rendimiento.

### Pruebas de API (Backend)

- **Herramienta:** Karate DSL
- **Enfoque:** Pruebas de contrato y funcionales sobre los endpoints REST.
- Se validarán códigos de estado HTTP semánticos, estructura del cuerpo de respuesta (JSON), validaciones de negocio y manejo de errores para los endpoints:
  - `POST /api/v1/pacients`
  - `POST /api/v1/vitals/:patientId`
  - `GET /api/v1/pacients`

### Pruebas Funcionales E2E (Frontend + Backend)

- **Herramienta:** SerenityBDD v4.2 + Cucumber (Gherkin)
- **Patrón:** Screenplay
- **Enfoque:** 
  - Automatización de los flujos de usuario completos desde la interfaz web, cubriendo los escenarios Happy Path y flujos alternativos descritos en los criterios de aceptación Gherkin de cada historia de usuario.
  - Los escenarios son trazables directamente desde los criterios de aceptación del backlog.

### Pruebas de Rendimiento

- **Herramienta:** k6
- **Enfoque:** Pruebas de carga y estrés sobre los endpoints del backend para validar el comportamiento del sistema bajo concurrencia.
- Se priorizarán los endpoints de mayor carga: registro de paciente (`POST /api/v1/pacients`) y consulta del dashboard (`GET /api/v1/pacients`).

### Pruebas Manuales

- Se ejecutarán sobre la interfaz web para validar flujos de negocio y comportamiento visual del dashboard.

## Criterios de Entrada y Salida

### Criterios de Entrada

- La historia de usuario tiene criterios de aceptación definidos y aprobados.
- El entorno de pruebas está configurado y accesible (backend, frontend y base de datos).
- Los endpoints correspondientes están disponibles y retornan respuesta.
- Los datos de prueba han sido preparados e insertados en la base de datos según la matriz de datos definida.

### Criterios de Salida

- El 100% de los casos de prueba de prioridad **Crítica** y **Alta** han sido ejecutados.
- El 80% o más de los casos de prueba de prioridad **Media** han sido ejecutados.
- No existen defectos abiertos de severidad **Crítica** o **Alta** sin resolver.
- El reporte de SerenityBDD muestra el resultado de ejecución de todos los escenarios automatizados.
- Los resultados de las pruebas de rendimiento con k6 están documentados y dentro de los umbrales aceptados.

## Entorno de Pruebas

| Componente | Tecnología / Versión | Descripción |
|------------|---------------------|-------------|
| Frontend | React v19 + Vite | Interfaz web ejecutada en `http://localhost:5173` |
| Backend | Node.js v22.14 + Express | API REST ejecutada en `http://localhost:3000` |
| Base de datos | PostgreSQL v15 | Instancia local o contenerizada con datos de prueba aislados |
| Automatización E2E | SerenityBDD v4.2 + Cucumber | Ejecutado desde el proyecto de automatización en Java/Maven |
| Pruebas de API | Karate DSL | Ejecutado como suite independiente apuntando al backend local |
| Pruebas de rendimiento | k6 | Ejecutado desde la máquina del QA apuntando al backend local |
| Navegador | Google Chrome (versión estable) | Navegador objetivo para las pruebas E2E |

**Consideraciones:**
- La base de datos de pruebas debe ser independiente de producción o staging.
- Las variables de entorno (URLs, credenciales de BD) se gestionan mediante archivos `.env`.

## Herramientas

| Herramienta  | Propósito |
|-------------|-----------|
| **SerenityBDD v4.2** | Framework de automatización funcional E2E con patrón Screenplay. Genera reportes HTML detallados con trazabilidad a los criterios de aceptación. |
| **Cucumber (Gherkin)** | Lenguaje de especificación ejecutable (Dado/Cuando/Entonces) que conecta los criterios de aceptación del negocio con los scripts de automatización de SerenityBDD. |
| **Karate DSL** | Framework de pruebas de API REST. Permite validar contratos de endpoint, códigos de estado, estructura JSON y encadenamiento de llamadas sin código Java adicional. |
| **k6** | Herramienta de pruebas de carga y rendimiento. Simula usuarios concurrentes sobre los endpoints del backend y genera métricas de tiempo de respuesta, throughput y tasa de errores. |
| **Postman** | Herramienta de validación manual de APIs. Usada para smoke tests de endpoints y exploración rápida de comportamiento del backend antes de la automatización. |
| **PostgreSQL Client** | Acceso directo a la base de datos para inserción y validación de datos de prueba. |

## Roles y Responsabilidades

### QA — Elizabeth Tamayo

| Tarea | Descripción |
|-------|-------------|
| Diseño de casos de prueba | Redactar los casos de prueba en formato Gherkin y sus matrices de datos |
| Preparación de datos | Insertar registros de prueba en PostgreSQL y diseñar matrices de datos borde |
| Pruebas manuales de API | Validar endpoints con Postman antes de la automatización |
| Automatización E2E | Desarrollar los scripts SerenityBDD con patrón Screenplay |
| Automatización de API | Desarrollar los scripts Karate para validación de endpoints |
| Pruebas de rendimiento | Diseñar y ejecutar los scripts k6 |
| Reporte de defectos | Registrar, documentar y hacer seguimiento a los bugs encontrados |
| Entregables de QA | Generar los reportes finales de ejecución y el resumen de métricas |

### DEV — Juan David Franco

| Tarea | Descripción |
|-------|-------------|
| Implementación | Desarrollar los endpoints y componentes frontend de cada HU |
| Revisión de criterios | Confirmar que los criterios de aceptación son técnicamente correctos antes del inicio de pruebas |
| Corrección de defectos | Corregir los bugs reportados por QA en los ciclos de prueba |
| Soporte de entorno | Configurar y mantener el entorno de pruebas (backend, BD, variables de entorno) |
| Code review | Revisar los scripts de automatización generados por QA cuando sea necesario |

## Cronograma y Estimación

El esfuerzo de QA se estima en función de los Story Points de cada historia de usuario bajo un ratio de **0.5 días de QA por Story Point**.

| Historia de Usuario | Story Points | Estimación QA |
|---------------------|:------------:|:-------------:|
| HU-001 - Registro de paciente | 13 SP | 6.5 días |
| HU-002 - Registro de constantes vitales | 13 SP | 6.5 días |
| HU-003 - Clasificación de criticidad | 13 SP | 6.5 días |
| HU-005 - Visualización de pacientes | 8 SP | 4 días |
| HU-009 - Notificación visual | 2 SP | 1 día |
| **Total** | **49 SP** | **~24.5 días** |

**Fases del ciclo de pruebas por HU:**

1. Diseño de casos de prueba y preparación de datos *(~30% del esfuerzo)*
2. Ejecución de pruebas manuales (Postman + exploratoria) *(~20% del esfuerzo)*
3. Desarrollo y ejecución de automatización SerenityBDD / Karate *(~40% del esfuerzo)*
4. Reporte de defectos, retesting y cierre *(~10% del esfuerzo)*

## Entregables de Prueba


| Artefacto | Descripción | Responsable |
|-----------|-------------|-------------|
| **TEST_PLAN.md** | Este documento. Plan general de pruebas del proyecto. | QA |
| **TEST_CASES.md** | Catálogo de casos de prueba con escenarios Gherkin, datos de entrada, pasos y resultados esperados. | QA |
| **Matrices de datos** | Archivos con los conjuntos de datos de prueba para cada HU, incluyendo casos borde. | QA |
| **Scripts SerenityBDD** | Código fuente de las pruebas E2E automatizadas con patrón Screenplay. | QA |
| **Scripts Karate** | Código fuente de las pruebas de API automatizadas. | QA |
| **Scripts k6** | Código fuente de los scripts de carga y rendimiento. | QA |
| **Reporte SerenityBDD (HTML)** | Reporte generado automáticamente con resultados de ejecución, trazabilidad a HU y evidencias. | QA |
| **Reporte k6** | Métricas de rendimiento: tiempo de respuesta (p95), throughput (RPS) y tasa de errores. | QA |
| **Registro de defectos** | Log de bugs encontrados durante el ciclo de pruebas con severidad, estado y evidencia. | QA |

## Riesgos y Contingengias