# Documentación técnica

##  INFORMACION GENERAL
El desarrollo consiste en dos partes. La primera, es un simulador de la planta nuclear. Aquí se encuentran los objetos del mundo físico tales como los reactores y sus componentes. Por otro lado, se entrega un software de control, que interactúa con el simulador y es el cual va a interactuar entre la interface y el operador, permitiendole al mismo lanzar los distintos comandos, para cada reactor elegido. El sistema de control tomará datos y permitirá ejecutar estos comandos que se traducirán en eventos que ocurren en la planta nuclear.
------------------------------------------------------------------------------------------------------------
## SIMULADOR
Simulador de Planta Nuclear
El simulador representa una planta nuclear, la cual puede contener un número indeterminado de reactores. Cada reactor está compuesto por varios elementos clave, cada uno con una funcionalidad específica que asegura el correcto funcionamiento del reactor y su seguridad. Los componentes y sus funciones son:
------------------------------------------------------------------------------------------------------------
ATRIBUTOS DEL REACTOR:
------------------------------------------------------------------------------------------------------------
Barras de control.
Mecanismos de control
Sensores.
Temperatura
AdministradorBarras
Planta nuclear
id
------------------------------------------------------------------------------------------------------------
COMPONENTES DEL REACTOR Y FUNCIONALIDAD DEL MISMO:
------------------------------------------------------------------------------------------------------------
Barras de Control

Función: Son los principales mecanismos de control del reactor. Su función es crucial para evitar que el reactor explote, enfriándolo para mantenerlo en un estado normal. Este estado evita que la temperatura se vuelva crítica, previniendo estados de emergencia o un escenario catastrófico tipo "Chernobyl".
Tipos y Atributos: En la versión actual del software, solo se puede crear un tipo de barra de control. Sin embargo, el diseño utiliza el patrón Factory Method, permitiendo la implementación de más tipos de barras en el futuro sin violar principios SOLID. Cada barra tiene un estado inicial de desuso, que cambia según si se inserta en el reactor o si su vida útil es suficiente para su uso.
------------------------------------------------------------------------------------------------------------
Mecanismos de Control

Función: Esenciales para mantener el estado normal y saludable del reactor, los mecanismos de control incluyen dispositivos como las turbinas. Están diseñados para ser implementados y ampliados de manera mantenible sin romper los principios de diseño SOLID.
------------------------------------------------------------------------------------------------------------
Sensores

Tipos: Actualmente, hay dos tipos de sensores: Sensor de Temperatura y Sensor de Energía Producida. Estos sensores pueden ampliarse en el futuro sin afectar el funcionamiento del código actual.
Función: Los sensores recogen información crítica del reactor, proporcionando a los operarios datos sobre la temperatura y la energía generada por el reactor.
------------------------------------------------------------------------------------------------------------
Administrador de Barras

Función: Gestiona las diversas operaciones que se pueden realizar con las barras de control, interactuando directamente con ellas para asegurar su correcta administración y funcionamiento.
------------------------------------------------------------------------------------------------------------
Planta Nuclear

Función: Aunque puede parecer extraño, el reactor contiene una referencia a la planta nuclear a la que pertenece. Esta relación es necesaria porque el reactor debe notificar su estado a la planta nuclear, que a su vez genera una alerta adecuada. Esta alerta es recibida por los operarios, quienes ejecutan los comandos pertinentes según la situación.
------------------------------------------------------------------------------------------------------------
ID del Reactor

Función: Cada reactor tiene un identificador único, un número decimal natural, que permite su identificación dentro de la planta nuclear.
Funcionamiento General del Reactor
El funcionamiento del reactor depende en gran medida de la temperatura generada. Si el reactor está encendido, su temperatura influye directamente en su estado, notificando a la planta nuclear para que esta genere una alerta que es enviada a los operarios. Estos operarios lanzan los comandos necesarios para gestionar la situación. Además, la temperatura generada determina la energía termal producida por el reactor, la cual se utiliza para calcular e informar sobre la energía neta producida a través del sensor de energía producida.
------------------------------------------------------------------------------------------------------------
## SISTEMA DE CONTROL 
Este sistema permite interactuar con el simulador del reactor. El software internamente está estructurado en los siguientes bloques:

- Data Processing: agrupa las clases donde se leen los datos provenientes del reactor.
- Safety auto actions: contiene las clases donde se ejecutan las acciones automáticas para mantener la seguridad de la planta.
- Human interface: agrupa las clases que tienen la responsabilidad de interactuar con el operario.
  - Alert handling: todo lo relacionado a crear y mostrar alertas.
  - Command handling: todo lo relacionado con recibir e interpretar comandos.
- Actions: implementación de las acciones que deben producirse en la planta.
  - Control rods: clases relacionadas con administrar las barras de control de los reactores.
