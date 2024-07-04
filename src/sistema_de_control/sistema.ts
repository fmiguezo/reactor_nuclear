import * as readline from "readline";
import PlantaNuclear from "../planta_nuclear";
import Reactor from "../central_nuclear/reactor/reactor";
import { Constantes } from "./constantes";
import RegistroComandosDisponibles from "./registros/registro_comandos_disponibles";

export default class Sistema {
  private _plantaNuclear: PlantaNuclear;

  constructor(plantaNuclear: PlantaNuclear) {
    this._plantaNuclear = plantaNuclear;
  }

  public cargarPlanta(planta: PlantaNuclear): void {
    this._plantaNuclear = planta;
  }

  public cargarReactores(reactores:Reactor[]): void
  {
    this._plantaNuclear.agregarReactores(reactores);
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
      rl.question(Constantes.MENSAJE_QUESTION_INPUT, (input) => {
        if (input === Constantes.MENSAJE_EXIT) {
          console.log(Constantes.MENSAJE_USUARIO_DESLOGUEADO);
          rl.close();
        } else {
          console.log( Constantes.MENSAJE_COMANDO_RECIBIDO + {input});
          RegistroComandosDisponibles.instancia.obtenerCommands().get(input)?.ejecutar();
          promptUser();
        }
      });
    };

    promptUser();
  }
}
