import AlertaApagado from "../alertas/alerta_apagado";
import Alerta from "./alerta";
import IGeneradorDeAlertas from "../interfaces/igenerador_alertas";

export default class GeneradorDeAlertaApagado implements IGeneradorDeAlertas {
  public static generarAlerta(): Alerta {
    return AlertaApagado.getInstance();
  }
}
