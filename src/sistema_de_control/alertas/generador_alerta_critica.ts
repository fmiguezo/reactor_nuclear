import AlertaCritica from "./alerta_critica";
import IAlerta from "../interfaces/ialerta";
import IGeneradorDeAlertas from "../interfaces/igenerador_alertas";

export default class GeneradorDeAlertasCriticas implements IGeneradorDeAlertas {
  public generarAlerta(): IAlerta {
    return new AlertaCritica();
  }
}
