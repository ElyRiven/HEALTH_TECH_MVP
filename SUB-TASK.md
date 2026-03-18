# Sub-task

## HU-001 - Registro de paciente en el sistema

**Descripción:**

> Como **Personal Médico**,
> Quiero **generar un nuevo paciente con sus datos personales en el sistema**,
> Para **identificar de manera única al paciente**

## Sub-tareas: DEV

### Backend

- Crear el endpoint POST con el link (/register) con los siguientes datos: nombres y apellidos, criticidad, tiempo de espera

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

- Generar el campo **criticidad**, para crear un botón de opciones con las siguientes campos

| Indicador | Nivel de Criticidad |
|-----------|---------------------|
| 🔴 | MUY URGENTE |
| 🟠 | URGENTE |
| 🟢 | POCO URGENTE | 
| 🔵 | NO URGENTE |

el propósito de este botón es que el **Personal médico** haga una identificación del estado del páciente de acuerdo a sus condiciones terapeúticas de acuerdo al **Protocolo de Manchester**

### Frontend

- Crear un formulario en una página pagina (/register) con los siguientes campos: nombres y apellidos, criticidad, tiempo de espera
- Generar el campo **criticidad**, a partir de la tabla del triage obtenida en el inciso anterior
- Realizar un campo de **tiempo de espera** el cual activa un **contador en minutos** que registra el tiempo transcurrido entre la generación de la petición, hasta el cambio de estado en la consulta del paciente.
- Hacer un botón llamado **Registrar Usuario** el cual haga el registro del usuario de manera única
- Generar un componente de confirmación de **Usuario creado exitosamente**

### Backend


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



