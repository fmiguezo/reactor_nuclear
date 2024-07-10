import * as readline from "readline";
import { Constantes } from "./constantes";
import RegistroComandosDisponibles from "../comandos/registro_comandos_disponibles";
import ReactorNoEncontradoError from "../../errores/errores_sistema_de_control/error_reactor_no_encontrado";
import Sistema from "../sistema";

export default class Cli {
  public nuevaSesion(sistema: Sistema): void {
    const rlInterface = this.creaInterfazRL();
    this.lanzarCli(sistema, rlInterface);
  }

  public creaInterfazRL(): readline.Interface {
    const rl: readline.Interface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    return rl;
  }

  private promptUser(
    _sistema: Sistema,
    _rlInterface: readline.Interface
  ): void {
    const sistema: Sistema = _sistema;
    const rlInterface = _rlInterface;

    rlInterface.question(Constantes.MENSAJE_ID_REACTOR, (input1) => {
      rlInterface.question(Constantes.MENSAJE_COMMAND_ELEGIDO, (input) => {
        if (input.toLowerCase() === Constantes.MENSAJE_EXIT) {
          rlInterface.write(Constantes.MENSAJE_USUARIO_DESLOGUEADO);
          rlInterface.close();
        } else {
          console.log(Constantes.MENSAJE_COMANDO_RECIBIDO + { input });

          const reactor = sistema
            .obtenerPlanta()
            .getReactores()
            .get(parseInt(input1, 10));

          if (reactor) {
            RegistroComandosDisponibles.instancia
              .obtenerCommands()
              .get(input)
              ?.ejecutar(reactor);
          } else {
            throw new ReactorNoEncontradoError();
          }
          this.promptUser(sistema, rlInterface);
        }
      });
    });
  }

  private lanzarCli(_sistema: Sistema, _rlInterface: readline.Interface): void {
    const { styleText } = require("node:util");
    const sistema: Sistema = _sistema;

    const rlInterface = _rlInterface;

    const msgBienvenida: string = styleText(
      "green",
      Constantes.MENSAJE_BIENVENIDA
    );

    rlInterface.write(msgBienvenida);
    this.promptUser(sistema, rlInterface);
  }
}
