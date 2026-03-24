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

## Criterios de Entrada y Salida

## Entorno de Pruebas

## Herramientas

## Roles y Responsabilidades

## Cronograma y Estimación

## Entregables de Prueba

## Riesgos y Contingengias