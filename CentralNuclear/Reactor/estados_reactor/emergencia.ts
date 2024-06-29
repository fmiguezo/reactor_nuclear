import IEstadoReactor from "./estadoreactor";
import RApagado from "./apagado";
import RCritico from "./critico";
import Chernobyl from "./chernobyl";

export default class REmergencia extends IEstadoReactor {
  override calcularEnergia(temperatura: number = 0): number {
    return 0;
  }

  override verificaEstado(): void {
    const tempActual = this.contexto.getTemperatura();
    if (tempActual < 400) {
      this.pasaAEstadoCritico();
    } else if (tempActual >= 500) {
      this.pasaAEstadoChernobyl();
    }
  }

  private pasaAEstadoCritico() {
    let estado: IEstadoReactor = new RCritico();
    this.contexto.cambiarEstado(estado);
  }

  private pasaAEstadoChernobyl() {
    let estado: IEstadoReactor = new Chernobyl();
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
    return true;
  }
}
