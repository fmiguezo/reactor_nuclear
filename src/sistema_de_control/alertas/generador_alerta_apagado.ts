import AlertaApagado from "../alertas/alerta_apagado";
import IAlerta from "../interfaces/ialerta";
import IGeneradorDeAlertas from "../interfaces/igenerador_alertas";

export default class GeneradorDeAlertaApagado implements IGeneradorDeAlertas {
  public generarAlerta(): IAlerta {
    return new AlertaApagado();
  }
}
