import EstadoReactor from "./estadoreactor";
import RApagado from "./apagado";
import RNormal from "./normal";
import { Constantes } from "../constantes";
import RegistroEstados from "../../../sistema_de_control/registros/registroEstados";
export default class REncenciendo extends EstadoReactor {
  override calcularEnergia(temperatura: number = 0): number {
    return 0;
  }

  override verificarEstado(): void {
    const tempActual = this._reactor.getTemperatura();
    if (tempActual >= Constantes.TEMP_MINIMA_NORMAL && tempActual < Constantes.TEMP_MAXIMA_NORMAL) {
      this.cambiarAEstadoNormal();
    }
  }

  private cambiarAEstadoNormal() {
    let estado: EstadoReactor = new RNormal(this._reactor);
    this._reactor.cambiarEstado(estado);
    RegistroEstados.instancia.aumentarRegistro(estado);
  }

  override encender() {
    throw new Error(Constantes.MENSAJE_ENCENDIDO);
  }

  override apagar() {
    let estado: EstadoReactor = new RApagado(this._reactor);
    this._reactor.cambiarEstado(estado);
  }

  override estaEncendido() {
    return true;
  }

  override toString(): string {
    return Constantes.MENSAJE_ESTADO_ENCENDIENDO;
  }
}
