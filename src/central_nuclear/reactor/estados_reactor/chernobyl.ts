import EstadoReactor from "./estadoreactor";
import Reactor from "../reactor";
import { Constantes } from "../constantes_reactor";
import VerificarEstadoError from "../../../errores/errores_central_nuclear/errores_de_los_estados_del_reactor/error_estado_chernobyl/verificar_estado_error";
import EncenderError from "../../../errores/errores_central_nuclear/errores_de_los_estados_del_reactor/error_estado_chernobyl/encender_error";
import ApagarError from "../../../errores/errores_central_nuclear/errores_de_los_estados_del_reactor/error_estado_chernobyl/apagar_error";

export default class Chernobyl extends EstadoReactor {
  constructor(r: Reactor) {
    super(r);
  }

  override obtenerEnergiaNeta(): number {
    throw new Error(Constantes.MENSAJE_ESTADO_CHERNOBYL_EXPLOTO);
  }

  override verificarEstado(): void {
    throw new VerificarEstadoError(Constantes.MENSAJE_ESTADO_CHERNOBYL_EXPLOTO);
  }

  override encender() {
    throw new EncenderError(Constantes.MENSAJE_ESTADO_CHERNOBYL_NO_ENCENDIO);
  }

  override apagar() {
    throw new ApagarError(Constantes.MENSAJE_ESTADO_CHERNOBYL_NO_APAGO);
  }

  override estaEncendido() {
    return false;
  }

  override toString(): string {
    return Constantes.MENSAJE_ESTADO_CHERNOBYL_EXPLOTO;
  }
}
