import * as readline from "readline";
import PlantaNuclear from "../planta_nuclear";
import Reactor from "../central_nuclear/reactor/reactor";

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
    if (alerta) {
      alerta.notificar();
    }
  }

  public actualizarTodo(): void {
    this._plantaNuclear.getReactores().forEach((r) => {
      this.actualizar(r);
    });
  }

  public init(): void {
    console.log("Bienvenido al Sistema de Control de Plantas Nucleares\n");

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const promptUser = (): void => {
      rl.question('Ingrese un comando (o "exit" para salir): ', (input) => {
        if (input === "exit") {
          console.log("Usuario deslogueado");
          rl.close();
        } else {
          console.log(`Comando recibido: ${input}`);
          // FUNCIONALIDAD
          promptUser();
        }
      });
    };

    promptUser();
  }
}
