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
> Quiero **Filtrar la lista de pacientes según las categorías del Protocolo Manchester**,
> Para **Gestionar eficientemente la lista de pacientes organizandolos por su estado específico de urgencia**

**Criterios de Aceptación (Gherkin):**

```gherkin
Funcionalidad: Registro de Usuario

  Escenario: Registro exitoso con credenciales válidas
    Dado que el usuario está en la página de registro (/register)
    Cuando el usuario ingresa su nombre completo
    Y ingresa su correo electrónico
    Entonces la cuenta se crea a través de Firebase Authentication
```