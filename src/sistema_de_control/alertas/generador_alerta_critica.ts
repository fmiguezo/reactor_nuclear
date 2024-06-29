import AlertaCritica from "./alerta_critica";
import IAlerta from "./alerta";
import IGeneradorDeAlertas from "../interfaces/igenerador_alertas";

export default class GeneradorDeAlertaCritica implements IGeneradorDeAlertas {
  public static generarAlerta(): IAlerta {
    return new AlertaCritica();
  }
}
