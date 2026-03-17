# Sub-task

## HU-005 — Visualización de lista de pacientes ordenados por criticidad

**Story Points:** 3 SP

**Descripción:**

> Como **Personal Médico**,
> Quiero **poder visualizar los pacientes registrados ordenados por criticidad**,
> Para **identificar los pacientes que requieren atención prioritaria**

## Sub-tareas: DEV

- Crear una base de datos de pacientes que llegan a una institución médica para ser atendidos por urgencias con los siguientes datos: nombres y apellidos, criticidad, tiempo de espera, de la siguiente forma

| Nombres| Apellidos | Criticidad | Tiempo de espera | Estado |
|--------|--------------|---------|-------|-------|
|Juan David | Franco Hernandez | 🟡 Amarillo | 23 minutos | En espera |

formato JSON
```
{
    "nombres": "Juan David",
    "apellidos": "Franco Hernandez",
    "criticidad": "🟡 Amarillo",
    "tiempoDeEspera": "23 minutos",
    "estado": "En espera"
  }
```

### Backend

- Crear endpont GET para obtener lista de paciente ingresados al sistema
- **IMPORTANTE: Los pacientes deben ser organizados descendentemente de acuerdo a su clasificación dentro del Protocolo de Manchester**
- La organización del elemento se hace en el backend, no en el frontend

### Frontend

- Crear un componente de tabla en el que se enlisten todos los usuarios que ingresan al sistema
- Renderizar los datos obtendios de la petición GET que corresponde a la consulta de pacientes en el backend

#### HU-006 — Texto de color por paciente del tiempo de espera transcurrido

**Story Points:** 5 SP

**Descripción:**

> Como **Personal Médico**,
> Quiero **visualizar un texto de color (verde, amarillo o rojo) del tiempo transcurrido de un paciente desde su registro dependiendo de su criticidad**,
> Para **optimizar el tiempo de atención al paciente deacuerdo a sus necesidades médicas**

## Sub-tareas: DEV

Para el cumplimiento de esta historia de usuario, tenemos en cuenta

| Nombres| Apellidos | **Criticidad** | Tiempo de espera | Estado |
|--------|--------------|---------|-------|-------|
|Juan David | Franco Hernandez | **🟡 Amarillo** | 23 minutos | En espera |

formato JSON
```
{
    "nombres": "Juan David",
    "apellidos": "Franco Hernandez",
    "criticidad": "🟡 Amarillo", \\para el campo de la criticidad agregamos los siguientes colores 🔴 MUY URGENTE,
    🟠 URGENTE, 🟢 POCO URGENTE
    "tiempoDeEspera": "23 minutos",
    "estado": "En espera"
  }
```

- La clasificación para la tabla de suario corresponde al siguiente 

| Indicador | Nivel de Criticidad | Triage |
|-----------|---------------------|--------|
| 🔴 | MUY URGENTE | Nivel I |
| 🟠 | URGENTE | Nivel II |
| 🟢 | POCO URGENTE | Nivel III |
| 🔵 | NO URGENTE | Nivel IV |

