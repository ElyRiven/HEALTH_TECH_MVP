---
description: "Use when creating or modifying backend files: controllers, routes, helpers, or database queries in HEALTH_TECH_BACKEND. Covers Express patterns, error handling, validation, and PostgreSQL usage."
applyTo: "HEALTH_TECH_BACKEND/src/**/*.js"
---

# Backend Conventions (Node.js + Express)

## Estructura de capas
```
routes/      → Define endpoints Express y delega a controllers
controllers/ → Lógica HTTP: validar entrada, llamar helpers y devolver JSON
helpers/     → Lógica de negocio pura (validaciones, TriageEngine, adapters)
db.js        → Pool de PostgreSQL compartido
config.js    → Variables de entorno centralizadas
```

## Patrón de controlador
```javascript
// Siempre async + try/catch
export const CreatePacient = async (req, res) => {
  try {
    const errors = validatePacient(req.body);
    if (errors) return res.status(400).json({ message: "Error de validación", errors });

    // lógica de negocio...
    const result = await pool.query(SQL, params);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
```

## Validación
- Los helpers de validación devuelven `null` si todo está bien, o un objeto `{ campo: "motivo" }` si hay error
- Nunca aceptar `criticidad` ni `hora_de_registro` del cuerpo de la petición; rechazar si están presentes
- Usar la librería `validator` para saneamiento de campos de texto

## Respuestas de error estándar
| Código | Cuándo usar |
|--------|-------------|
| 400 | Datos de entrada inválidos |
| 404 | Recurso no encontrado |
| 409 | Conflicto (ej.: paciente duplicado) |
| 500 | Error inesperado del servidor |

```javascript
// Forma estándar de respuesta de error
res.status(400).json({ message: "Error de validación", errors: { campo: "motivo" } });
```

## Rutas
```javascript
// Patrón REST, prefijo /api/v1/
router.get('/', GetAllPacients);
router.get('/:id', GetPacient);
router.post('/', CreatePacient);
```

## Base de datos (PostgreSQL)
- Usar siempre el pool importado de `db.js`, nunca crear conexiones directas
- Usar consultas parametrizadas (`$1`, `$2`) para prevenir inyección SQL
- El pool usa SSL en producción (`STAGE !== 'development'`)
```javascript
import { pool } from '../db.js';
const result = await pool.query('SELECT * FROM pacientes WHERE identificacion = $1', [id]);
```

## TriageEngine
- Importar desde `../helpers/TriageEngine.js`
- Recibe las constantes vitales y devuelve `{ criticidadLevel, ...metadata }`
- Clasificación: 1 (Emergencia inmediata) → 5 (No urgente)
- `criticidadLevel` se guarda en `pacientes.criticidad` automáticamente al registrar vitales

## ES Modules
- Usar siempre `import`/`export` (no `require`)
- Incluir la extensión `.js` en los imports locales: `import { pool } from '../db.js'`
