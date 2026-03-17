# Fase 4: Tasking y estimación Técnica (el puest hacia la ejecución)

**1. Perpectiva DEV**

Desglosar cada historia de usuario en tareas técnicas (Ej. Crear Tabla en BD,Exponer Endpoints POST,Configurar DTO's, Implementar validación de seguridad) para estimar el esfuerzo total de la historia

## HU-005 — Visualización de lista de pacientes ordenados por criticidad

**Story Points:** 3 SP

**Descripción:**

> Como **Personal Médico**,
> Quiero **poder visualizar los pacientes registrados ordenados por criticidad**,
> Para **identificar los pacientes que requieren atención prioritaria**

**Sub-tareas: DEV**

- Crear una base de datos de pacientes que llegan a una institución médica para ser atendidos por urgencias con los siguientes datos: nombres y apellidos, criticidad, tiempo de espera, de la siguiente forma

| Nombres y apellidos | Criticidad | Tiempo de espera | Estado |
|--------|--------------|---------|-------|
|Juan David Franco | 🟡 Amarillo | 23 minutos | En espera |

### Backend

- Crear endpoint POST para agregar paciente de acuerdo a nivel de urgencia
- Crear endpont GET para obtener lista de paciente ingresados al sistema
- Crear endpoint PUT para actualizar **El estado de atención del paciente (En espera, siendo atendido, finalizado)**
- Crear endpoint DELETE, este método debe hacer un soft-delete siempre y cuando estén dentro de los niveles III y IV del Protocolo de Manchester

### Frontend

- Crear un componente de tabla en el que se enlisten todos los usuarios que ingresan al sistema
- Renderizar la base de datos en la tabla, asignando los datos en filas y columna **IMPORTANTE: Los pacientes deben ser organizados de acuerdo a su clasificación dentro del Protocolo de Manchester**