import IEstadoReactor from "../../interfaces/iestadoreactor";
import RApagado from "./apagado";
import RNormal from "./normal";
import REmergencia from "./emergencia";

export default class RCritico extends IEstadoReactor {
  override calcularEnergia(temperatura: number = 0): number {
    return 0;
  }

  override verificaEstado(): void {
    const tempActual = this.contexto.getTemperatura();
    if (tempActual < 330) {
      this.pasaAEstadoNormal();
    } else if (tempActual >= 400) {
      this.pasaAEstadoEmergencia();
    }
  }

  private pasaAEstadoNormal() {
    let estado: IEstadoReactor = new RNormal();
    this.contexto.cambiarEstado(estado);
  }

  private pasaAEstadoEmergencia() {
    let estado: IEstadoReactor = new REmergencia();
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
