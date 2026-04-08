# HEALTH_TECH_MVP — Workspace Instructions

## Proyecto
Sistema de triaje hospitalario basado en el Protocolo de Manchester. Registra pacientes, captura constantes vitales y clasifica criticidad automáticamente en el servidor.

## Arquitectura general
- **Backend**: Node.js + Express 5 (ES Modules, `.js`)
- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS 4 + shadcn/ui
- **Base de datos**: PostgreSQL 15
- **Infraestructura**: Docker Compose (servicios: `db`, `backend`, `frontend`)

## Reglas críticas de negocio
- `criticidad` y `hora_de_registro` **nunca** se aceptan del cliente; siempre las calcula el servidor
- La clasificación de criticidad sigue el Protocolo de Manchester (niveles 1–5)
- El campo `criticidad` está en la tabla `pacientes` y es calculado por `TriageEngine.js`

## Convenciones de nombres
| Contexto | Convención |
|----------|-----------|
| Archivos backend | `camelCase.js` (ej. `pacients.controllers.js`) |
| Archivos frontend | `PascalCase.tsx` para componentes, `camelCase.ts` para utilidades/hooks |
| Base de datos | `snake_case` en columnas; nombres de campos en español |
| API endpoints | `kebab-case` en español: `/api/v1/pacients`, `/api/v1/vitals/:patientId` |
| Funciones de controlador | PascalCase: `GetPacient`, `CreatePacient` |
| Constantes TriageEngine | UPPER_CASE: `EMERGENCIA`, `MUY_URGENTE` |

## Idioma del código
- **Dominio / campos de negocio** → español (pacientes, identificacion, criticidad)
- **Código y lógica** → inglés (variables, funciones, comentarios de código)
- **Mensajes de error de API** → español (ej. `"Error de validación"`)

## Estructura de servicios Docker
```
db       → PostgreSQL 15 (puerto 5435)
backend  → Node 22-alpine (puerto 3000)
frontend → Nginx con dist de Vite (puerto 80)
```
El backend depende de `db` con condición `service_healthy`.
