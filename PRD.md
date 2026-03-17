# HealthTech: Sistema de Triaje de Urgencias

**Última actualización:** 2026/03/16

## Visión

Los proveedores de salud actualmente enfrentan retos críticos en sus procesos de atención, identificados a continuación:

🔴 *Toma de datos y síntomas de pacientes manuales, lo que genera cuellos de botella críticos*

Y

🔴 *Tiempos de respuesta extensos entre el ingreso del paciente y su clasificación de riesgo para su prioridad de atención*

Estos escenarios aumentan la probabilidad de eventos adversos en pacientes de alta prioridad y falta de visibilidad de la carga de trabajo del personal médico.

El sistema HealthTech pretende dar una solución precisa y robusta a estos problemas, mediante la automatización de clasificación de riesgo de pacientes y la reducción del tiempo de notificación, asignación y atención del personal médico.

## Objetivos

### Estandarización Clínica

Implementar un algoritmo de clasificación basado en el Protocolo Manchester (MTS) para eliminar la subjetividad en asignación de prioridad de pacientes.
  
### Optimización del Flujo de Ingreso

Agilizar el registro de datos y signos vitales mediante formularios estandarizados, minimizando los tiempos de espera y eliminando cuellos de botella en la fase inicial de atención al cliente.

### Gestión Eficiente de Alertas

Garantizar la notificación de casos de nivel 1 (prioritarios) al personal médico disponible mediante un dashboard en tiempo real, optimizando la asignación y atención de pacientes.

## Alcance

Para la primera versión del sistema HealthTech se ha definido los siguientes puntos:

### Qué SI incluye el proyecto

- Formulario estandarizado para el registro rápido de datos y signos vitales de pacientes.
- Algoritmo de clasificación y prioridad del paciente, basado en los signos vitales registrados.
- Dashboard en tiempo real para la gestión de atención de pacientes registrados y en espera.
- Indicadores visuales en el Dashboard de criticidad por colores de los pacientes en espera.
- Temporizadores individuales por paciente del tiempo de espera transcurrido.
- Gestión de estados básicos del paciente: En Espera, Siendo Atendido y Finalizado.
- Notificación a los médicos disponibles cuando se genere un nuevo registro de paciente.
- Filtros por criticidad de pacientes en el Dashboard.

### Qué NO incluye el proyecto

- Registro de auditoría con la trazabilidad de los pacientes ingresados.
- Autenticación y roles del sistema (Enfermería, Medico, Especialista, etc).
- Conexión con dispositivos médicos para la toma automatizada de signos vitales.
- Sincronización de datos con el Historial Clínico Electrónico del paciente.
- Emisión de recetas o prescripciones médicas.
- Gestión de facturación o seguro médico.
- Gestión de recursos internos del centro médico (Camas, Medicamentos, etc).

## Riesgos

Para cada riesgo identificado, se ha establecido una escala de evaluación definida como:

- Probabilidad; Baja (1) a Alta (5)
- Impacto: Bajo (1) a Alto (5)
- Criticidad (P x I): Baja (1-8), Media (9-15) y Alta (16-25)

### Riesgos de Negocio

| Riesgo | Probabilidad | Impacto | Criticidad |
|--------|--------------|---------|-------|
| **Resistencia al uso:** El personal no hace uso del sistema debido a que percibe el registro manual más rápido | 4 | 4 | **16 (ALTA)** |
| **Sesgo de Criticidad:** Discrepancia entre el algoritmo del sistema y criterio médico local respecto a la criticidad del paciente | 4 | 4 | **16 (ALTA)** |
| **Fatiga de Alertas:** El sistema registra tantos pacientes urgentes que el personal ignora la prioridad y atiende por orden de llegada | 4 | 4 | **16 (ALTA)** |
| **Ausencia de Re-evaluación:** Incapacidad del sistema para detectar el deterioro clínico de un paciente que está en espera, manteniendo una prioridad obsoleta | 3 | 5 | **15 (MEDIA)** |
| **Dependencia del Sistema:** El personal olvida como hacer el proceso manual, quedando paralizados si se presenta una falla o acceso total al sistema | 2 | 5 | **10 (MEDIA)** |

### Riesgos Técnicos

| Riesgo | Probabilidad | Impacto | Criticidad |
|--------|--------------|---------|-------|
| **Interrupción de Conectividad:** Caída de la red local o internet que inhabilite el acceso al sistema | 3 | 5 | **15 (MEDIA)** |
| **Tecnología Obsoleta:** Incompatibilidad del sistema con equipos hospitalarios antiguos (navegadores desactualizados o hardware limitado) | 4 | 3 | **12 (MEDIA)** |
| **Exposición de Datos Sensibles:** Fuga de información clínica por cifrado insuficiente en base de datos o logs del sistema | 2 | 5 | **10 (MEDIA)** |
| **Colisión de Concurrencia:** Riesgo de que dos médicos acepten al mismo paciente simultaneamente debido a alta concurrencia | 2 | 5 | **10 (MEDIA)** |