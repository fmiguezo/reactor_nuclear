import Alerta from "./alerta";
import ISuscriptor from "../interfaces/isuscriptor";

export default class AlertaApagado extends Alerta {
  public override obtenerMensajeDeAlerta(): string {
    return MENSAJE_ALERTA_APAGADO;
  }
}
