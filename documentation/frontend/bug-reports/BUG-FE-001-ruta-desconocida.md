# Bug Report — BUG-FE-001

## Identificación del Defecto

| Campo              | Detalle     |
| ------------------ | ----------- |
| **Id del defecto** | BUG-FE-001  |
| **Fecha**          | 2026-04-05  |
| **Autor/a**        | QA Engineer |

---

## Título y Descripción

**Título:** Error inesperado al acceder a una ruta desconocida en la aplicación

**Descripción:** Al ingresar manualmente una ruta que no existe en la aplicación (por ejemplo, `http://localhost:5173/abc123`), el navegador muestra una pantalla de error genérica de React Router con el mensaje _"Unexpected Application Error! — 404 Not Found"_, en lugar de redirigir automáticamente al usuario a la ruta por defecto `/dashboard`. La aplicación no cuenta con manejo de errores de navegación ni una ruta comodín (`*`) que haga la redirección correspondiente.

---

## Pasos para Reproducir el Defecto

1. Levantar el entorno de pruebas ejecutando `docker-compose up` con el archivo `docker-compose.yml` del repositorio.
2. Abrir el navegador Brave y acceder a `http://localhost:5173`.
3. En la barra de direcciones del navegador, modificar la URL manualmente por una ruta inexistente, por ejemplo: `http://localhost:5173/abc123`.
4. Presionar **Enter** para navegar a dicha URL.
5. Observar la pantalla resultante.

---

## Resultado Esperado vs. Resultado Actual

|                        | Descripción                                                                                                                                                                                                                                                                                        |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Resultado esperado** | La aplicación detecta que la ruta `/abc123` no existe en el sistema de rutas registradas y redirige automáticamente al usuario a la ruta por defecto `/dashboard`, sin mostrar ningún mensaje de error.                                                                                            |
| **Resultado actual**   | El navegador muestra una página en blanco con el mensaje de error de React Router: _"Unexpected Application Error! — 404 Not Found"_, junto con un aviso de desarrollo que sugiere agregar un `ErrorBoundary` o un `errorElement` en la configuración de rutas. No se produce ninguna redirección. |

---

## Detalles del Entorno

| Campo                      | Detalle                                    |
| -------------------------- | ------------------------------------------ |
| **Sistema operativo**      | Windows 11                                 |
| **Navegador**              | Brave v1.88.138 (Chromium v146.0.7680.178) |
| **Imagen Docker frontend** | `elyriven/health-tech-frontend:88d9c29`    |
| **Entorno de ejecución**   | Local — levantado con `docker-compose.yml` |
| **URL de acceso**          | `http://localhost:5173`                    |

---

## Evidencias

| Archivo                                                         | Descripción                                                                                                                                                                                                                           |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`unknown_route_bug.png`](../assets/bugs/unknown_route_bug.png) | Captura de pantalla del error mostrado en el navegador al acceder a `http://localhost:5173/abc123`. Se observa el mensaje "Unexpected Application Error! — 404 Not Found" con el consejo de agregar `ErrorBoundary` o `errorElement`. |

---

## Severidad y Prioridad

| Campo         | Valor    | Justificación                                                                                                                                                                                                   |
| ------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Severidad** | Moderada | El defecto no provoca pérdida de datos ni bloquea el flujo principal de la aplicación, pero expone al usuario final una pantalla de error técnica no amigable y sin opción de recuperación autónoma.            |
| **Prioridad** | Alta     | Cualquier usuario que ingrese una URL incorrecta o acceda a un enlace desactualizado queda atrapado en la pantalla de error. Afecta directamente la experiencia de usuario y la robustez percibida del sistema. |
