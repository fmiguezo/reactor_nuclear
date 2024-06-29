import EstadoReactor from "./estadoreactor";
import RApagado from "./apagado";
import RCritico from "./critico";
import Chernobyl from "./chernobyl";
import AlertaCritica from "../../../sistema_de_control/alertas/alerta_critica";
import IAlerta from "../../../sistema_de_control/alertas/alerta";
import IGeneradorDeAlertas from "../../../sistema_de_control/interfaces/igenerador_alertas";
import GeneradorDeAlertaCritica from "../../../sistema_de_control/alertas/generador_alerta_critica";

export default class REmergencia extends EstadoReactor {
  override calcularEnergia(temperatura: number = 0): number {
    return 0;
  }

  override verificarEstado(): void {
    const tempActual = this._reactor.getTemperatura();
    if (tempActual < TEMP_CRITICA) {
      this.cambiarAEstadoCritico();
    } else if (tempActual >= TEMP_CHERNOBYL) {
      this.cambiarAEstadoChernobyl();
    }
  }

  private cambiarAEstadoCritico() {
    let estado: EstadoReactor = new RCritico(this._reactor);
    this._reactor.cambiarEstado(estado);
  }

  private cambiarAEstadoChernobyl() {
    let estado: EstadoReactor = new Chernobyl(this._reactor);
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

  override generarAlerta(): IAlerta {
    return GeneradorDeAlertaCritica.generarAlerta();
  }
}
