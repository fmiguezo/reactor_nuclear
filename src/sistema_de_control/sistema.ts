import * as readline from "readline";
import PlantaNuclear from "../planta_nuclear";
import Reactor from "../central_nuclear/reactor/reactor";
import { Constantes } from "./constantes";
import RegistroComandosDisponibles from "./registros/registro_comandos_disponibles";
import ReactorNoEncontradoError from "../errores/errores_sistema_de_control/error_reactor_no_encontrado";

export default class Sistema {
  private _plantaNuclear: PlantaNuclear;

  constructor(plantaNuclear: PlantaNuclear) {
    this._plantaNuclear = plantaNuclear;
  }

  public cargarPlanta(planta: PlantaNuclear): void {
    this._plantaNuclear = planta;
  }

  public actualizar(r: Reactor): void {
    let alerta = r.getEstado().generarAlerta();
    if (alerta != null) {
      alerta.notificar();
    }
  }

  public actualizarTodo(): void {
    this._plantaNuclear.getReactores().forEach((r) => {
      this.actualizar(r);
    });
  }

  public init(): void {
    console.log(Constantes.MENSAJE_BIENVENIDA);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const promptUser = (): void => {
      rl.question(Constantes.MENSAJE_ID_REACTOR, (input1) => {
        rl.question(Constantes.MENSAJE_COMMAND_ELEGIDO, (input) => {
          if (input === Constantes.MENSAJE_EXIT) {
            console.log(Constantes.MENSAJE_USUARIO_DESLOGUEADO);
            rl.close();
          } else {
            console.log(Constantes.MENSAJE_COMANDO_RECIBIDO + { input });

            const reactor = this._plantaNuclear.getReactores().get(parseInt(input1, 10));

            if (reactor) {
              RegistroComandosDisponibles.instancia.obtenerCommands().get(input)?.ejecutar(reactor);
            } else {
              throw new ReactorNoEncontradoError;
            }
            promptUser();
          }
        });
      });
    };
    promptUser();
  }
}
