# Desgloce de Sub-Tareas de historias de Usuarios

## Stack tecnológico

- Frontend: React v19
- Backend: NodeJS v22.14 + Express
- Base de Datos: PostgreSQL v15
- Automatización: SerenityBDD v4.2

## HU-001 - Registro de paciente en el sistema

**Story Points:** 13 SP

**Descripción:**

> Como **Personal Médico**,
> Quiero **generar un nuevo paciente con sus datos personales en el sistema**,
> Para **identificar de manera única al paciente**

### Sub-tareas: DEV

**Base de Datos**

- Crear tabla `pacientes` con los campos `identificación, nombres, apellidos, fecha de nacimiento, genero, criticidad, hora de registro y estado`.

- Configurar el campo `identificación` como identidad y primary key de la tabla.

**Backend**

- Crear **Endpoint POST** `/api/v1/pacients` con Express y gestionar código de estado semántico (201 creado, 409 identificación duplicada, 400 campos obligatorios faltantes).

- Implementar validaciones de datos obligatorios y tipos de datos adecuados para los campos `identificación, nombres, apellidos, fecha de nacimiento, genero, hora de registro y estado`.

- Aplicar valores por defecto en los campos: `hora de registro y estado` iguales a la hora del servidor y "En Espera" correspondientemente.

### Sub-tareas: QA

- Diseño de matriz de datos de prueba para los escenarios definidos en los criterios de aceptación.

- Validación del formulario de UI que contenga los campos **identificación, nombres, apellidos, fecha de nacimiento y género**.

- Validación manual del endpoint POST creado para confirmar la creación de registros en base de datos y respuestas semánticas correctas,

- Automatización de los escenarios de prueba para verificar el correcto funcionamiento del registro de nuevos pacientes en el sistema.

## HU-002 - Registro de constantes vitales de un paciente

**Story Points:** 13 SP

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

**Story Points:** 13 SP

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

**Story Points:** 2 PS

**Descripción:**

> Como **Personal Médico**,
> Quiero **identificar visualmente la criticidad de los pacientes registrados en el sistema**,
> Para **priorizar la atención de los casos más críticos**

- Modificar el elemento UI **fila de paciente**, en la columna **criticidad** en la tabla **Lista de pacientes**, para que tenga el color correspondiente a la criticidad asiganada al paciente, según la matriz de criticidad definida

### Sub-tareas: QA

- Validación de UI en el Dashboard que muestre el texto de criticidad en su color correspondiente según el Protocolo Manchester

## HU-005 — Visualización de lista de pacientes ordenados por criticidad

**Story Points:** 13 SP

**Descripción:**

> Como **Personal Médico**,
> Quiero **poder visualizar los pacientes registrados ordenados por criticidad**,
> Para **identificar los pacientes que requieren atención prioritaria**

### Sub-tareas: DEV

- Crear **Endpoint GET** (/api/v1/pacients) para obtener la lista de pacientes

- Para **Endpoint GET** (/api/v1/pacients) ordenar la lista de pacientes descendentemente de acuerdo a su nivel de criticidad

- Crear componente UI **Lista de pacientes**, ubicado en el home (/dashboard) el cual sea una tabla para cumplir con el punto anterior

### Sub-tareas: QA

- Validación de UI en el Dashboard para comprobar que la lista de pacientes está ordenada por su criticidad descendentemente.

- Validación de UI en el Dashboard para comprobar que se muestra el mensaje correcto en ausencia de registros de pacientes.

## HU-006 — Texto de color por paciente del tiempo de espera transcurrido

**Story Points:** 5 SP

**Descripción:**

> Como **Personal Médico**,
> Quiero **identificar visualmente mediante colores el estado del tiempo de espera de los pacientes**,
> Para **optimizar el tiempo de atención al paciente deacuerdo a los tiempos máximos permitidos**

### Sub-tareas: DEV

- Modificar el elemento UI **fila de paciente**, dentro del home (/dashboard) en la columna **Tiempo de espera** en el componente **Lista de pacientes** para dar un indicador visual del nivel de prioridad del paciente de acuerdo a su clasificación definida en la matriz de tiempos límite.

### Sub-tareas: QA

- Diseño de matriz de tiempos límite para cada nivel de criticidad siguiendo el Protocolo Manchester.

- Diseño de matriz de datos de prueba que permita comprobar el color del texto de tiempo de espera de los pacientes sin requerir esperas.

- Validación de UI que compruebe que el color del texto de tiempo de espera de los pacientes cambie según la lógica de tiempos de espera.

- Automatización de los escenarios de prueba para validar el comportamiento visual del elemento fila de paciente, en su columna "Tiempo de espera".

## HU-007 — Filtrado de Dashboard por nivel de criticidad

**Story Points:** 5 SP

**Descripción:**

> Como **Personal Médico**,
> Quiero **filtrar la lista de pacientes según las categorías del Protocolo Manchester**,
> Para **gestionar eficientemente la lista de pacientes organizandolos por su estado específico de urgencia**

### Sub-tareas: DEV

- Crear un elemento de UI **Criticidad** en el home (/dashboard) para filtrar por la columna **Criticidad** para mostrar la lista de pacientes por la criticidad asignada.

### Sub-tareas: QA

- Validación de UI al aplicar el filtro de criticidad y que el Dashboard muestre solo los registros con la criticidad seleccionada.

- Automatizar script de UI que compruebe los escenarios definidos para validar el correcto funcionamiento del filtro.

## HU-008 — Cambio de estado del paciente

**Story Points:** 3 SP

**Descripción:**

> Como **Personal Médico**,
> Quiero **gestionar los estados de atención en la lista de pacientes (En Espera, Siendo Atendido y Finalizado)**,
> Para **controlar el progreso de la atención médica y mantener actualizado el estatus de los pacientes en el dashboard**

### Sub-tareas: DEV

- Crear un elemento UI **Cambiar Estado** en el home (/dashboard) para modificar el estado de atención de la columna **Estado** para modificar el estado de atención de los pacientes.

### Sub-tareas: QA

- Definición de matriz de estados del paciente y su comportamiento esperado en el sistema.

- Verificación de UI para comprobar que el Dashboard muestra u oculta los botones correspondientes dependiendo del estado del paciente.

- Automatización de los escenarios de prueba definidos para validar el comportamiento del sistema según el estado del paciente.

## HU-009 — Notificación visual de nuevo registro de paciente al personal médico disponible

**Story Points:** 2 SP

**Descripción:**

> Como **Médico**,
> Quiero **recibir una notificación visual cuando se registre un nuevo paciente en el sistema**,
> Para **gestionar eficientemente la atención de los pacientes en espera**

### Sub-tareas: DEV

- Crear un elemento UI **Paciente registrado** en la página (/dashboard) el cual contenga los siguientes datos **Nombre, Apellido y Criticidad** para notificar a **Médico** del registro exitoso de un paciente al sistema

### Sub-tareas: QA

- Validación de UI para comprobar que la notificación que se muestra en pantalla contenga los datos del paciente.

## HU-010 — Alerta sonora inmediata para ingresos Nivel 1 y 2 (Rojo y Naranja)

**Story Points:** 5 SP

**Descripción:**

> Como **Médico**,
> Quiero **recibir una notificación sonora cuando se registre un nuevo paciente para los niveles 1 y 2**,
> Para **priorizar la atención de pacientes con criticidad alta**

### Sub-tareas: DEV

- Agregar una funcionalidad sonora al componente UI de atención inmediata para los niveles de criticidad 1 y 2.

### Sub-tareas: QA

- Diseño de matriz de datos de prueba para comprobar la ejecución de la alerta sonora para pacientes con criticidad alta.

- Validación funcional de reproducción de sonido cuando se registre un paciente de criticidad alta en el sistema.

- Automatización de los escenarios de prueba para verificar el comportamiento esperado de la alerta sonora.

## HU-011 — Alerta visual por superación de tiempo máximo de espera según categoría

**Story Points:** 3 SP

**Descripción:**

> Como **Médico**,
> Quiero **recibir una notificación visual de que un paciente no ha sido atendido en el tiempo máximo de espera según el Protocolo Manchester**,
> Para **priorizar la atención de pacientes que no han sido atendidos y requieren atención inmediata**

### Sub-tareas: DEV

- Agregar visualización a componente **Notificación inmediata** con mensaje **Tiempo de espera excedido. Paciente "Nombre y apellido", Criticidad "criticidad del paciente"** cuando el tiempo de espera del paciente haya excedido el límite máximo.

### Sub-tareas: QA

- Diseño de matriz de datos de pruebas para comprobar que la alerta visual por tiempo de espera máximo excedido aparezca en pantalla.

- Automatización del escenario de prueba que permita verificar la visualización de la alerta en pantalla según los tiempos establecidos en la matriz de tiempos límite definida.
