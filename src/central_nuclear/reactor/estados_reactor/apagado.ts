import EstadoReactor from "./estadoreactor";
import REncendiendo from "./encendiendo";

export default class RApagado extends EstadoReactor {
  override calcularEnergia(temperatura: number = 0): number {
    return 0;
  }

  override verificaEstado(): void {
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
    throw new Error("Ya estaba apagado");
  }

  override estaEncendido() {
    return false;
  }

  override incrementarTemperatura(): void {}
}
