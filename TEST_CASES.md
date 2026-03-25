# Casos de Prueba - HealthTech MVP

## HU-001 - Registro de paciente en el sistema

### TC-001 - Registro exitoso de nuevo paciente con datos válidos

**Escenario Gherkin:**

```gherkin
Dado que el personal médico está en el formulario de registro de paciente (/register)
Cuando ingresa los datos: "<identificacion>", "<nombres>", "<apellidos>", "<fecha_nacimiento>" y "<genero>"
Y selecciona el botón "Guardar Registro"
Entonces el sistema muestra un cuadro de confirmación con el texto "Paciente registrado exitosamente"
Y redirige al personal médico al formulario de registro de signos vitales (/register/:pacientId)
```

**Precondiciones:**

- El sistema está disponible y el formulario `/register` es accesible.
- No existe ningún paciente con identificación duplicada en la base de datos.

**Datos de entrada:**

```gherkin
| identificacion | nombres        | apellidos       | fecha_nacimiento | genero    |
| 1002003001     | Luis Andres    | Caceres Estrada | 1999-05-21       | masculino |
| 1002003002     | Andrea Cecilia | Tupiza Espinoza | 1983-01-08       | femenino  |
```

**Pasos de ejecución:**

1. Navegar a la ruta `/register`.
2. Ingresar el dato en el campo Identificación.
3. Ingresar el dato en el campo Nombres.
4. Ingresar el dato en el campo Apellidos.
5. Ingresar el dato en el campo Fecha de nacimiento.
6. Seleccionar la opción en el campo Género.
7. Hacer clic en el botón "Guardar Registro".

**Resultado esperado:**

- El sistema muestra un cuadro de confirmación con el mensaje "Paciente registrado exitosamente".
- El sistema redirige a la ruta `/register/:pacientId` con el ID del paciente recién creado.
- El backend responde con código HTTP `201`.

**Resultado obtenido:** Sin ejecutar  
**Estado:** Sin ejecutar  
**Prioridad:** Crítica

### TC-002 - Registro falla cuando los campos obligatorios están vacíos

**Escenario Gherkin:**

```gherkin
Dado que el personal médico está en el formulario de registro de paciente (/register)
Cuando ingresa los datos: "<nombres>", "<apellidos>", "<fecha_nacimiento>" y "<genero>"
Y selecciona el botón "Guardar Registro"
Entonces el sistema muestra un mensaje de error en el campo identificación
Y el personal médico se mantiene en el formulario de registro de paciente (/register)
```

**Precondiciones:**

- El sistema está disponible y el formulario `/register` es accesible.

**Datos de entrada:**

```gherkin
| nombres        | apellidos       | fecha_nacimiento | genero    |
| Luis Andres    | Caceres Estrada | 1999-05-21       | masculino |
| Andrea Cecilia | Tupiza Espinoza | 1983-01-08       | femenino  |
```

**Pasos de ejecución:**

1. Navegar a la ruta `/register`.
2. Dejar el campo Identificación vacío.
3. Ingresar el dato en el campo Nombres.
4. Ingresar el dato en el campo Apellidos.
5. Ingresar el dato en el campo Fecha de nacimiento.
6. Seleccionar la opción correspondiente en el campo Género.
7. Hacer clic en el botón "Guardar Registro".

**Resultado esperado:**

- El sistema muestra un mensaje de error en el campo Identificación indicando que es obligatorio.
- El usuario permanece en la ruta `/register`.
- No se crea ningún registro en la base de datos.
- El backend responde con código HTTP `400`.

**Resultado obtenido:** Sin ejecutar  
**Estado:** Sin ejecutar  
**Prioridad:** Alta

### TC-003 - Registro falla cuando la identificación está duplicada

**Escenario Gherkin:**

```gherkin
Dado que el personal médico está en el formulario de registro de paciente (/register)
Y ya existe un paciente con identificación "1002003003" en el sistema
Cuando ingresa la identificación "1002003003" junto con los demás datos válidos del formulario
Y selecciona el botón "Guardar Registro"
Entonces el sistema muestra un mensaje de error indicando que la identificación ya está registrada
Y el personal médico se mantiene en el formulario de registro de paciente (/register)
```

**Precondiciones:**

- El sistema está disponible y el formulario `/register` es accesible.
- Existe un registro previo en la tabla `pacientes` con identificación "1002003003".

**Datos de entrada:**

```gherkin
| identificacion | nombres        | apellidos       | fecha_nacimiento | genero    |
| 1002003003     | Sofia Camila   | Paz Chiriboga   | 1989-09-09       | femenino  |
```

**Pasos de ejecución:**

1. Insertar en PostgreSQL un paciente con identificación "1002003003" y los datos personales de la tabla.
2. Navegar a la ruta `/register`.
3. Ingresar "1002003003" en el campo Identificación.
4. Completar los demás campos con los datos de la tabla.
5. Hacer clic en el botón "Guardar Registro".

**Resultado esperado:**

- El sistema muestra un mensaje de error indicando que la identificación ya existe en el sistema.
- El usuario permanece en la ruta `/register`.
- No se crea un registro duplicado en la base de datos.
- El backend responde con código HTTP `409`.

**Resultado obtenido:** Sin ejecutar  
**Estado:** Sin ejecutar  
**Prioridad:** Alta

## HU-002 - Registro de constantes vitales de un paciente

### TC-004 - Registro exitoso de constantes vitales con valores válidos

**Escenario Gherkin:**

```gherkin
Dado que el personal médico está en el formulario de signos vitales (/register/:pacientId)
Y el paciente con el ID especificado existe en el sistema
Cuando ingresa "<frecuencia_cardiaca>", "<frecuencia_respiratoria>", "<saturación_O2>", "<temperatura>", "<presión>", "<nivel_conciencia>" y "<nivel_dolor>"
Y todos los valores están dentro de los rangos permitidos por el sistema
Y selecciona el botón "Guardar"
Entonces el sistema muestra un cuadro de confirmación con el texto "Signos vitales registrados exitosamente"
Y redirige al personal médico al Dashboard (/dashboard)
```

**Precondiciones:**

- El sistema está disponible y la ruta `/register/:pacientId` es accesible con un ID válido.
- Existe un paciente registrado con el ID especificado en la URL.

**Datos de entrada:**

```gherkin
| frecuencia_cardiaca | frecuencia_respiratoria | saturación_O2 | temperatura | presión | nivel_conciencia | nivel_dolor |
| 80      | 16   | 98   | 36.5       | 120/80  | Alerta  | 2 |
| 105     | 23   | 95   | 37.9       | 148/70  | Confuso | 3 |
```

**Pasos de ejecución:**

1. Insertar un paciente en PostgreSQL y obtener su ID.
2. Navegar a `/register/:pacientId` con el ID del paciente creado.
3. Ingresar cada uno de los valores de la tabla de datos.
4. Hacer clic en el botón "Guardar".

**Resultado esperado:**

- El sistema muestra el mensaje "Signos vitales registrados exitosamente".
- El sistema redirige a `/dashboard`.
- El backend responde con código HTTP `201`.
- Se crea un registro en la tabla `constantes-vitales` asociado al paciente.

**Resultado obtenido:** Sin ejecutar  
**Estado:** Sin ejecutar  
**Prioridad:** Crítica

---

### TC-005 - Registro falla al ingresar valores fuera de rangos permitidos

**Escenario Gherkin:**

```gherkin
Dado que el personal médico está en el formulario de signos vitales (/register/:pacientId)
Cuando ingresa una "<saturación O2>" que está fuera del rango permitido por el sistema
Y completa los demás campos con valores permitidos por el sistema
Y selecciona el botón "Guardar"
Entonces el sistema muestra un mensaje de error en el campo correspondiente
Y el personal médico se mantiene en el formulario de signos vitales del paciente
```

**Precondiciones:**

- El sistema está disponible y la ruta `/register/:pacientId` es accesible con un ID válido.
- Existe un paciente registrado con el ID especificado.

**Datos de entrada:**

```gherkin
| frecuencia_cardiaca | frecuencia_respiratoria | saturación_O2 | temperatura | presión | nivel_conciencia | nivel_dolor |
| 80      | 16   | 5     | 36.5       | 120/80  | Alerta  | 2 |
| 105     | 23   | 200   | 37.9       | 148/70  | Confuso | 3 |
```

**Pasos de ejecución:**

1. Insertar un paciente en PostgreSQL y obtener su ID.
2. Navegar a `/register/:pacientId` con el ID del paciente.
3. Completar todos los campos con los valores de la tabla, incluyendo el valor inválido de Saturación O2.
4. Hacer clic en el botón "Guardar".

**Resultado esperado:**

- El sistema muestra un mensaje de error en el campo Saturación O2 indicando que el valor está fuera del rango permitido.
- El usuario permanece en la ruta `/register/:pacientId`.
- No se crea ningún registro en la tabla `constantes-vitales`.
- El backend responde con código HTTP `422`.

**Resultado obtenido:** Sin ejecutar  
**Estado:** Sin ejecutar  
**Prioridad:** Alta

## HU-003 - Clasificación automatizada de criticidad de un paciente

### TC-006 - Clasificación automática asigna criticidad "Emergencia" (Nivel 1)

**Escenario Gherkin:**

```gherkin
Dado que el personal médico está en el Dashboard (/dashboard)
Y existe un paciente con signos vitales que corresponden a criticidad "Emergencia" según el Protocolo Manchester
Cuando el sistema procesa sus signos vitales
Entonces el registro del paciente muestra la criticidad "Emergencia" en la tabla del Dashboard
```

**Precondiciones:**

- Existe al menos un paciente registrado en la tabla `pacientes`.
- El paciente tiene un registro en `constantes-vitales` con valores que según la matriz "MANCHESTER_PROTOCOL" corresponden al Nivel 1 (Emergencia).

**Datos de entrada:**

```gherkin
| frecuencia_cardiaca | frecuencia_respiratoria | saturación_O2 | temperatura | presión | nivel_conciencia | nivel_dolor |
| 130      | 28  | 82     | 39.5       | 90/60  | Confuso  | 9 |
```

**Pasos de ejecución:**

1. Insertar un paciente en PostgreSQL.
2. Enviar una solicitud `POST /api/v1/vitals/:patientId` con los datos de la tabla.
3. Navegar a `/dashboard`.
4. Localizar el registro del paciente en la tabla.

**Resultado esperado:**

- El campo `criticidad` del paciente en la tabla `pacientes` es actualizado a 1.
- El Dashboard muestra el texto "Emergencia" en la columna Criticidad del paciente.

**Resultado obtenido:** Sin ejecutar  
**Estado:** Sin ejecutar  
**Prioridad:** Crítica

---

### TC-007 - Clasificación automática asigna criticidad "Muy Urgente" (Nivel 2)

**Escenario Gherkin:**

```gherkin
Dado que el personal médico está en el Dashboard (/dashboard)
Y existe un paciente con signos vitales que corresponden a criticidad "Muy Urgente" según el Protocolo Manchester
Cuando el sistema procesa sus signos vitales
Entonces el registro del paciente muestra la criticidad "Muy Urgente" en la tabla del Dashboard
```

**Precondiciones:**

- Existe al menos un paciente registrado en la tabla `pacientes`.
- El paciente tiene constantes vitales que corresponden al Nivel 2 según la matriz "MANCHESTER_PROTOCOL".

**Datos de entrada:**

```gherkin
| frecuencia_cardiaca | frecuencia_respiratoria | saturación_O2 | temperatura | presión | nivel_conciencia | nivel_dolor |
| 110      | 29  | 91     | 38.8       | 95/65  | Confuso  | 7 |
```

**Pasos de ejecución:**

1. Insertar un paciente en PostgreSQL.
2. Enviar una solicitud `POST /api/v1/vitals/:patientId` con los datos de la tabla.
3. Navegar a `/dashboard`.
4. Localizar el registro del paciente en la tabla.

**Resultado esperado:**

- El campo `criticidad` del paciente en la tabla `pacientes` es actualizado a 2.
- El Dashboard muestra el texto "Muy Urgente" en la columna Criticidad del paciente.

**Resultado obtenido:** Sin ejecutar  
**Estado:** Sin ejecutar  
**Prioridad:** Crítica

---

### TC-008 - Clasificación automática asigna criticidad "Urgente" (Nivel 3)

**Escenario Gherkin:**

```gherkin
Dado que el personal médico está en el Dashboard (/dashboard)
Y existe un paciente con signos vitales que corresponden a criticidad "Urgente" según el Protocolo Manchester
Cuando el sistema procesa sus signos vitales
Entonces el registro del paciente muestra la criticidad "Urgente" en la tabla del Dashboard
```

**Precondiciones:**

- Existe al menos un paciente registrado en la tabla `pacientes`.
- El paciente tiene constantes vitales que corresponden al Nivel 3 según la matriz "MANCHESTER_PROTOCOL" .

**Datos de entrada:**

```gherkin
| frecuencia_cardiaca | frecuencia_respiratoria | saturación_O2 | temperatura | presión | nivel_conciencia | nivel_dolor |
| 95      | 19  | 95     | 38.8       | 110/75  | Alerta  | 5 |
```

**Pasos de ejecución:**

1. Insertar un paciente en PostgreSQL.
2. Enviar una solicitud `POST /api/v1/vitals/:patientId` con los datos de la tabla.
3. Navegar a `/dashboard`.
4. Localizar el registro del paciente en la tabla.

**Resultado esperado:**

- El campo `criticidad` del paciente es actualizado a 3.
- El Dashboard muestra el texto "Urgente" en la columna Criticidad del paciente.

**Resultado obtenido:** Sin ejecutar  
**Estado:** Sin ejecutar  
**Prioridad:** Alta

## HU-005 - Visualización de lista de pacientes ordenados por criticidad

### TC-009 - El Dashboard muestra los pacientes ordenados por criticidad descendente

**Escenario Gherkin:**

```gherkin
Dado que el personal médico está en la pantalla principal (/dashboard)
Y existen 5 pacientes registrados con niveles de criticidad distintos
Cuando el sistema carga el Dashboard
Entonces la tabla de pacientes muestra los registros ordenados por criticidad de mayor a menor
```

**Precondiciones:**

- El sistema está disponible y la ruta `/dashboard` es accesible.
- Existen al menos 5 pacientes con signos vitales registrados, cada uno con un nivel de criticidad asignada.

**Datos de entrada:**

Pacientes

```gherkin
| identificacion | nombres        | apellidos       | fecha_nacimiento | genero    |
| 1002003001     | Luis Andres    | Caceres Estrada | 1999-05-21       | masculino |
| 1002003002     | Andrea Cecilia | Tupiza Espinoza | 1983-01-08       | femenino  |
| 1002003003     | Carlos Esteban | Lozada Pérez    | 1997-02-12       | masculino |
| 1002003004     | Diana Maria    | Alcazar Ortiz   | 1995-10-29       | femenino  |
| 1002003005     | Ariana Isabel  | Mendoza Matiz   | 1996-06-04       | femenino  |
```

Signos Vitales

```gherkin
| frecuencia_cardiaca | frecuencia_respiratoria | saturación_O2 | temperatura | presión | nivel_conciencia | nivel_dolor |
| 31      | 19  | 96     | 36.5       | 112/89  | Confuso  | 5 |
| 72      | 33  | 95     | 36.8       | 125/82  | Alerta   | 3 |
| 77      | 18  | 87     | 36.9       | 124/86  | Confuso  | 5 |
| 82      | 18  | 98     | 32.3       | 126/85  | Alerta   | 3 |
| 85      | 17  | 97     | 37.2       | 118/81  | Alerta   | 3 |
```

**Pasos de ejecución:**

1. Insertar mediante el sistema los 5 pacientes con sus respectivos signos vitales que generen diferentes nivel de criticidad.
2. Navegar a la ruta `/dashboard`.
3. Observar el orden de los registros en la tabla de pacientes.

**Resultado esperado:**

- La tabla muestra los 5 pacientes ordenados de mayor a menor criticidad: Emergencia → Muy Urgente → Urgente → Menos Urgente → No Urgente.
- El endpoint `GET /api/v1/pacients` retorna los pacientes ordenados por criticidad descendente con código HTTP `200`.

**Resultado obtenido:** Sin ejecutar  
**Estado:** Sin ejecutar  
**Prioridad:** Crítica

---

### TC-010 - El Dashboard muestra el mensaje "No hay pacientes en espera" cuando no hay registros

**Escenario Gherkin:**

```gherkin
Dado que el personal médico está en la pantalla principal (/dashboard)
Cuando no existen registros de pacientes en el sistema
Entonces el sistema muestra el texto "No hay pacientes en espera" en pantalla
```

**Precondiciones:**

- El sistema está disponible y la ruta `/dashboard` es accesible.
- La tabla `pacientes` en la base de datos está vacía.

**Datos de entrada:**

No aplica (estado vacío de la base de datos).

**Pasos de ejecución:**

1. Asegurar que la tabla `pacientes` no tenga registros en la base de datos.
2. Navegar a la ruta `/dashboard`.
3. Observar el contenido de la pantalla.

**Resultado esperado:**

- La pantalla muestra el texto "No hay pacientes en espera".
- No se renderiza la tabla de pacientes.
- El endpoint `GET /api/v1/pacients` retorna un array vacío `[]` con código HTTP `200`.

**Resultado obtenido:** Sin ejecutar  
**Estado:** Sin ejecutar  
**Prioridad:** Media

## HU-009 - Notificación visual de nuevo registro de paciente al personal médico disponible

### TC-011 - Notificación visual aparece al registrar un nuevo paciente con signos vitales

**Escenario Gherkin:**

```gherkin
Dado que el médico se encuentra en el Dashboard (/dashboard)
Cuando un nuevo paciente con signos vitales es registrado en el sistema
Entonces el sistema muestra un cuadro de notificación en pantalla con el nombre, apellido y criticidad asignada del paciente
```

**Precondiciones:**

- El sistema está disponible y el médico tiene el Dashboard (`/dashboard`) abierto en el navegador.
- El componente `PatientNotificationToast.tsx` está implementado y activo.

**Datos de entrada:**

Paciente

```gherkin
| identificacion | nombres        | apellidos       | fecha_nacimiento | genero    |
| 1002003001     | Erika María | González Espinoza | 1988-02-28       | femenino  |
```

Signos Vitales

```gherkin
| frecuencia_cardiaca | frecuencia_respiratoria | saturación_O2 | temperatura | presión | nivel_conciencia | nivel_dolor |
| 31      | 19  | 96     | 36.5       | 112/89  | Confuso  | 5 |
```

**Pasos de ejecución:**

1. Registrar un nuevo paciente con los datos de la tabla mediante el formulario del sistema.
2. Registrar los signos vitales del paciente con los valores de la tabla mediante el formulario del sistema.
3. Esperar la redirección al Dashboard y observar la pantalla.

**Resultado esperado:**

- Aparece en pantalla un cuadro de notificación que contiene el nombre del paciente y la criticidad asignada.
- El nuevo paciente aparece en la tabla del Dashboard.

**Resultado obtenido:** Sin ejecutar  
**Estado:** Sin ejecutar  
**Prioridad:** Alta
