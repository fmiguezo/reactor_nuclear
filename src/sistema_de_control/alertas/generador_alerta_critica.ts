import AlertaCritica from "./alerta_critica";
import IAlerta from "./ialerta";
import IGeneradorDeAlertas from "./igenerador_alertas";

export default class GeneradorDeAlertasCriticas implements IGeneradorDeAlertas {
  public generarAlerta(): IAlerta {
    return new AlertaCritica();
  }
}
