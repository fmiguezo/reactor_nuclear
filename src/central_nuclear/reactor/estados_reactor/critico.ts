import EstadoReactor from "./estadoreactor";
import RApagado from "./apagado";
import RNormal from "./normal";
import REmergencia from "./emergencia";
import Alerta from "../../../sistema_de_control/alertas/alerta";
import GeneradorDeAlertasEstandar from "../../../sistema_de_control/alertas/generador_alerta_estandar";

export default class RCritico extends EstadoReactor {
  override calcularEnergia(temperatura: number = 0): number {
    return 0;
  }

  override verificarEstado(): void {
    const tempActual = this._reactor.getTemperatura();
    if (tempActual < TEMP_MAXIMA_NORMAL) {
      this.cambiarAEstadoNormal();
    } else if (tempActual >= TEMP_CRITICA) {
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
    throw new Error("Ya estaba encendido");
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
