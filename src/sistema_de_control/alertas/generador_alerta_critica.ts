import AlertaCritica from "./alerta_critica";
import Alerta from "./alerta";
import IGeneradorDeAlertas from "../interfaces/igenerador_alertas";

export default class GeneradorDeAlertaCritica implements IGeneradorDeAlertas {
  public static generarAlerta(): Alerta {
    return AlertaCritica.getInstance();
  }
}
