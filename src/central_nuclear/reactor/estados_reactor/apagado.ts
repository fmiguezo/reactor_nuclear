import EstadoReactor from "./estadoreactor";
import REncendiendo from "./encendiendo";
import Alerta from "../../../sistema_de_control/alertas/alerta";
import GeneradorDeAlertaApagado from "../../../sistema_de_control/alertas/generador_alerta_apagado";
import { Constantes } from "../constantes_reactor";
import Reactor from "../reactor";
import ApagarError from "../../../errores/errores_central_nuclear/errores_de_los_estados_del_reactor/error_estado_apagado/apagar_error";

export default class RApagado extends EstadoReactor {
  constructor(r: Reactor) {
    super(r);
    this._reactor.desactivarMecanismosDeControl();
  }

  override obtenerEnergiaNeta(): number {
    return 0;
  }

  override verificarEstado(): void {}

  override encender() {
    let estado: EstadoReactor = new REncendiendo(this._reactor);
    this._reactor.cambiarEstado(estado);
  }

  override apagar() {
    throw new ApagarError(Constantes.MENSAJE_APAGADO);
  }

  override estaEncendido() {
    return false;
  }

  override generarAlerta(): Alerta {
    return GeneradorDeAlertaApagado.generarAlerta();
  }

  override toString(): string {
    return Constantes.MENSAJE_ESTADO_APAGADO;
  }

  override puedeInsertarBarras(): boolean {
    return false;
  }
}
