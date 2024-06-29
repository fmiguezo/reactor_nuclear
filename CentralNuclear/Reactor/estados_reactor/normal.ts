import IEstadoReactor from "./estadoreactor";
import RApagado from "./apagado";
import RCritico from "./critico";

export default class RNormal extends IEstadoReactor {
  override calcularEnergia(temperatura: number = 0): number {
    return 0;
  }

  override verificaEstado(): void {
    const tempActual = this.contexto.getTemperatura();
    if (tempActual < 280) {
      this.apagar();
    } else if (tempActual >= 330) {
      this.pasaAEstadoCritico();
    }
  }

  private pasaAEstadoCritico() {
    let estado: IEstadoReactor = new RCritico();
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
