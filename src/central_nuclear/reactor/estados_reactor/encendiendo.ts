import EstadoReactor from "./estadoreactor";
import RApagado from "./apagado";
import RNormal from "./normal";

export default class REncenciendo extends EstadoReactor {
  override calcularEnergia(temperatura: number = 0): number {
    return 0;
  }

  override verificarEstado(): void {
    const tempActual = this._reactor.getTemperatura();
    if (tempActual >= TEMP_MINIMA_NORMAL && tempActual < TEMP_MAXIMA_NORMAL) {
      this.cambiarAEstadoNormal();
    }
  }

  private cambiarAEstadoNormal() {
    let estado: EstadoReactor = new RNormal(this._reactor);
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
    return false;
  }
}
