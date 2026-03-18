# Definición de Historias de Usuario

### HU-001 - Registro de paciente en el sistema

**Descripción:**

> Como **Personal Médico**,
> Quiero **generar un nuevo paciente con sus datos personales en el sistema**,
> Para **identificar de manera única al paciente**

**Criterios de Aceptación (Gherkin):**

```gherkin
Funcionalidad: Registro de Usuario

  Escenario: Registro exitoso con credenciales válidas
    Dado que el usuario está en la página de registro (/register)
    Cuando el usuario ingresa su nombre completo
    Y hace clic en el botón "Crear Cuenta"
    Entonces la cuenta se crea a través de Firebase Authentication
```

### HU-002 - Registro de constantes vitales de un paciente

**Descripción:**

> Como **Personal Médico**,
> Quiero **registrar las constantes vitales de un paciente del sistema**,
> Para **mantener un registro clínico preciso del estado inicial del paciente**

**Criterios de Aceptación (Gherkin):**

### HU-003 - Clasificación automatizada de criticidad de un paciente

**Descripción:**

> Como **Personal Médico**,
> Quiero **que el sistema procese las constantes vitales del paciente**,
> Para **determinar automáticamente su nivel de prioridad clínica de acuerdo al Protocolo Manchester**

**Criterios de Aceptación (Gherkin):**

### HU-004 - Asignación visual de criticidad de un paciente

**Descripción:**

> Como **Personal Médico**,
> Quiero **identificar visualmente la criticidad de los pacientes registrados en el sistema**,
> Para **priorizar la atención de los casos más críticos**

**Criterios de Aceptación (Gherkin):**

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
> Quiero **visualizar un texto de color (verde, amarillo o rojo) del tiempo transcurrido de un paciente desde su registro dependiendo de su criticidad**,
> Para **optimizar el tiempo de atención al paciente deacuerdo a sus necesidades médicas**

**Criterios de Aceptación (Gherkin):**

```gherkin
Funcionalidad: Texto de color de tiempo de espera transcurrido

  Escenario: Texto de color Rojo en registros de criticidad "Emergencia"
    Dado que el personal médico está en la pantalla principal (/dashboard)
    Y se registra un nuevo paciente con criticidad "Emergencia"
    Cuando el nuevo registro aparece en la tabla del Dasbhoard
    Entonces el texto de la columna "Tiempo en espera" debe aparecer de color rojo, indicando necesidad de atención inmediata

  Escenario: Texto de color Rojo en registros de pacientes
    Dado que el personal médico está en la pantalla principal (/dashboard)
    Y existen registros de pacientes en espera
    Cuando la diferencia entre el tiempo máximo de espera y el tiempo registrado en el sistema es menor a 0
    Entonces el texto de la columna "Tiempo en espera" debe aparecer de color rojo, indicando que el tiempo de espera máximo se ha cumplido

  Escenario: Texto de color Amarillo en registros de pacientes
    Dado que el personal médico está en la pantalla principal (/dashboard)
    Y existen registros de pacientes en espera
    Cuando la diferencia entre el tiempo máximo de espera y el tiempo registrado en el sistema es menor a 5 minutos
    Entonces el texto de la columna "Tiempo en espera" debe aparecer de color amarillo, indicando que el tiempo de espera máximo está por cumplirse

  Escenario: Texto de color Verde en registros de pacientes
    Dado que el personal médico está en la pantalla principal (/dashboard)
    Y existen registros de pacientes en espera
    Cuando la diferencia entre el tiempo máximo de espera y el tiempo registrado en el sistema es mayor a 5 minutos
    Entonces el texto de la columna "Tiempo en espera" debe aparecer de color verde
```

### HU-007 — Filtrado de Dashboard por nivel de criticidad

**Story Points:** 5 SP

**Descripción:**

> Como **Personal Médico**,
> Quiero **filtrar la lista de pacientes según las categorías del Protocolo Manchester**,
> Para **gestionar eficientemente la lista de pacientes organizandolos por su estado específico de urgencia**

**Criterios de Aceptación (Gherkin):**

```gherkin
Funcionalidad: Registro de Usuario

  Escenario: Registro exitoso con credenciales válidas
    Dado que el usuario está en la página de registro (/register)
    Cuando el usuario ingresa su nombre completo
    Y ingresa su correo electrónico
    Entonces la cuenta se crea a través de Firebase Authentication
```

### HU-008 — Cambio de estado del paciente

**Story Points:** 5 SP

**Descripción:**

> Como **Personal Médico**,
> Quiero **gestionar los estados de atención en la lista de pacientes (En Espera, Siendo Atendido y Finalizado)**,
> Para **controlar el progreso de la atención médica y mantener actualizado el estatus de los pacientes en el dashboard**

**Criterios de Aceptación (Gherkin):**

```gherkin
Funcionalidad: Registro de Usuario

  Escenario: Registro exitoso con credenciales válidas
    Dado que el usuario está en la página de registro (/register)
    Cuando el usuario ingresa su nombre completo
    Y ingresa su correo electrónico
    Entonces la cuenta se crea a través de Firebase Authentication
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
