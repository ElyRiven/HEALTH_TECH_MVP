# Sub-task

## HU-001 - Registro de paciente en el sistema

**Descripción:**

> Como **Personal Médico**,
> Quiero **generar un nuevo paciente con sus datos personales en el sistema**,
> Para **identificar de manera única al paciente**

### Sub-tareas: DEV

- Crear **Endpoint POST** (/api/v1/users/register) con los campos: **nombres, apellidos, fecha de nacimiento y genero** para hacer el registro de los usuarios
**Story Points:** 3 SP

- Crear componente UI **Registro de paciente** el cual sea un formulario en el que el **Personal Médico** ingresa los datos del inciso anterior
**Story Points:** 2 SP

- Crear elemento UI **Guardar Registro** dentro de componente **Registro de paciente** para guardar los datos del paciente
**Story Points:** 1 SP

- Crear componente UI de confirmación con el texto "Paciente registrado exitosamente"
**Story Points:** 1 SP

### HU-002 - Registro de constantes vitales de un paciente

**Descripción:**

> Como **Personal Médico**,
> Quiero **registrar las constantes vitales de un paciente del sistema**,
> Para **mantener un registro clínico preciso del estado inicial del paciente**

### Sub-tareas: DEV

- Crear **Endpoint PUT** (/api/v1/users/update/{id}) para actualizar a **paciente** y añadir las condiciones médicas
**Story Points:** 2 SP

- añadir un componente UI **Registro de condiciones clínicas del paciente** para registrar las condiciones clínicas del paciente
**Story Points:** 2 SP

- Integra a componente UI con **Formulario de registro de paciente** para agregar la descripción de la condición del paciente
**Story Points:** 2 SP

### HU-003 - Clasificación automatizada de criticidad de un paciente

**Descripción:**

> Como **Personal Médico**,
> Quiero **que el sistema procese las constantes vitales del paciente**,
> Para **determinar automáticamente su nivel de prioridad clínica de acuerdo al Protocolo Manchester**

### Sub-tareas: DEV

- Crear **Endpoint PUT** /api/v1/users/{id}/priority-assessment para procesar las constantes vitales del paciente
**Story Points:** 2 SP


#### notas de Ellie

- un formulario registra los datos básicos (HU-001): Nombres y apellidos, 
- otro formulario 

### HU-004 - Asignación visual de criticidad de un paciente

**Descripción:**

> Como **Personal Médico**,
> Quiero **identificar visualmente la criticidad de los pacientes registrados en el sistema**,
> Para **priorizar la atención de los casos más críticos**

- Modificar campo **criticidad** de acuerdo a las siguientes opciones

| Indicador | Nivel de Criticidad |
|-----------|---------------------|
| 🔴        | MUY URGENTE         |
| 🟠        | URGENTE             |
| 🟢        | POCO URGENTE        |
| 🔵        | NO URGENTE          |

para clasificar al paciente dentro de **nivel de criticidad de acuerdo a las condiciones terapéuticas del paciente** de acuerdo al **Protocolo de Manchester**
**Story Points:** 2 SP




## HU-005 — Visualización de lista de pacientes ordenados por criticidad

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



