import EstadoReactor from "./estadoreactor";
import Reactor from "../reactor";
export default class Chernobyl extends EstadoReactor {
  constructor(r: Reactor) {
    super(r);
    this.eliminarTimeOut(this._timerTemp);
  }

  override calcularEnergia(temperatura: number = 0): number {
    return 0;
  }

  override verificarEstado(): void {
    throw new Error("El reactor explotó");
  }

  override encender() {
    throw new Error("No se puede encender: el reactor explotó");
  }

  override apagar() {
    throw new Error("No se puede apagar: el reactor explotó");
  }

  override estaEncendido() {
    return false;
  }
}
