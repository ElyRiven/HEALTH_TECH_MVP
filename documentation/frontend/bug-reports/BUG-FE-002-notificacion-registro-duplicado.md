# Bug Report — BUG-FE-002

## Identificación del Defecto

| Campo              | Detalle     |
| ------------------ | ----------- |
| **Id del defecto** | BUG-FE-002  |
| **Fecha**          | 2026-04-05  |
| **Autor/a**        | QA Engineer |

---

## Título y Descripción

**Título:** Notificación de registro exitoso se muestra al acceder manualmente a la ruta de registro de un paciente ya existente

**Descripción:** Al acceder directamente a la ruta `/register/{pacientId}` de la aplicación con el identificador de un paciente ya registrado en el sistema (por ejemplo, `http://localhost:5173/register/1002003001`), la aplicación muestra una notificación emergente de éxito con el mensaje _"Paciente con identificación [ID] registrado exitosamente"_. Esta notificación pertenece únicamente al flujo de creación de un nuevo paciente y no debería mostrarse cuando el paciente ya existe y el usuario simplemente navega a la ruta de registro de signos vitales de forma manual.

---

## Pasos para Reproducir el Defecto

1. Levantar el entorno de pruebas ejecutando `docker-compose up` con el archivo `docker-compose.yml` del repositorio.
2. Registrar un paciente en el sistema (por ejemplo, con identificación `1002003001`) a través del flujo normal de la aplicación.
3. Una vez registrado, abrir el navegador Brave y acceder a `http://localhost:5173`.
4. En la barra de direcciones del navegador, ingresar directamente la URL: `http://localhost:5173/register/1002003001`.
5. Presionar **Enter** para navegar a dicha ruta.
6. Observar si aparece alguna notificación en la pantalla.

---

## Resultado Esperado vs. Resultado Actual

|                        | Descripción                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Resultado esperado** | La aplicación carga la pantalla de registro de signos vitales para el paciente con identificación `1002003001` sin mostrar ninguna notificación de registro, dado que el paciente ya existe en el sistema y el usuario no realizó ninguna acción de creación.                                                                                                                                                            |
| **Resultado actual**   | Al cargar la ruta, la aplicación muestra una notificación emergente de tipo éxito en la esquina superior derecha con el mensaje: _"Paciente con identificación 1002003001 registrado exitosamente"_, a pesar de que no se realizó ninguna acción de creación en esta sesión. La notificación es disparada por el estado de navegación almacenado en el historial del navegador, y persiste aunque el acceso sea directo. |

---

## Detalles del Entorno

| Campo                      | Detalle                                     |
| -------------------------- | ------------------------------------------- |
| **Sistema operativo**      | Windows 11                                  |
| **Navegador**              | Brave v1.88.138 (Chromium v146.0.7680.178)  |
| **Imagen Docker frontend** | `elyriven/health-tech-frontend:88d9c29`     |
| **Entorno de ejecución**   | Local — levantado con `docker-compose.yml`  |
| **URL de acceso**          | `http://localhost:5173/register/1002003001` |

---

## Evidencias

| Archivo                                                                                                       | Descripción                                                                                                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`duplicated_patient_registry_notification.png`](../assets/bugs/duplicated_patient_registry_notification.png) | Captura de pantalla mostrando la pantalla de registro de signos vitales con la notificación "¡Éxito! Paciente con identificación 1002003001 registrado exitosamente" visible en la esquina superior derecha, aunque el paciente ya estaba registrado y el acceso fue directo por URL. |

---

## Severidad y Prioridad

| Campo         | Valor | Justificación                                                                                                                                                                                                                                         |
| ------------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Severidad** | Menor | El defecto no interrumpe el flujo funcional del sistema ni provoca pérdida de datos. Se trata de una información engañosa presentada al usuario que puede generar confusión, pero no impide el uso de la aplicación.                                  |
| **Prioridad** | Media | Aunque no es crítico, el mensaje erróneo puede confundir al personal médico haciéndoles creer que registraron un paciente cuando realmente no lo hicieron. Debe corregirse antes de producción para garantizar la integridad informativa del sistema. |
