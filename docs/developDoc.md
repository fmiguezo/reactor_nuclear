<h1 style="text-align:center">
📑 Documentación técnica
</h1>

## INFORMACION GENERAL

El desarrollo consta de dos partes. La primera es un simulador de la planta nuclear. Aquí se encuentran los objetos del mundo físico tales como los reactores y sus componentes. Por otro lado, se entrega un software de control, que interactúa con el simulador y es el que va a hacer de intermediario entre la planta nuclear en sí, y el operador. Este sistema le permite al usuario seleccionar el reactor sobre el que se quiera ejecutar alguna acción, e ingresar comandos. Estos comandos se traducirán en eventos que ocurrirán en la planta nuclear.

---

## SIMULADOR

### Simulador de Planta Nuclear

El simulador representa una planta nuclear, la cual puede contener un número indeterminado de reactores. Cada reactor está compuesto por varios elementos clave, cada uno con una funcionalidad específica que asegura el correcto funcionamiento del reactor y su seguridad. Los componentes y sus funciones son:

---

### ATRIBUTOS DEL REACTOR:

- Barras de control.
- Mecanismos de control
- Sensores.
- Temperatura
- AdministradorBarras
- Planta nuclear
- id

---

### COMPONENTES DEL REACTOR Y FUNCIONALIDAD DEL MISMO:

**Barras de Control**

- **Función:** Son los principales mecanismos de control del reactor. Su función es crucial para evitar que el reactor explote, enfriándolo para mantenerlo en un estado normal. Este estado evita que la temperatura se vuelva crítica, previniendo estados de emergencia o un escenario catastrófico tipo "Chernobyl".

- **Tipos y Atributos:** En la versión actual del software, solo se puede crear un tipo de barra de control (barra de cadmio). Sin embargo, el diseño utiliza el patrón Factory Method, permitiendo la implementación de más tipos de barras en el futuro sin violar principios SOLID. Cada barra tiene un estado inicial (En Desuso), que cambia según si se encuentra insertada en el reactor o si ya expiró (las barras tienen una vida útil limitada).

---

**Mecanismos de Control**

- **Función:** Mantener el estado normal y saludable del reactor. Los mecanismos de control incluyen dispositivos como las turbinas. Están diseñados para ser implementados y ampliados de manera mantenible sin romper los principios de diseño SOLID.

---

**Sensores**

- **Tipos:**
  Actualmente hay dos tipos de sensores implementados:

  - Sensor de Temperatura
  - Sensor de Energía Producida

  Estos sensores pueden ampliarse en el futuro sin afectar el funcionamiento del código actual.

- **Función:** Los sensores recogen información crítica del reactor, proporcionando a los operarios datos sobre la temperatura y la energía generada por el reactor.

---

**Administrador de Barras**

- **Función:** Gestiona las diversas operaciones que se pueden realizar con las barras de control, interactuando directamente con ellas para asegurar su correcta administración y funcionamiento.

---

**Planta Nuclear**

- **Función:** Aunque puede parecer extraño, el reactor contiene una referencia a la planta nuclear a la que pertenece. Esta relación es necesaria porque el reactor debe notificar su estado a la planta nuclear, que a su vez genera una alerta adecuada. Esta alerta es recibida por los operarios, quienes ejecutan los comandos pertinentes según la situación.

---

**ID del Reactor**

- **Función:** Cada reactor tiene un identificador único, un número decimal natural, que permite su identificación dentro de la planta nuclear.

---

### Funcionamiento General del Reactor

El funcionamiento del reactor depende en gran medida de la temperatura generada. Si el reactor está encendido, su temperatura influye directamente en su estado, notificando a la planta nuclear para que esta genere una alerta que es enviada a los operarios. Estos operarios lanzan los comandos necesarios para gestionar la situación. Además, la temperatura generada determina la energía termal producida por el reactor, la cual se utiliza para calcular e informar sobre la energía neta producida a través del sensor de energía producida.

---

## SISTEMA DE CONTROL

Este sistema permite interactuar con el simulador de la planta nuclear. El software internamente está estructurado en los siguientes bloques:

---

**Alertas**

El sistema de control tiene como una de sus principales funciones poder generar alertas ante determinados eventos que ocurran en la Planta Nuclear y notificar a los usuarios que estén suscriptos a ellas. Esta parte del sistema está diseñada con el objetivo de poder suscribir operarios dinámicamente a las alertas que sean pertinentes para ellos.

---

**Interfaz humana**

Dentro de la interfaz humana se encuentran los comandos y todos los métodos que permitan al usuario interactuar con el sistema.

Los tipos de comando disponibles son:

```
- apagar_reactor: apaga el reactor.
- encender_reactor: enciende un reactor apagado.
- insertar_barra_control: inserta una o más barras de control. Si se indica que inserte 0 barras, inserta todas.
- obtener_info_reactor: imprime por pantalla los valores que retornan los sensores.
- reportar_estado: imprime por pantalla en qué estado se encuentra el reactor.
- sacar_barra_control: sube barras de control que estén insertadas en el núcleo. Puede especificarse una cantidad.
- comandos_disponibles: retorna los comandos disponibles.
```

---

**Usuarios**

El sistema admite el registro de varios usuarios. Por el momento hay dos tipos de usuarios:

- Operadores: pueden interactuar con el sistema para operar la planta nuclear. Además, pueden recibir alertas.
- Supervisores: no pueden introducir comandos para realizar acciones en la planta nuclear. Solamente pueden recibir alertas de cierto tipo de eventos.

Pueden agregarse más roles en el futuro.

---

**Registros**

Las clases de tipo Registro permiten almacenar eventos concretos que ocurran en la planta nuclear y en el sistema. Gracias a esto, es posible obtener estadísticas de dichos eventos y cumplir con los requerimientos del cliente. Por el momento solo existen los siguientes registros:

- Registro de barras usadas
- Registro de energía generada
- Registro de cambios de estado del reactor

En el futuro podrían agregarse más registros.

---

**EmergencIA**

El propósito de este módulo es realizar las acciones necesarias para estabilizar la reacción en situaciones de emergencia. Este módulo funciona sin interacción humana.
