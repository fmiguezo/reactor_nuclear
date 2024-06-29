import Alerta from "./alerta";

export default class AlertaEstandar extends Alerta {
  public override obtenerMensajeDeAlerta(): string {
    return MENSAJE_ALERTA_ESTANDAR;
  }
}
