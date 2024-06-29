import IEstadoReactor from "./estadoreactor";
import REncendiendo from "./encendiendo";

export default class RApagado extends IEstadoReactor {
  override calcularEnergia(temperatura: number = 0): number {
    return 0;
  }

  override verificaEstado(): void {
    const tempActual = this.contexto.getTemperatura();
    if (tempActual > 0) {
      this.encender();
    }
  }

  override encender() {
    let estado: IEstadoReactor = new REncendiendo(this.contexto);
    this.contexto.cambiarEstado(estado);
  }

  override apagar() {
    throw new Error("Ya estaba apagado");
  }

  override estaEncendido() {
    return false;
  }

  override incrementarTemperatura(): void {}
}
