import AlertaApagado from "../alertas/alerta_apagado";
import IAlerta from "./alerta";
import IGeneradorDeAlertas from "../interfaces/igenerador_alertas";

export default class GeneradorDeAlertaApagado implements IGeneradorDeAlertas {
  public static generarAlerta(): IAlerta {
    return new AlertaApagado();
  }
}
