import PlantaNuclear from "../planta_nuclear";
import Reactor from "../central_nuclear/reactor/reactor";
import Cli from "./cli/cli";
import { Constantes } from "./alertas/constantes";
import EmergencIA from "./emergencIA/modEmergencIA";

export default class Sistema {
  private _plantaNuclear: PlantaNuclear;

  constructor(plantaNuclear: PlantaNuclear) {
    this._plantaNuclear = plantaNuclear;
  }

  public cargarPlanta(planta: PlantaNuclear): void {
    this._plantaNuclear = planta;
  }

  public obtenerPlanta(): PlantaNuclear {
    return this._plantaNuclear;
  }

  public actualizar(r: Reactor): void {
    let alerta = r.getEstado().generarAlerta();
    if (alerta != null) {
      alerta.notificar();

      if (alerta.toString() === Constantes.MENSAJE_ALERTA_CRITICA) {
        const moduloEmergencia = EmergencIA.instancia;
        moduloEmergencia.AZ5(r);
      }
    }
  }

  public actualizarTodo(): void {
    this._plantaNuclear.getReactores().forEach((r) => {
      this.actualizar(r);
    });
  }

  public init(): void {
    const cli: Cli = new Cli();
    cli.nuevaSesion(this);
  }
}
