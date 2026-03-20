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

- Configurar el campo `identificación` como primary key de la tabla.

**Backend**

- Crear **Endpoint POST** `/api/v1/pacients` con Express.

- Gestionar código de estado semántico y mensajes de respuesta:
  - 201, "Paciente registrado exitosamente", Id del paciente generado
  - 409, "Identificación duplicada"
  - 400, "campos obligatorios faltantes"

- Implementar validaciones de datos obligatorios y tipos de datos adecuados para los campos `identificación, nombres, apellidos, fecha de nacimiento, genero, hora de registro y estado`.

- Aplicar valores por defecto en los campos: `hora de registro y estado` iguales a la hora del servidor y "En Espera" correspondientemente.

- Implementar la creacion de un nuevo registro en la tabla `pacientes` si todas las validaciones han pasado.

**Frontend**

- Desarrollar el componente `PatientForm.tsx` usando la librería de componentes shadcn e integrarlo en la ruta `/register`.

- Crear el componente `ResponseAlert.tsx` para mostrar el mensaje recibido en la respuesta del endpoint.

- Implementar lógica de envío del formulario para consumir el endpoint POST.

- Implementar errores de validaciones en el formulario.

- Implementar el redireccionamiento hacia la ruta `/register/:pacientId` usando el Id enviado en la respuesta exitosa.

### Sub-tareas: QA

**Datos**

- Insertar 2 registros de pacientes con identificaciones válidas directamente en la tabla de PostgreSQL.

- Diseñar una matriz de datos que incluya casos borde (campos vacíos, fechas inválidas e identificaciones repetidas) para las pruebas automatizadas.

**Pruebas Manuales**

- Validar mediante Postman que el endpoint retorne los estados semánticos correspondientes con datos de prueba.

- Validar que el formulario de la vista `/register` muestre errores de validación usando datos de prueba.

**Automatización**

- Desarrollar los scripts de prueba en SerenityBDD con el patrón Screenplay para cubrir los escenarios de prueba definidos.

## HU-002 - Registro de constantes vitales de un paciente

**Story Points:** 13 SP

**Descripción:**

> Como **Personal Médico**,
> Quiero **registrar las constantes vitales de un paciente del sistema**,
> Para **mantener un registro clínico preciso del estado inicial del paciente**

### Sub-tareas: DEV

**Base de Datos**

- Crear tabla `constantes-vitales` con los campos `id constantes, id paciente, frecuencia cardiaca, frecuencia respiratoria, saturacion o2, temperatura, presion, nivel de conciencia y nivel de dolor`.

- Configurar el campo `id constantes` como identidad y primary key de la tabla.

- Configurar el campo `id paciente` como foreign key con relación uno - muchos con la tabla `pacientes`.

**Backend**

- Crear **Endpoint POST** `/api/v1/vitals/:patientId` con Express.

- Gestionar código de estado semántico y mensajes de respuesta:
  - 201, "Signos vitales registrados exitosamente"
  - 400, "Campos obligatorios faltantes"
  - 404, "El paciente con Id enviado no fue encontrado"
  - 422, "Los datos no cumplen con las validaciones"

- Implementar validaciones de datos obligatorios a todos los campos de la tabla.

- Implementar validaciones de rangos permitidos en los campos, definidos en la matriz de datos "Valores Permitidos por el Sistema".

- Implementar la creacion de un nuevo registro en la tabla `constantes-vitales` si todas las validaciones han pasado.

**Frontend**

- Crear componente `VitalSignsForm.tsx` usando la librería de componentes shadcn e integrarlo en la ruta `/register/:pacientId`.

- Reutilizar el componente `ResponseAlert.tsx` para mostrar el mensaje recibido en la respuesta del endpoint.

- Implementar lógica de envío del formulario para consumir el endpoint POST.

- Implementar lógica de acceso al componente `VitalSignsForm.tsx` únicamente si se especifica un id en la ruta.

- Implementar errores de validaciones en el formulario.

- Implementar el redireccionamiento hacia la ruta `/dashboard` si la respuesta es exitosa.

### Sub-tareas: QA

**Datos**

- Insertar 2 registros de pacientes manualmente en la base de datos PostgreSQL.

- Diseñar una matriz de datos que incluya casos borde (temperatura 0°, campos vacíos, saturación o2 5%) para las pruebas automatizadas.

**Pruebas Manuales**

- Validar mediante Postman que el endpoint retorne los estados semánticos correspondientes con datos de prueba.

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
