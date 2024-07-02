import EstadoReactor from "./estadoreactor";
import RApagado from "./apagado";
import RCritico from "./critico";
import Chernobyl from "./chernobyl";
import Alerta from "../../../sistema_de_control/alertas/alerta";
import GeneradorDeAlertaCritica from "../../../sistema_de_control/alertas/generador_alerta_critica";
import { Constantes } from "../constantes";
import RegistroEstados from "../../../sistema_de_control/registros/registroEstados";
import EncenderError from "../../../errores/errores_de_los_estados/error_estado_emergencia/error_encender";
export default class REmergencia extends EstadoReactor {
  override calcularEnergia(temperatura: number = 0): number {
    return 0;
  }

  override verificarEstado(): void {
    const tempActual = this._reactor.getTemperatura();
    if (tempActual < Constantes.TEMP_CRITICA) {
      this.cambiarAEstadoCritico();
    } else if (tempActual >= Constantes.TEMP_CHERNOBYL) {
      this.cambiarAEstadoChernobyl();
    }
  }

  private cambiarAEstadoCritico() {
    let estado: EstadoReactor = new RCritico(this._reactor);
    this._reactor.cambiarEstado(estado);
    RegistroEstados.instancia.aumentarRegistro(estado);
  }

  private cambiarAEstadoChernobyl() {
    let estado: EstadoReactor = new Chernobyl(this._reactor);
    this._reactor.cambiarEstado(estado);
  }

  override encender() {
    throw new EncenderError(Constantes.MENSAJE_ENCENDIDO);
  }

  override apagar() {
    let estado: EstadoReactor = new RApagado(this._reactor);
    this._reactor.cambiarEstado(estado);
  }

  override estaEncendido() {
    return true;
  }

  override generarAlerta(): Alerta {
    return GeneradorDeAlertaCritica.generarAlerta();
  }

  override toString(): string {
    return Constantes.MENSAJE_ESTADO_EMERGENCIA;
  }
}
