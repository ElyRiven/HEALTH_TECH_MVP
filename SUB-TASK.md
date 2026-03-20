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

**Automatización**

- Desarrollar los scripts de prueba en SerenityBDD con el patrón Screenplay para cubrir los escenarios de prueba definidos usando la matriz de datos creada.

## HU-003 - Clasificación automatizada de criticidad de un paciente

**Story Points:** 13 SP

**Descripción:**

> Como **Personal Médico**,
> Quiero **que el sistema procese las constantes vitales del paciente**,
> Para **determinar automáticamente su nivel de prioridad clínica de acuerdo al Protocolo Manchester**

### Sub-tareas: DEV

**Backend**

- Implementar el servicio `TriageEngine.ts` que procese las constantes vitales y retorne el nivel de criticidad respectivo según la matriz "Reglas de Criticidad".

- Integrar el servicio de clasificación en el endpoint POST para calcular la criticidad cuando un registro se genera exitosamente.

- Implementar la actualización del campo criticidad del paciente en la tabla `pacientes` con el resultado del servicio.

### Sub-tareas: QA

**Datos**

- Diseñar una matriz de datos de prueba que incluya todos los flujos de criticidad del Protocolo Manchester en base a la matriz "Reglas de Criticidad".

- Insertar los registros de pacientes y sus constantes vitales definidas en la matriz de datos.

**Pruebas Manuales**

- Validar mediante Postman que los registros de pacientes generados manualmente incluyan el campo `criticidad` asignado automáticamente.

**Automatización**

- Desarrollar scripts en SerenityBDD que cubran los escenarios definidos para la historia de usuario.

## HU-004 - Asignación visual de criticidad de un paciente

**Story Points:** 2 PS

**Descripción:**

> Como **Personal Médico**,
> Quiero **identificar visualmente la criticidad de los pacientes registrados en el sistema**,
> Para **priorizar la atención de los casos más críticos**

### Sub-tareas: DEV

**Frontend**

- Crear un objeto utilitario `TriageColors.ts` que asocie cada nivel de criticidad con su clase CSS correspondiente.

- Modificar el componente `PatientTable.tsx` para aplicar los estilos condicionales al texto de la columna "Criticidad" basado en el valor recibido en cada fila.

### Sub-tareas: QA

**Datos**

- Insertar 5 registros manualmente de pacientes y constantes vitales en PostgreSQL que cubran los 5 posibles niveles de criticidad del sistema.

**Automatización**

- Desarrollar los scripts de prueba en SerenityBDD para cubrir los escenarios definidos en la historia de usuario.

## HU-005 — Visualización de lista de pacientes ordenados por criticidad

**Story Points:** 8 SP

**Descripción:**

> Como **Personal Médico**,
> Quiero **poder visualizar los pacientes registrados ordenados por criticidad**,
> Para **identificar los pacientes que requieren atención prioritaria**

### Sub-tareas: DEV

**Backend**

- Crear **Endpoint GET** `(/api/v1/pacients)` con Express.

- Implementar la consulta a la tabla `pacientes` que retorne la lista de pacientes registrados ordenados descendentemente por su criticidad.

- Gestionar el envío del código de status `200` y los datos cuando la consulta se procesa correctamente.

**Frontend**

- Crear el componente `PatientTable.tsx` usando la librería de componentes shadcn e integrarlo en la ruta `/dashboard`.

- Implementar el consumo del endpoint GET automáticamente al acceder a la ruta `/dashboard` usando la librería axios.

- Implementar el mapeo de la respuesta del endpoint para renderizar los datos obtenidos en el componente `PatientTable.tsx`.

- Implementar el renderizado del texto "No hay pacientes en espera" si la consulta no contiene datos.

### Sub-tareas: QA

**Datos**

- Insertar manualmente 5 registros de pacientes y constantes vitales en PostgreSQL para registrar todos los niveles de criticidad en el sistema.

**Pruebas Manuales**

- Validar mediante Postman que el endpoint GET retorne la estructura JSON esperada y el código de estado correcto.

**Automatización**

- Desarrollar los script de automatización en SerenityBDD para cubrir los escenarios de prueba definidos.

## HU-006 — Texto de color por paciente del tiempo de espera transcurrido

**Story Points:** 5 SP

**Descripción:**

> Como **Personal Médico**,
> Quiero **identificar visualmente mediante colores el estado del tiempo de espera de los pacientes**,
> Para **optimizar el tiempo de atención al paciente deacuerdo a los tiempos máximos permitidos**

### Sub-tareas: DEV

**Frontend**

- Crear un helper `waitingTimeCalculator.ts` que reciba los campos `hora de registro` y `criticidad` y devuelva el color correspondiente a la matriz "Tiempos Límite".

- Implementar un hook personalizado `useTimer.ts` que recalcule el tiempo transcurrido en intervalos de 15 segundos.

- Modificar el componente `PatientTable.tsx` para aplicar estilos condicionales al texto de la columna "Tiempo en espera" según el resultado del calculator.

### Sub-tareas: QA

**Datos**

- Registrar manualmente 3 pacientes y signos vitales en PostgreSQL con el campo `hora de registro` modificada para forzar los 3 estados de color en el sistema.

**Pruebas Manuales**

- Comprobar visualmente que el dashboard muestra el texto de la columna "Tiempo en espera" de los colores correspondientes a cada registro.

**Automatización**

- Desarrollar los scripts de automatización en SerenityBDD para cubrir los escenarios de prueba definidos en la historia de usuario.

## HU-007 — Filtrado de Dashboard por nivel de criticidad

**Story Points:** 5 SP

**Descripción:**

> Como **Personal Médico**,
> Quiero **filtrar la lista de pacientes según las categorías del Protocolo Manchester**,
> Para **gestionar eficientemente la lista de pacientes organizandolos por su estado específico de urgencia**

### Sub-tareas: DEV

**Frontend**

- Crear el componente `CriticityFilter.tsx` de tipo dropdown usando la librería de componentes shadcn que incluya las 5 categorías de criticidad más la opción "Todos".

- Implementar la lógica del filtro seleccionado mediante el método `.filter()` sobre los datos de pacientes obtenido del backend para generar la lista filtrada.

- Modificar la lógica de renderizado para mostrar el mensaje "No hay pacientes en esta categoría" cuando el array resultante del filtro esté vacío.

### Sub-tareas: QA

**Datos**

- Insertar al menos un registro de paciente y constantes vitales manualmente en PostgreSQL que incluya cada nivel de criticidad.

**Automatización**

- Desarrollar scripts de automatización en SerenityBDD que cubran los escenarios definidos en la historia de usuario.

## HU-008 — Cambio de estado del paciente

**Story Points:** 3 SP

**Descripción:**

> Como **Personal Médico**,
> Quiero **gestionar los estados de atención en la lista de pacientes (En Espera, Siendo Atendido y Finalizado)**,
> Para **controlar el progreso de la atención médica y mantener actualizado el estatus de los pacientes en el dashboard**

### Sub-tareas: DEV

**Backend**

- Crear **Endpoint PATCH** `(/api/v1/pacients/:pacientId)` con Express.

- Gestionar el envio de códigos semánticos y mensajes de respuesta:
  - 200, "Estado del paciente actualizado correctamente"
  - 404, "El valor recibido no es un estado válido"

- Implementar la actualización del campo `estado` del registro correspondiente de la tabla `pacientes` con el valor que recibe el endpoint.

**Frontend**

- Desarrollar el componente `StatusButton.tsx` que renderice condicionalmente el botón en base al estado actual del paciente según la matriz "Estados del Paciente".

- Implementar la funcionalidad de consumo del endpoint PATCH para enviar el nuevo estado del paciente y actualizar su registro en la base de datos.

### Sub-tareas: QA

**Datos**

- Insertar manualmente 3 registros de pacientes y constantes vitales en PostgreSQL, cada uno con los tres estados posibles en el campo "estado".

**Pruebas Manuales**

- Validar mediante Postman que el endpoint PATCH retorne el código 404 al enviar un estado no definido en el sistema.

**Automatización**

- Desarrollar scripts de automatización en SerenityBDD que cubran todos los escenarios de prueba definidos.

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
