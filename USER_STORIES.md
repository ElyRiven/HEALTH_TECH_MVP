#### HU-005 — Visualización de lista de pacientes ordenados por criticidad

**Story Points:** 3 SP

**Descripción:**

> Como **Personal Médico**,
> Quiero **poder visualizar los pacientes registrados ordenados por criticidad**,
> Para **identificar los pacientes que requieren atención prioritaria**

**Criterios de Aceptación (Gherkin):**

```gherkin
Funcionalidad: Registro de Usuario

  Escenario: Registro exitoso con credenciales válidas
    Dado que el usuario está en la página de registro (/register)
    Cuando el usuario ingresa su nombre completo
    Y ingresa su correo electrónico
    Entonces la cuenta se crea a través de Firebase Authentication
```

#### HU-006 — Texto de color por paciente del tiempo de espera transcurrido

**Story Points:** 5 SP

**Descripción:**

> Como **Personal Médico**,
> Quiero **visualizar un texto de color (verde, amarillo o rojo) del tiempo transcurrido de un paciente desde su registro dependiendo de su criticidad**,
> Para **optimizar el tiempo de atención al paciente deacuerdo a sus necesidades médicas**

**Criterios de Aceptación (Gherkin):**

```gherkin
Funcionalidad: Registro de Usuario

  Escenario: Registro exitoso con credenciales válidas
    Dado que el usuario está en la página de registro (/register)
    Cuando el usuario ingresa su nombre completo
    Y ingresa su correo electrónico
    Entonces la cuenta se crea a través de Firebase Authentication
```

#### HU-007 —  Filtrado de Dashboard por nivel de criticidad

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

#### HU-008 —  Cambio de estado del paciente

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

#### HU-009 —  Notificación visual de nuevo registro de paciente al personal médico disponible

**Story Points:** 5 SP

**Descripción:**

> Como **Médico**,
> Quiero **recibir una notificación visual cuando se registre un nuevo paciente en el sistema**,
> Para **gestionar eficientemente la atención de los pacientes en espera**

**Criterios de Aceptación (Gherki
```gherkin
Funcionalidad: Registro de Usuario

  Escenario: Registro exitoso con credenciales válidas
    Dado que el usuario está en la página de registro (/register)
    Cuando el usuario ingresa su nombre completo
    Y ingresa su correo electrónico
    Entonces la cuenta se crea a través de Firebase Authentication
```

#### HU-010 —  Alerta sonora inmediata para ingresos Nivel 1 y 2 (Rojo y Naranja)

**Story Points:** 3 SP

**Descripción:**

> Como **Médico**,
> Quiero **recibir una notificación sonora cuando se registre un nuevo paciente para los niveles 1 y 2**,
> Para **priorizar la atención de pacientes con criticidad alta**

**Criterios de Aceptación (Gherki
```gherkin
Funcionalidad: Registro de Usuario

  Escenario: Registro exitoso con credenciales válidas
    Dado que el usuario está en la página de registro (/register)
    Cuando el usuario ingresa su nombre completo
    Y ingresa su correo electrónico
    Entonces la cuenta se crea a través de Firebase Authentication
```

#### HU-011 —  Alerta visual por superación de tiempo máximo de espera según categoría

**Story Points:** 5 SP

**Descripción:**

> Como **Médico**,
> Quiero **recibir una notificación visual de que un paciente no ha sido atendido en el tiempo máximo de espera según el Protocolo Manchester**,
> Para **priorizar la atención de pacientes que no han sido atendidos y requieren atención inmediata**

**Criterios de Aceptación (Gherki
```gherkin
Funcionalidad: Registro de Usuario

  Escenario: Registro exitoso con credenciales válidas
    Dado que el usuario está en la página de registro (/register)
    Cuando el usuario ingresa su nombre completo
    Y ingresa su correo electrónico
    Entonces la cuenta se crea a través de Firebase Authentication
```

