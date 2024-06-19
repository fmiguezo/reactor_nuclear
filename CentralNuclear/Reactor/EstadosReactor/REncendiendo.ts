import IEstadoReactor from "../IEstadoReactor";
import Reactor from "../Reactor";
import RApagado from "./RApagado";
import RNormal from "./RNormal";

export default class REncenciendo extends IEstadoReactor {
  override calcularEnergia(temperatura: number = 0): number {
    return 0;
  }

  override verificaEstado(): void {
    const tempActual = this.contexto.getTemperatura();
    if (tempActual >= 280) {
      this.pasaAEstadoNormal();
    }
  }

  private pasaAEstadoNormal() {
    let estado: IEstadoReactor = new RNormal();
    this.contexto.cambiarEstado(estado);
  }

  override encender() {
    throw new Error("Ya estaba encendido");
  }

  override apagar() {
    let estado: IEstadoReactor = new RApagado();
    this.contexto.cambiarEstado(estado);
  }

  override estaEncendido() {
    return false;
  }
}
