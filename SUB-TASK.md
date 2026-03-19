# Sub-task

## HU-001 - Registro de paciente en el sistema

**Descripción:**

> Como **Personal Médico**,
> Quiero **generar un nuevo paciente con sus datos personales en el sistema**,
> Para **identificar de manera única al paciente**

### Sub-tareas: DEV

- Crear **Endpoint POST** (/api/v1/users/register) con los campos: **nombres, apellidos, fecha de nacimiento y genero** para hacer el registro de los usuarios
**Story Points:** 3 SP

- Crear componente UI **Registro de paciente** en url (/register) el cual sea un formulario en el que el **Personal Médico** ingresa los datos del inciso anterior
**Story Points:** 2 SP

- Crear elemento UI **Guardar Registro** dentro de componente **Registro de paciente** para guardar los datos del paciente
**Story Points:** 1 SP

- Crear componente UI de confirmación con el texto "Paciente registrado exitosamente", este componente puede: redirigir al **formulario de registro de signos vitales**
**Story Points:** 2 SP

### Sub-tareas: QA

- Diseño de matriz de datos de prueba para los escenarios definidos en los criterios de aceptación.
**Story Points:** 1 SP

- Validación del formulario de UI que contenga los campos **identificación, nombres, apellidos, fecha de nacimiento y género**.
**Story Points:** 1 SP

### HU-002 - Registro de constantes vitales de un paciente

**Descripción:**

> Como **Personal Médico**,
> Quiero **registrar las constantes vitales de un paciente del sistema**,
> Para **mantener un registro clínico preciso del estado inicial del paciente**

### Sub-tareas: DEV

- Crear **Endpoint PUT** (/api/v1/users/update/{id}) para actualizar a **paciente** con los siguientes datos:  frecuencia cardiaca, frecuencia respiratoria, saturacion o2, temperatura, presion, nivel de conciencia y nivel de dolor
**Story Points:** 3 SP

- Crear compononente UI **Registro de constantes vitales**  el cual es un formulario con los campos: frecuencia cardiaca, frecuencia respiratoria, saturacion o2, temperatura, presion, nivel de conciencia y nivel de dolor
**Story Points:** 3 SP

- Crear elemento UI **Guardar** en componente **Registro de constantes vitales** para guardar registrar los datos vitales del paciente
**Story Points:** 2 SP

- Crear componente UI de confirmación, que contenga el texto "Signos vitales registrados exitosamente", este componente debe tener un elemento que redirija al Dashboard Principal
**Story Points:** 3 SP

### HU-003 - Clasificación automatizada de criticidad de un paciente

**Descripción:**

> Como **Personal Médico**,
> Quiero **que el sistema procese las constantes vitales del paciente**,
> Para **determinar automáticamente su nivel de prioridad clínica de acuerdo al Protocolo Manchester**

### Sub-tareas: DEV

- Tomar las constantes vitales del paciente registradas en el sistema
**Story Points:** 3 SP
- Procesar los signos vitales con base en el **Protocolo de Manchester**
**Story Points:** 3 SP
- Crear componente UI "Registros de pacientes" para ver los registros existentes incluyendo criticidad asignada 
**Story Points:** 3 SP

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

- Crear **Endpoint GET** (/api/v1/users/register) para obtener la lista de pacientes 
**Story Points:** 3 SP

- Crear componente UI **Lista de pacientes**, el cual sea una tabla que me permita ordenar descentenmente la lista de acuerdo a su orden de criticidad


**Story Points:** 5 SP

## HU-006 — Texto de color por paciente del tiempo de espera transcurrido

**Descripción:**

> Como **Personal Médico**,
> Quiero **visualizar un texto de color (verde, amarillo o rojo) del tiempo transcurrido de un paciente desde su registro dependiendo de su criticidad**,
> Para **optimizar el tiempo de atención al paciente deacuerdo a sus necesidades médicas**

## Sub-tareas: DEV

- Modificar el elemento UI **celda de paciente** en el componente **Lista de pacientes**

| Nombres| Apellidos | Criticidad | **Tiempo de espera** | Estado |
|--------|--------------|---------|-------|-------|
|Juan David | Franco Hernandez | 🟢 POCO URGENTE | **23 minutos** | En espera |

