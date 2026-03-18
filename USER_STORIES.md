# Definición de Historias de Usuario

### HU-001 - Registro de paciente en el sistema

**Descripción:**

> Como **Personal Médico**,
> Quiero **generar un nuevo paciente con sus datos personales en el sistema**,
> Para **identificar de manera única al paciente**

**Criterios de Aceptación:**

```gherkin
Funcionalidad: Registro de Paciente

  Escenario: Registro exitoso de nuevo paciente con datos válidos
    Dado que el personal médico está en el formulario de registro de paciente
    Cuando ingresa identificacion, nombres, apellidos, fecha de nacimiento y genero en el formulario
    Y selecciona el botón "Guardar Registro"
    Entonces el sistema debe mostrar un cuadro de confirmación con el texto "Paciente registrado exitosamente"
    Y redirige al personal médico al formulario de registro de signos vitales

  Escenario: Registro falla cuando los campos obligatorios están vacíos
    Dado que el personal médico está en el formulario de registro de paciente
    Cuando ingresa nombres, apellidos, fecha de nacimiento y genero en el formulario
    Y selecciona el botón "Guardar Registro"
    Entonces el sistema muestra un mensaje de error en el formulario
    Y el personal médico se mantiene en el formulario de registro de paciente

  Escenario: Registro falla cuando la identificación está duplicada
    Dado que el personal médico está en el formulario de registro de paciente
    Cuando ingresa identificacion, nombres, apellidos, fecha de nacimiento y genero en el formulario
    Y selecciona el botón "Guardar Registro"
    Entonces el sistema muestra un mensaje de error en el formulario
    Y el personal médico se mantiene en el formulario de registro de paciente
```

### HU-002 - Registro de constantes vitales de un paciente

**Descripción:**

> Como **Personal Médico**,
> Quiero **registrar las constantes vitales de un paciente del sistema**,
> Para **mantener un registro clínico preciso del estado inicial del paciente**

**Criterios de Aceptación:**

```gherkin
Funcionalidad: Registro de Constantes Vitales

  Escenario: Registro exitoso de constantes vitales válidas de un paciente
    Dado que el personal médico está en el formulario de signos vitales del paciente
    Cuando ingresa frecuencia cardiaca, frecuencia respiratoria, saturacion o2, temperatura, presion, nivel de conciencia y nivel de dolor en el formulario
    Y selecciona el botón "Guardar"
    Entonces el sistema debe mostrar un cuadro de confirmación con el texto "Signos vitales registrados exitosamente"
    Y redirige al personal médico al Dashboard principal

  Escenario: Registro falla al ingresar valores fuera de rangos permitidos
    Dado que el personal médico está en el formulario de signos vitales del paciente
    Cuando ingresa el valor valor en el campo "signos vitales"
    Y selecciona el botón "Guardar"
    Entonces el sistema muestra un mensaje de error en el formulario
    Y el personal médico se mantiene en el formulario de signos vitales del paciente
```

### HU-003 - Clasificación automatizada de criticidad de un paciente

**Descripción:**

> Como **Personal Médico**,
> Quiero **que el sistema procese las constantes vitales del paciente**,
> Para **determinar automáticamente su nivel de prioridad clínica de acuerdo al Protocolo Manchester**

**Criterios de Aceptación:**

```gherkin
Funcionalidad: Clasificación automática de criticidad de pacientes

  Escenario: Clasificación automática de criticidad de pacientes
    Dado que el personal médico está en el Dashboard (/dashboard)
    Y que existen pacientes con sus constantes vitales registradas en el sistema
    Cuando el sistema procesa sus signos vitales en base al Protocolo Manchester
    Entonces el sistema debe mostrar los registros de pacientes con el texto de su criticidad asignada
```

### HU-004 - Asignación visual de criticidad de un paciente

**Descripción:**

> Como **Personal Médico**,
> Quiero **identificar visualmente la criticidad de los pacientes registrados en el sistema**,
> Para **priorizar la atención de los casos más críticos**

**Criterios de Aceptación:**

```gherkin
Funcionalidad: Asignación visual de colores en el texto

  Escenario: Visualización de indicadores de color en la lista de pacientes
    Dado que el personal médico se encuentra en el Dashboard (/dashboard)
    Y existen pacientes que ya han sido clasificados por el sistema
    Cuando el personal médico revisa la tabla de pacientes en espera
    Entonces cada registro de paciente debe mostrar el texto de su nivel de criticidad en su color correspondiente

  Escenario: Identificación visual de criticidad "Emergencia"
    Dado que el personal médico se encuentra en el Dashboard (/dashboard)
    Y que un paciente ha sido clasificado como "Emergencia"
    Cuando el registro está visible en el Dashboard
    Entonces el texto de la columna "Criticidad" debe mostrarse en color rojo
```

### HU-005 — Visualización de lista de pacientes ordenados por criticidad

**Story Points:** 3 SP

**Descripción:**

> Como **Personal Médico**,
> Quiero **poder visualizar los pacientes registrados ordenados por criticidad**,
> Para **identificar los pacientes que requieren atención prioritaria**

**Criterios de Aceptación:**

```gherkin
Funcionalidad: Lista de pacientes en el Dashboard

  Escenario: Visualización de pacientes en el Dashboard
    Dado que el personal médico está en la pantalla principal (/dashboard)
    Cuando existen registros de pacientes con signos vitales completos
    Entonces sistema debe mostrar la tabla de pacientes ordenados por su nivel de criticidad descendente

  Escenario: Estado vacío del Dashboard
    Dado que el personal médico está en la pantalla principal (/dashboard)
    Cuando no existen registros de pacientes en el sistema
    Entonces el sistema muestra el texto "No hay pacientes en espera" en pantalla
```

### HU-006 — Texto de color por paciente del tiempo de espera transcurrido

**Story Points:** 5 SP

**Descripción:**

> Como **Personal Médico**,
> Quiero **identificar visualmente mediante colores el estado del tiempo de espera de los pacientes**,
> Para **optimizar el tiempo de atención al paciente deacuerdo a los tiempos máximos permitidos**

**Criterios de Aceptación:**

```gherkin
Funcionalidad: Indicador visual del tiempo de espera

  Escenario: Visualización dinámica de texto de colores según el tiempo de espera transcurrido
    Dado que el personal médico está en el Dashboard principal (/dashboard)
    Y que existe un paciente registrado con criticidad "<nivel_criticidad>"
    Y su tiempo de espera máximo es de "<tiempo_max_espera>" minutos
    Cuando el tiempo transcurrido en espera es de "<tiempo_transcurrido>" minutos
    Entonces el texto de la columna "Tiempo en espera" debe mostrarse de color "<color_texto>"

    Ejemplos:
    | nivel_criticidad | tiempo_max_espera | tiempo_transcurrido | color_texto |
    | Emergencia       | 0                 | 1                   | Rojo        |
    | Muy Urgente      | 10                | 11                  | Rojo        |
    | Muy Urgente      | 10                | 6                   | Amarillo    |
    | Muy Urgente      | 10                | 3                   | Verde       |
```

### HU-007 — Filtrado de Dashboard por nivel de criticidad

**Story Points:** 5 SP

**Descripción:**

> Como **Personal Médico**,
> Quiero **filtrar la lista de pacientes según las categorías del Protocolo Manchester**,
> Para **gestionar eficientemente la lista de pacientes organizandolos por su estado específico de urgencia**

**Criterios de Aceptación:**

```gherkin
Funcionalidad: Filtro en el Dasboard por criticidad

  Escenario: Filtro de pacientes por criticidad específica
    Dado que el personal médico se encuentra en el Dashboard (/dashboard)
    Y existen pacientes registrados con distintos niveles de criticidad
    Cuando se selecciona el filtro de criticidad "Urgente"
    Entonces el Dashboard debe mostrar solo los registros de pacientes con la criticidad seleccionada

  Escenario: Ausencia de registros al seleccionar un filtro
    Dado que el personal médico se encuentra en el Dashboard (/dashboard)
    Y no existen pacientes registrados con criticidad "Emergencia"
    Cuando se selecciona el filtro de criticidad "Emergencia"
    Entonces el Dashboard muestra el texto "No hay pacientes en esta categoría"
```

### HU-008 — Cambio de estado del paciente

**Story Points:** 5 SP

**Descripción:**

> Como **Personal Médico**,
> Quiero **gestionar los estados de atención en la lista de pacientes (En Espera, Siendo Atendido y Finalizado)**,
> Para **controlar el progreso de la atención médica y mantener actualizado el estatus de los pacientes en el dashboard**

**Criterios de Aceptación (Gherkin):**

```gherkin
Funcionalidad: Cambio de estado del paciente

  Escenario: Estado inicial de un paciente
    Dado que el personal médico está en el Dashboard (/dashboard)
    Y hay un nuevo paciente con signos vitales registrados
    Cuando el registro aparece en el Dashboard
    Entonces la columna "Estado" muestra el texto "En Espera"
    Y aparece un botón con el texto "Asignar médico" al lado derecho del registro

  Escenario: Inicio de atención médica de un paciente
    Dado que el personal médico está en el Dashboard (/dashboard)
    Y existe un registro de paciente con estado "En Espera"
    Cuando se hace click en el botón "Asignar médico"
    Entonces la columna "Estado" muestra el texto "Siendo Atendido"
    Y aparece un botón con el texto "Finalizar cita" al lado derecho del registro
```

### HU-009 — Notificación visual de nuevo registro de paciente al personal médico disponible

**Story Points:** 5 SP

**Descripción:**

> Como **Médico**,
> Quiero **recibir una notificación visual cuando se registre un nuevo paciente en el sistema**,
> Para **gestionar eficientemente la atención de los pacientes en espera**

\*\*Criterios de Aceptación (Gherki

```gherkin
Funcionalidad: Registro de Usuario

  Escenario: Registro exitoso con credenciales válidas
    Dado que el usuario está en la página de registro (/register)
    Cuando el usuario ingresa su nombre completo
    Y ingresa su correo electrónico
    Entonces la cuenta se crea a través de Firebase Authentication
```

### HU-010 — Alerta sonora inmediata para ingresos Nivel 1 y 2 (Rojo y Naranja)

**Story Points:** 3 SP

**Descripción:**

> Como **Médico**,
> Quiero **recibir una notificación sonora cuando se registre un nuevo paciente para los niveles 1 y 2**,
> Para **priorizar la atención de pacientes con criticidad alta**

\*\*Criterios de Aceptación (Gherki

```gherkin
Funcionalidad: Registro de Usuario

  Escenario: Registro exitoso con credenciales válidas
    Dado que el usuario está en la página de registro (/register)
    Cuando el usuario ingresa su nombre completo
    Y ingresa su correo electrónico
    Entonces la cuenta se crea a través de Firebase Authentication
```

### HU-011 — Alerta visual por superación de tiempo máximo de espera según categoría

**Story Points:** 5 SP

**Descripción:**

> Como **Médico**,
> Quiero **recibir una notificación visual de que un paciente no ha sido atendido en el tiempo máximo de espera según el Protocolo Manchester**,
> Para **priorizar la atención de pacientes que no han sido atendidos y requieren atención inmediata**

\*\*Criterios de Aceptación (Gherki

```gherkin
Funcionalidad: Registro de Usuario

  Escenario: Registro exitoso con credenciales válidas
    Dado que el usuario está en la página de registro (/register)
    Cuando el usuario ingresa su nombre completo
    Y ingresa su correo electrónico
    Entonces la cuenta se crea a través de Firebase Authentication
```
