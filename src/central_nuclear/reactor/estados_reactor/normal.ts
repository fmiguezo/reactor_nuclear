import EstadoReactor from "./estadoreactor";
import RApagado from "./apagado";
import RCritico from "./critico";
import { Constantes } from "../constantes";
export default class RNormal extends EstadoReactor {
  override calcularEnergia(temperatura: number = 0): number {
    return 0;
  }

  override verificarEstado(): void {
    const tempActual = this._reactor.getTemperatura();
    if (tempActual < Constantes.TEMP_MINIMA_NORMAL) {
      this.apagar();
    } else if (tempActual >= Constantes.TEMP_MAXIMA_NORMAL) {
      this.cambiarAEstadoCritico();
    }
  }

  private cambiarAEstadoCritico() {
    let estado: EstadoReactor = new RCritico(this._reactor);
    this._reactor.cambiarEstado(estado);
  }

  override encender() {
    throw new Error(Constantes.MENSAJE_ENCENDIDO);
  }

  override apagar() {
    let estado: EstadoReactor = new RApagado(this._reactor);
    this._reactor.cambiarEstado(estado);
  }

  override estaEncendido() {
    return true;
  }

  override toString(): string {
    return Constantes.MENSAJE_ESTADO_NORMAL;
  }
}
