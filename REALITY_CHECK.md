# Análisis Retrospectivo: HealthTech MVP

## ¿Qué tareas subestimamos y por qué?

Las tareas que se identificaron en el equipo como subestimadas fueron:

- El esfuerzo formativo por parte del DEV para la utilización de PostgreSQL ya que no hacía parte de su Stack.
- El esfuerzo formativo por parte de la QA para desarrollo de pruebas E2E con SerenityBDD ya que no hacía parte de su Stack.
- La implementación de la HU-001 y HU-002 por parte del DEV debido a su complejidad técnica y en términos de peso de las HUs y del desarrollo del MVP.
- La lógica de validación de datos en el Backend, ya que se debía seguir el Protocolo Manchester y sus reglas de criticidad estrictas y en términos de verificación de los datos individuales aceptados por el sistema.

## ¿El MVP constuido es realmente valioso para el negocio a pesar de no haber terminado todo el backlog?

Si, ya que el MVP en su estado actual cubre un escenario End-to-End que va desde el registro del paciente, pasando por la verificación de sus datos, el registro de sus signos vitales, hasta el proceso de clasificación de acuerdo al Protocolo Manchester.  
Este flujo de negocio real permite a los usuarios del sistema administrar la información médica centralizada de pacientes y su asignación correspondiente para una mejor atención y un proceso optimizado de gestión de urgencias.

## ¿Cómo garantizó el QA la calidad del MVP entregado en un tiempo tan corto?

El rol de QA garantizó la calidad del MVP mediante una estrategia de análisis y diseño del proyecto:

- Análisis del contexto y alcance inicial del proyecto.
- Análisis y definición clara de criterios de aceptación.
- Rigor en la estimación de las historias de usuario de acuerdo a los principios INVEST.
- Priorización de funcionalidades críticas del MVP.
- Testing colaborativo y contínuo entre DEV y QA.
- Definición de tareas de testing para DEV y QA.
- Análisis y selección de herramientas de testing apropiadas para el proyecto.
- Definición de los micro-sprints a ejecutar.
- Documentación y comunicación efectiva.