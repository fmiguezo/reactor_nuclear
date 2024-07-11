<p align="center">
  <a href="" rel="noopener">
 <img src="../img/homero_leyendo.jpg" alt="Project logo"></a>
</p>
<h3 align="center">Sistema de control para reactores</h3>

<div align="center">

![License: GPL v2](https://img.shields.io/badge/License-GPL_v2-blue.svg)

</div>

---

<p align="center"> Irradia seguridad
    <br> 
</p>

## 📝 Lista de contenidos

- [Planteo del problema](#problem_statement)
- [Solución](#solution)
- [Preparar el sistema](getting_started)
  - [Requisitos previos](prerequisites)
  - [Pasos de instalación](set_up)
- [Uso](#usage)
- [Modificaciones futuras](#future_scope)

## 🧐 Planteo del problema <a name = "problem_statement"></a>

La energía nuclear es una de las formas más limpias de generar energía. Sin embargo, requiere una serie de mecanismos que garanticen la seguridad durante su generación. El planteo detallado del problema se encuentra en el documento <a href="./docs/enunciado.md">enunciado</a>.

## 💡 Solución <a name = "solution"></a>

El sistema que desarrollamos tiene como objectivo simplificar el trabajo de los operadores y agregar protecciones automáticas. La información técnica sobre su funcionamiento interno se encuentra disponible en el <a href="./docs/developDoc.md">documento de desarrollo</a>.

## 🏁 Preparar el sistema <a name = "getting_started"></a>

### Requisitos previos <a name = "prerequisites"></a>

Para poder utilizar el sistema, es necesario disponer de Node.JS. El proyecto se desarrolló en la versión 20.13.1. Asimismo, es importante tener acceso al administrador de paquetes NPM para poder realizar la instalación.

### Pasos de instalación <a name = "set_up"></a>

Clonar el repositorio de GitHub

```
git clone https://github.com/fmiguezo/reactor_nuclear.git
```

Instalar las dependencias

```
npm install
```

Construir el paquete

```
npm run build
```

Iniciar el sistema

```
npm run start
```

## 🎈 Uso <a name="usage"></a>

Al iniciar el sistema se abrirá un intérprete de comandos, que le permitirá al operador realizar las acciones deseadas. Asimismo, mediante algún mecanismo, recibirá las notificaciones para las que su usuario haya sido suscripto.

## 🚀 Modificaciones futuras <a name = "future_scope"></a>

En las próximas versiones se mejorarán las funciones existentes, y se agregarán nuevas:

- Interfaz gráfica
- Mejoras en el funcionamiento del intérprete de comandos
- Base de datos SQL para registrar usuarios y eventos
