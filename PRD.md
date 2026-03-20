# HealthTech: Sistema de Triaje de Urgencias

**Última actualización:** 2026/03/16

## Visión

Los proveedores de salud actualmente enfrentan retos críticos en sus procesos de atención, identificados a continuación:

🔴 *Toma de datos y síntomas de pacientes manuales, lo que genera cuellos de botella críticos*

Y

🔴 *Tiempos de respuesta extensos entre el ingreso del paciente y su clasificación de riesgo para su prioridad de atención*

Estos escenarios aumentan la probabilidad de eventos adversos en pacientes de alta prioridad y falta de visibilidad de la carga de trabajo del personal médico.

El sistema HealthTech pretende dar una solución precisa y robusta a estos problemas, mediante la automatización de clasificación de riesgo de pacientes y la reducción del tiempo de notificación, asignación y atención del personal médico.

### El sistema de triage

El sistema triage se orienta a la **clasificación de pacientes en un cuadro de servicios de urgencia**, basado en las necesidades terapéuticas y los recursos disponibles para atender al paciente

| Nivel | Color | Tipo de prioridad|
|--------|-------|--------------|
| Nivel 1 | 🔴 Rojo | Requiere **atención inmediata**, la condición clínica del paciente representa un **riesgo vital** y necesita maniobras de reanimación |
| Nivel 2| 🟠 Naranja | La condición del paciente puede evolucionar a un rápido deterioro o su muerte,  o está en serio riesgo de perder un órgano, **la atención no debe superar los 30 minutos** La presencia de un dolor extremo de acuerdo al sistema de clasificación usado debe ser considerada cómo un criterio de esta categoría |
| Nivel 3| 🟡 Amarillo | La condición clínica del paciente requiere **medidas diagnósticas y terapéuticas de urgencias**. Son el tipo de pacientes que requieren un *examen complementario o un tratamiento rápido*, pero que se encuentran estables desde el punto de vista fisiológico|
| Nivel 4| 🟢 Verde | El paciente presenta condiciones médicas que **no comprometen su estado general, ni representan un riesgo evidente para la vida** o pérdida de algún miembro u órgano. No obstante, el paciente presenta ciertos riesgos de complicación o secuelas de enfermedad si no recibe la atención correspondiente|
| Nivel 5| 🔵 Azul | El paciente presenta una condición clínica relacionada con **problemas agudos o crónicos sin evidencia de deterioro que comprometa su estado general**, o represente un riesgo evidente para su vida a alguna funcionalidad de un órgano|

### Restricciones del triage

- El triage no puede ser empleado cómo mecanismo de negación para la atención de citas
- El triage es realizado en el momento en el que el usuario llega al servicio de urgencias, el proceso de verificación de derechos del usuario se realizará posteriormente
- Los prestadores de servicios de salud deben proporcionar información adecuada a los pacientes y acompañantes de sobre los recursos iniciales a emplear y el tiempo en el que serán atendidos
- Para los triages IV y V, es importante que las entidades prestadoras de servicios de salud en concordancia con la infraestructura de servicios de atención, adelanten estrategias que **garanticen el acceso a los servicios conexos a los sistemas de urgencias, entre ellos, consulta general, especializada y prioritaria, servicios de apoyo diagnóstico, entre otros**

## Objetivos

### Estandarización Clínica

Implementar un algoritmo de clasificación basado en el Protocolo Manchester (MTS) para eliminar la subjetividad en asignación de prioridad de pacientes.
  
### Optimización del Flujo de Ingreso

Agilizar el registro de datos y signos vitales mediante formularios estandarizados, minimizando los tiempos de espera y eliminando cuellos de botella en la fase inicial de atención al cliente.

### Gestión Eficiente de Alertas

Garantizar la notificación de casos de nivel 1 (prioritarios) al personal médico disponible mediante un dashboard, optimizando la asignación y atención de pacientes.

## Alcance

Para la primera versión del sistema HealthTech se ha definido los siguientes puntos:

### Qué SI incluye el proyecto

- Formulario estandarizado para el registro rápido de datos y signos vitales de pacientes.
- Algoritmo de clasificación y prioridad del paciente, basado en los signos vitales registrados.
- Dashboard para la gestión de atención de pacientes registrados y en espera.
- Indicadores visuales en el Dashboard de criticidad por colores de los pacientes en espera.
- Indicadores visuales del tiempo de espera por prioridad de atencion del paciente.
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
