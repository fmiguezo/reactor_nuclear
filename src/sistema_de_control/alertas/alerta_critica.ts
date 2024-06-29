import Alerta from "./alerta";
import ISuscriptor from "../interfaces/isuscriptor";

export default class AlertaCritica extends Alerta {
  public override obtenerMensajeDeAlerta(): string {
    return MENSAJE_ALERTA_CRITICA;
  }
}
