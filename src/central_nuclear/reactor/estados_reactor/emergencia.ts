import EstadoReactor from "./estadoreactor";
import RApagado from "./apagado";
import RCritico from "./critico";
import Chernobyl from "./chernobyl";

export default class REmergencia extends EstadoReactor {
  override calcularEnergia(temperatura: number = 0): number {
    return 0;
  }

  override verificaEstado(): void {
    const tempActual = this._reactor.getTemperatura();
    if (tempActual < TEMP_CRITICA) {
      this.pasaAEstadoCritico();
    } else if (tempActual >= TEMP_CHERNOBYL) {
      this.pasaAEstadoChernobyl();
    }
  }

  private pasaAEstadoCritico() {
    let estado: EstadoReactor = new RCritico(this._reactor);
    this._reactor.cambiarEstado(estado);
  }

  private pasaAEstadoChernobyl() {
    let estado: EstadoReactor = new Chernobyl(this._reactor);
    this._reactor.cambiarEstado(estado);
  }

  override encender() {
    throw new Error("Ya estaba encendido");
  }

  override apagar() {
    let estado: EstadoReactor = new RApagado(this._reactor);
    this._reactor.cambiarEstado(estado);
  }

  override estaEncendido() {
    return true;
  }
}
