import EstadoReactor from "./estadoreactor";
import Reactor from "../reactor";
import { Constantes } from "../constantes";
export default class Chernobyl extends EstadoReactor {
  constructor(r: Reactor) {
    super(r);
    this.eliminarTimeOut(this._timerTemp);
  }

  override calcularEnergia(temperatura: number = 0): number {
    return 0;
  }

  override verificarEstado(): void {
    throw new Error(Constantes.MENSAJE_ESTADO_CHERNOBYL_EXPLOTO);
  }

  override encender() {
    throw new Error(Constantes.MENSAJE_ESTADO_CHERNOBYL_NO_ENCENDIO);
  }

  override apagar() {
    throw new Error(Constantes.MENSAJE_ESTADO_CHERNOBYL_NO_APAGO);
  }

  override estaEncendido() {
    return false;
  }
}
