# Sub-task

## HU-001 - Registro de paciente en el sistema

**Descripción:**

> Como **Personal Médico**,
> Quiero **generar un nuevo paciente con sus datos personales en el sistema**,
> Para **identificar de manera única al paciente**

## Sub-tareas: DEV

- Crear **Endpoint POST** (/api/v1/users/register) con los campos: **nombres y apellidos, criticidad, tiempo de espera, estado** para hacer el registro de los usuarios
- Modificar campo **criticidad** de acuerdo a las siguientes opciones

| Indicador | Nivel de Criticidad |
|-----------|---------------------|
| 🔴        | MUY URGENTE         |
| 🟠        | URGENTE             |
| 🟢        | POCO URGENTE        |
| 🔵        | NO URGENTE          |

para clasificar al paciente dentro de **nivel de criticidad de acuerdo a las condiciones terapéuticas del paciente** de acuerdo al **Protocolo de Manchester**

- Modificar el campo **Tiempo de espera** para *visualizar el tiempo transcurrido desde el ingreso del paciente al sistema hasta el cambio en el tiempo de atención del paciente*
- Modificar el campo **estado** para *mostrar el estado de atención al paciente de acuerdo a su clasificación en el Sistema de Triage de Urgencias*


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

## HU-006 — Texto de color por paciente del tiempo de espera transcurrido

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



