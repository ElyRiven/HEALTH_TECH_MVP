# Sub-task

## HU-001 - Registro de paciente en el sistema

**Story Points:** 13 SP

**Descripción:**

> Como **Personal Médico**,
> Quiero **generar un nuevo paciente con sus datos personales en el sistema**,
> Para **identificar de manera única al paciente**

### Sub-tareas: DEV

- Crear **Endpoint POST** (/api/v1/pacients/register) con los campos: **identificación, nombres, apellidos, fecha de nacimiento y genero** para hacer el registro de los pacientes


- Crear **Tabla de base datos** con nombre **pacientes** con los campos: **identificación, nombres, apellidos, fecha de nacimiento, genero, criticidad, tiempo de espera y estado**

- Crear componente UI **Registro de paciente** en url (/register) el cual sea un formulario en el que el **Personal Médico** ingresa los datos del inciso anterior, excluyendo los campos  **criticidad, tiempo de espera y estado**

- Crear elemento UI **Guardar Registro** dentro de componente **Registro de paciente** para guardar los datos del paciente

- Crear componente UI de confirmación con el texto "Paciente registrado exitosamente", este componente debe: redirigir al **formulario de registro de signos vitales**

### Sub-tareas: QA

- Diseño de matriz de datos de prueba para los escenarios definidos en los criterios de aceptación.

- Validación del formulario de UI que contenga los campos **identificación, nombres, apellidos, fecha de nacimiento y género**.

- Validación manual del endpoint POST creado para confirmar la creación de registros en base de datos y respuestas semánticas correctas,

- Automatización de los escenarios de prueba para verificar el correcto funcionamiento del registro de nuevos pacientes en el sistema.

## HU-002 - Registro de constantes vitales de un paciente

**Descripción:**

> Como **Personal Médico**,
> Quiero **registrar las constantes vitales de un paciente del sistema**,
> Para **mantener un registro clínico preciso del estado inicial del paciente**

### Sub-tareas: DEV

- Crear **Endpoint POST** (/api/v1/vitals/register/{id}) para actualizar a **paciente** con los siguientes datos: frecuencia cardiaca, frecuencia respiratoria, saturacion o2, temperatura, presion, nivel de conciencia y nivel de dolor

- Crear compononente UI **Registro de constantes vitales** dentor de la página (/vitals/{id}) el cual es un formulario con los campos: frecuencia cardiaca, frecuencia respiratoria, saturacion o2, temperatura, presion, nivel de conciencia y nivel de dolor

- Crear elemento UI **Guardar** en componente **Registro de constantes vitales** para registrar los datos vitales del paciente

- Crear componente UI de confirmación dentro de página (/vitals/{id}), que contenga el texto "Signos vitales registrados exitosamente", este componente debe tener un elemento que redirija al Dashboard Principal

### Sub-tareas: QA

- Diseño de matriz de rangos válidos y límites que el sistema puede aceptar en los campos de acuerdo con el Protocolo Manchester.

- Diseño de matriz de datos de prueba para comprobar la validación de datos en el formulario a través de los escenarios definidos.

- Validación manual del endpoint POST para verificar que el backend acepte únicamente valores permitidos.

- Automatización de los escenarios de prueba para comprobar funcionamiento esperado en el registro de constantes vitales de un paciente.

## HU-003 - Clasificación automatizada de criticidad de un paciente

**Descripción:**

> Como **Personal Médico**,
> Quiero **que el sistema procese las constantes vitales del paciente**,
> Para **determinar automáticamente su nivel de prioridad clínica de acuerdo al Protocolo Manchester**

### Sub-tareas: DEV

- Crear el algoritmo dentro del **endpoint POST** (/api/v1/vitals/register/{id}) que ejecute la clasificación de criticidad automática cuando se genere un nuevo registro en la tabla **Constantes vitales**
- Actualiza el campo **criticidad** del paciente al que se le registraron los signos vitales con el resultado de la clasificación automática

### Sub-tareas: QA

- Diseño de matriz de decisión de criticidad en base a los signos vitales según el Protocolo Manchester

- Ejecución de prueba de caja blanca mediante el endpoint POST (/api/v1/vitals/register/{id}) que compruebe el proceso y asignación correcta de criticidad a un paciente registrado

## HU-004 - Asignación visual de criticidad de un paciente

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

### Sub-tareas: QA

- Validación de UI en el Dashboard que muestre el texto de criticidad en su color correspondiente según el Protocolo Manchester

## HU-005 — Visualización de lista de pacientes ordenados por criticidad

**Descripción:**

> Como **Personal Médico**,
> Quiero **poder visualizar los pacientes registrados ordenados por criticidad**,
> Para **identificar los pacientes que requieren atención prioritaria**

### Sub-tareas: DEV

- Crear **Endpoint GET** (/api/v1/users/register) para obtener la lista de pacientes 

- Crear componente UI **Lista de pacientes**, ubicado en el home (/dashboard) el cual sea una tabla que me permita ordenar descentenmente la lista de acuerdo a su orden de criticidad

### Sub-tareas: QA

- Validación de UI en el Dashboard para comprobar que la lista de pacientes está ordenada por su criticidad descendentemente.

- Validación de UI en el Dashboard para comprobar que se muestra el mensaje correcto en ausencia de registros de pacientes.

## HU-006 — Texto de color por paciente del tiempo de espera transcurrido

**Descripción:**

> Como **Personal Médico**,
> Quiero **identificar visualmente mediante colores el estado del tiempo de espera de los pacientes**,
> Para **optimizar el tiempo de atención al paciente deacuerdo a los tiempos máximos permitidos**

### Sub-tareas: DEV

- Modificar el elemento UI **celda de paciente**, dentro del home (/dashboard) en la columna **Tiempo de espera** en el componente **Lista de pacientes**, 

| Nombres| Apellidos | Criticidad | **Tiempo de espera** | Estado de atención |
|--------|--------------|---------|-------|-------|
|Juan David | Franco Hernandez | 🟢 POCO URGENTE | **23 minutos** | En espera |

de acuerdo a los siguientes criterios

| Nivel | **Tiempo de espera** | Tiempo Máximo | Triage |
|----|---|------|------| 
| **Nivel 1** | <span style="color:red">**01 min**</span> | Inmediata | Atención inmediata (siempre rojo) |
| **Nivel 2** | <span style="color:red">**35 min**</span> | 30 min | Atención del urgencia en máximo 30 minutos |
| **Nivel 3** | <span style="color:red">**65 min**</span> | 40 min | El paciente requiere un examen complementario de urgencias pero se encuentra *estable* |
| **Nivel 4** | <span style="color:orange">**130 min**</span> | 60 min | El paciente presenta una condición estable sin riesgo vital inmediato, puede ser remitido a otro especialista | 
| **Nivel 5** | <span style="color:green">**40 min**</span> | 60 min | El paciente estable con problemas agudos o crónicos sin riesgo vital ni compromiso funcional evidente, se puede remitir a otro especialista |

para dar un indicador del nivel de prioridad del paciente de acuerdo a su clasificación en el triage y en términos de su tiempo de espera

**Story Points:** 5 SP

### Sub-tareas: QA

- Diseño de matriz de tiempos límite para cada nivel de criticidad siguiendo el Protocolo Manchester.

- Diseño de matriz de datos de prueba que permita comprobar el color del texto de tiempo de espera de los pacientes sin requerir esperas.

- Validación de UI que compruebe que el color del texto de tiempo de espera de los pacientes cambie según la lógica de tiempos de espera.

## HU-007 — Filtrado de Dashboard por nivel de criticidad

**Descripción:**

> Como **Personal Médico**,
> Quiero **filtrar la lista de pacientes según las categorías del Protocolo Manchester**,
> Para **gestionar eficientemente la lista de pacientes organizandolos por su estado específico de urgencia**

### Sub-tareas: DEV

- Crear un elemento de UI **Criticidad** en el home (/dashboard) para filtrar por la columna 
**Criticidad (🔴 MUY URGENTE, 🟠 URGENTE, 🟢 POCO URGENTE, 🔵 NO URGENTE)** para filtrar al paciente por su nivel de criticidad

| Nombres| Apellidos | **Criticidad** | Tiempo de espera| Estado de atención |
|--------|--------------|---------|-------|-------|
|Juan David | Franco Hernandez | **🟢 POCO URGENTE** | 23 minutos | En espera |

### Sub-tareas: QA

- Validación de UI al aplicar el filtro de criticidad y que el Dashboard muestre solo los registros con la criticidad seleccionada.

- Automatizar script de UI que compruebe los escenarios definidos para validar el correcto funcionamiento del filtro.

## HU-008 — Cambio de estado del paciente

**Descripción:**

> Como **Personal Médico**,
> Quiero **gestionar los estados de atención en la lista de pacientes (En Espera, Siendo Atendido y Finalizado)**,
> Para **controlar el progreso de la atención médica y mantener actualizado el estatus de los pacientes en el dashboard**

- Crear un elemento UI **Cambiar Estado** en el home (/dashboard) para modificar el estado de atención del 
**Estado de atención (En Espera, Siendo Atendido y Finalizado)** para modificar el estado de atención de los pacientes

| Nombres | Apellidos | Criticidad | Tiempo de espera | **Estado de atención** |
|---------|--------------|---------|-------|-------|
|Juan David | Franco Hernandez | 🟢 POCO URGENTE | 23 minutos | **En espera** |

Con las siguientes especificaciones

| Estado Actual | Acción Disponible |
|---------------|-------------------|
| En Espera | Asignado automaticamente cuando se ingresa el paciente |
| Siendo Atendido | Cambiar el estado de "En Espera" a "Siendo atendido" cuando el paciente ingresa a urgencias |
| Finalizado | Cambiar el estado de "Siendo atendido" a "Finalizado" cuando el paciente ya ha sido atendido |

### Sub-tareas: QA

- Definición de matriz de estados del paciente y su comportamiento esperado en el sistema.

- Verificación de UI para comprobar que el Dashboard muestra u oculta los botones correspondientes dependiendo del estado del paciente.

- Automatización de los escenarios de prueba definidos para validar el comportamiento del sistema según el estado del paciente.

## HU-009 — Notificación visual de nuevo registro de paciente al personal médico disponible

**Descripción:**

> Como **Médico**,
> Quiero **recibir una notificación visual cuando se registre un nuevo paciente en el sistema**,
> Para **gestionar eficientemente la atención de los pacientes en espera**

### Sub-tareas: DEV

- Crear un elemento UI **Paciente registrado** en la página (/dashboard) el cual contenga los siguientes datos **Nombres, Apellidos, Criticidad, Estado de atención** para notificar a **Médico** del ingreso exitoso de un paciente al sistema

**Story Points:** 5 SP

### Sub-tareas: QA

- Validación de UI para comprobar que la notificación que se muestra en pantalla contenga los datos del paciente.
**Story Points:** 1 SP

## HU-010 — Alerta sonora inmediata para ingresos Nivel 1 y 2 (Rojo y Naranja)

**Descripción:**

> Como **Médico**,
> Quiero **recibir una notificación sonora cuando se registre un nuevo paciente para los niveles 1 y 2**,
> Para **priorizar la atención de pacientes con criticidad alta**

### Sub-tareas: DEV

- Crear un componente UI con la **Notificación inmediata** para los niveles 1 y 2 de atención
**Story Points:** 2 SP

- Agregar una funcionalidad sonora al componente UI de atención inmediata, por cada nivel de atención
**Story Points:** 5 SP

### Sub-tareas: QA

- Diseño de matriz de datos de prueba para comprobar la ejecución de la alerta sonora para pacientes con criticidad alta.
**Story Points:** 1 SP

- Validación funcional de reproducción de sonido cuando se registre un paciente de criticidad alta en el sistema
**Story Points:** 1 SP

- Automatización de los escenarios de prueba para verificar el comportamiento esperado de la alerta sonora.
**Story Points:** 2 SP

## HU-011 — Alerta visual por superación de tiempo máximo de espera según categoría

**Story Points:** 3 SP

**Descripción:**

> Como **Médico**,
> Quiero **recibir una notificación visual de que un paciente no ha sido atendido en el tiempo máximo de espera según el Protocolo Manchester**,
> Para **priorizar la atención de pacientes que no han sido atendidos y requieren atención inmediata**

### Sub-tareas: DEV

- Agregar visualización a componente **Notificación inmediata** con mensaje **Paciente ingresado "Nombres y apellidos" atención inmediata -Nivel 1** para los pacientes de Nivel I de atención.
**Story Points:** 3 SP

- Agregar visualización a componente **Notificación inmediata** con mensaje **Paciente ingresado "Nombres y apellidos" secundaria - Nivel 2** para notificar de cuando llega un paciente dentro de los niveles 1 0 2
**Story Points:** 3 SP

### Sub-tareas: QA

- Automatización del escenario de prueba que permita verificar la visualización de la alerta en pantalla según los tiempos establecidos en la matriz de tiempos límite definida.
**Story Points:** 2 SP