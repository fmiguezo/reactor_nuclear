# Documentación técnica

## Información general

El desarrollo consiste en dos partes. La primera, es un simulador de la planta nuclear. Aquí se encuentran los objetos del mundo físico tales como los reactores y sus componentes. Por otro lado, se entrega un software de control, que interactúa con el simulador. El sistema de control tomará datos y permitirá ejecutar comandos que se traducirán en eventos que ocurren en la planta nuclear.

## Simulador

El simulador representa una planta nuclear. Esta planta puede contener n número de reactores. Cada reactor posee:

- Barras de control.
- Sistema de refrigeración (que puede ser nulo).
- Sensores.

## Sistema de control

Este sistema permite interactuar con el simulador del reactor. El software internamente está estructurado en los siguientes bloques:

- Data Processing: agrupa las clases donde se leen los datos provenientes del reactor.
- Safety auto actions: contiene las clases donde se ejecutan las acciones automáticas para mantener la seguridad de la planta.
- Human interface: agrupa las clases que tienen la responsabilidad de interactuar con el operario.
  - Alert handling: todo lo relacionado a crear y mostrar alertas.
  - Command handling: todo lo relacionado con recibir e interpretar comandos.
- Actions: implementación de las acciones que deben producirse en la planta.
  - Control rods: clases relacionadas con administrar las barras de control de los reactores.

## PENDIENTE

- Evaluar posibles simplificaciones.
- Determinar comandos a implementar y su estructura.
- Planificar circuito de flujo de información desde el reactor hasta el sistema de control.
- Codificar
