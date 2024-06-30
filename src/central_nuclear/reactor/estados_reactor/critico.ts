import EstadoReactor from "./estadoreactor";
import RApagado from "./apagado";
import RNormal from "./normal";
import REmergencia from "./emergencia";
import Alerta from "../../../sistema_de_control/alertas/alerta";
import GeneradorDeAlertasEstandar from "../../../sistema_de_control/alertas/generador_alerta_estandar";
import { Constantes } from "../constantes";
export default class RCritico extends EstadoReactor {
  override calcularEnergia(temperatura: number = 0): number {
    return 0;
  }

  override verificarEstado(): void {
    const tempActual = this._reactor.getTemperatura();
    if (tempActual < Constantes.TEMP_MAXIMA_NORMAL) {
      this.cambiarAEstadoNormal();
    } else if (tempActual >= Constantes.TEMP_CRITICA) {
      this.cambiarAEstadoEmergencia();
    }
  }

  private cambiarAEstadoNormal() {
    let estado: EstadoReactor = new RNormal(this._reactor);
    this._reactor.cambiarEstado(estado);
  }

  private cambiarAEstadoEmergencia() {
    let estado: EstadoReactor = new REmergencia(this._reactor);
    this._reactor.cambiarEstado(estado);
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

  override generarAlerta(): Alerta {
    return GeneradorDeAlertasEstandar.generarAlerta();
  }
}
