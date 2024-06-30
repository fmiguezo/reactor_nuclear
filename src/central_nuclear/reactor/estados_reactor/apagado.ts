import EstadoReactor from "./estadoreactor";
import REncendiendo from "./encendiendo";
import Alerta from "../../../sistema_de_control/alertas/alerta";
import GeneradorDeAlertaApagado from "../../../sistema_de_control/alertas/generador_alerta_apagado";
import { Constantes } from "../constantes";
import Reactor from "../reactor";
export default class RApagado extends EstadoReactor {
  constructor(r: Reactor) {
    super(r);
    this.eliminarTimeOut(this._timerTemp);
  }

  override calcularEnergia(temperatura: number = 0): number {
    return 0;
  }

  override verificarEstado(): void {
    const tempActual = this._reactor.getTemperatura();
    if (tempActual > 0) {
      this.encender();
    }
  }

  override encender() {
    let estado: EstadoReactor = new REncendiendo(this._reactor);
    this._reactor.cambiarEstado(estado);
  }

  override apagar() {
    throw new Error(Constantes.MENSAJE_APAGADO);
  }

  override estaEncendido() {
    return false;
  }

  override incrementarTemperatura(): void {}

  override generarAlerta(): Alerta {
    return GeneradorDeAlertaApagado.generarAlerta();
  }

  override toString(): string {
    return Constantes.MENSAJE_ESTADO_APAGADO;
  }
}
