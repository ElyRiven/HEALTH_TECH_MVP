# Health Tech — Sistema de Triage

Aplicación web full-stack para gestión y priorización de pacientes en salas de triage médico. Permite registrar pacientes, capturar sus signos vitales y calcular automáticamente el nivel de criticidad según el Protocolo de Manchester, mostrando la lista de pacientes ordenados por prioridad de atención.

---

## Documentación del Proyecto

| Documento                                                            | Descripción                                                 |
| -------------------------------------------------------------------- | ----------------------------------------------------------- |
| [PRD.md](PRD.md)                                                     | Contexto de negocio y requerimientos del producto           |
| [USER_STORIES.md](USER_STORIES.md)                                   | Historias de usuario y criterios de aceptación              |
| [SUBTASKS.md](SUBTASKS.md)                                           | Desglose de tareas por rol (DEV y QA)                       |
| [MANCHESTER_PROTOCOL.md](MANCHESTER_PROTOCOL.md)                     | Especificación del protocolo de clasificación de criticidad |
| [TEST_PLAN.md](TEST_PLAN.md)                                         | Plan de pruebas del proyecto                                |
| [Tablero Ágil](https://github.com/users/ElyRiven/projects/3/views/1) | Tablero público del proyecto                                |

---

## Stack Tecnológico

### Backend

| Tecnología             | Versión | Rol                                           |
| ---------------------- | ------- | --------------------------------------------- |
| **Node.js**            | v18+    | Entorno de ejecución del servidor             |
| **Express.js**         | ^4.x    | Framework HTTP REST API                       |
| **PostgreSQL**         | 15      | Base de datos relacional                      |
| **pg (node-postgres)** | ^8.x    | Driver de conexión a PostgreSQL               |
| **Jest**               | ^29.x   | Framework de pruebas unitarias e integración  |
| **Babel**              | ^7.x    | Transpiler para soporte de ES Modules en Jest |
| **ESLint**             | ^9.x    | Linter de código                              |

### Frontend

| Tecnología           | Versión | Rol                                          |
| -------------------- | ------- | -------------------------------------------- |
| **React**            | ^19.x   | Biblioteca de interfaz de usuario            |
| **TypeScript**       | ^5.x    | Tipado estático                              |
| **Vite**             | ^6.x    | Bundler y servidor de desarrollo             |
| **React Router DOM** | ^7.x    | Enrutamiento del lado del cliente            |
| **Tailwind CSS**     | ^4.x    | Framework de estilos utilitarios             |
| **Vitest**           | ^3.x    | Framework de pruebas unitarias para frontend |
| **Nginx**            | latest  | Servidor web para producción (imagen Docker) |

### Infraestructura

| Tecnología         | Rol                                             |
| ------------------ | ----------------------------------------------- |
| **Docker**         | Contenedorización de servicios                  |
| **Docker Compose** | Orquestación del entorno local                  |
| **Docker Hub**     | Registro de imágenes (`elyriven/health-tech-*`) |

---

## Estructura del Repositorio

```
HEALTH_TECH_MVP/
├── docker-compose.yml              # Orquestación del entorno completo
├── db/
│   └── init.sql                    # Script de inicialización de la BD PostgreSQL
│
├── HEALTH_TECH_BACKEND/            # API REST (Node.js + Express)
│   ├── Dockerfile
│   ├── package.json
│   ├── src/
│   │   ├── index.js                # Punto de entrada de la aplicación
│   │   ├── config.js               # Configuración de variables de entorno
│   │   ├── db.js                   # Pool de conexión a PostgreSQL
│   │   ├── controllers/            # Lógica de negocio de los endpoints
│   │   ├── routes/                 # Definición de rutas HTTP
│   │   └── helpers/                # Helpers (cálculo de criticidad, validaciones)
│   └── tests/
│       ├── unit/                   # Pruebas unitarias (Jest)
│       └── integration/            # Pruebas de integración (Jest + supertest)
│
├── HEALTH_TECH_FRONTEND/           # SPA React + TypeScript
│   ├── Dockerfile
│   ├── nginx.conf                  # Configuración de Nginx para producción
│   ├── package.json
│   └── src/
│       ├── App.tsx                 # Componente raíz y configuración de rutas
│       ├── pages/                  # Vistas principales (Dashboard, Register, RegisterVitals)
│       ├── components/             # Componentes reutilizables de UI
│       ├── hooks/                  # Custom hooks de React
│       ├── config/                 # Configuración de la URL base de la API
│       └── lib/                    # Utilidades (cn helper, etc.)
│
└── documentation/
    ├── backend/
    │   ├── assets/
    │   │   ├── bugs/               # Capturas de los bugs reportados en backend
    │   │   └── tests/              # Evidencias visuales de pruebas manuales de API
    │   ├── bug-reports/            # Reportes de bugs del backend (.md)
    │   ├── k6-performance-reports/ # Reportes HTML de pruebas de carga (k6)
    │   ├── manual_testing_reports/ # Informe de pruebas manuales de la API
    │   ├── performance_reports/    # Reportes de rendimiento analizados (.md)
    │   └── backend-coverage-report/# Reporte de cobertura de pruebas (Jest/LCOV)
    └── frontend/
        ├── assets/bugs/            # Capturas de los bugs reportados en frontend
        ├── bug-reports/            # Reportes de bugs del frontend (.md)
        ├── frontend-coverage-report/ # Reporte de cobertura (Vitest/LCOV)
        └── serenity-e2e-report/    # Reporte de pruebas E2E (Serenity BDD)
```

---

## API REST — Endpoints

Base URL: `http://localhost:3000/api/v1`

| Método  | Endpoint               | Descripción                                        |
| ------- | ---------------------- | -------------------------------------------------- |
| `POST`  | `/pacients`            | Registrar un nuevo paciente                        |
| `GET`   | `/pacients`            | Listar pacientes con signos vitales registrados    |
| `GET`   | `/pacients/:pacientId` | Consultar un paciente por número de identificación |
| `PATCH` | `/pacients/:pacientId` | Actualizar el estado de atención de un paciente    |
| `POST`  | `/vitals/:patientId`   | Registrar signos vitales de un paciente            |

---

## Levantar el Entorno con Docker Compose

### Requisitos Previos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado y en ejecución.
- Puertos `3000` (backend), `5173` (frontend) y `5433` (PostgreSQL) disponibles en el sistema local.

### Variables de Entorno

Crear un archivo `.env` en la raíz del repositorio (junto al `docker-compose.yml`) con el siguiente contenido:

```env
# Base de datos
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=health_tech
DB_HOST=db
DB_PORT=5432

# Backend
STAGE=development
CORS_ORIGIN=http://localhost:5173

# Frontend
VITE_API_PROTOCOL=http
VITE_API_HOST=localhost
VITE_API_PORT=3000
```

### Pasos para Levantar el Entorno

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/ElyRiven/HEALTH_TECH_MVP.git
   cd HEALTH_TECH_MVP
   ```

2. **Crear el archivo `.env`** con el contenido descrito anteriormente.

3. **Levantar todos los servicios:**

   ```bash
   docker-compose up
   ```

   Este comando descarga las imágenes de Docker Hub e inicia los tres servicios:
   - `db` — PostgreSQL en el puerto `5433`
   - `backend` — API REST en el puerto `3000`
   - `frontend` — Aplicación React servida por Nginx en el puerto `5173`

4. **Acceder a la aplicación:**

   | Servicio    | URL                                                |
   | ----------- | -------------------------------------------------- |
   | Frontend    | http://localhost:5173                              |
   | API Backend | http://localhost:3000/api/v1                       |
   | PostgreSQL  | `localhost:5433` (usuario/contraseña según `.env`) |

5. **Detener el entorno:**

   ```bash
   docker-compose down
   ```

   Para eliminar también los volúmenes de datos (reset completo de BD):

   ```bash
   docker-compose down -v
   ```

---

## Notas

- Las imágenes publicadas en Docker Hub corresponden al commit `88d9c29`. Para construir imágenes locales desde el código fuente, descomentar las secciones `build` en `docker-compose.yml` y comentar las líneas `image:`.
- La base de datos se inicializa automáticamente mediante `db/init.sql` al levantar el contenedor por primera vez.
- El backend espera que la base de datos esté disponible antes de iniciar (healthcheck configurado en `docker-compose.yml`).
