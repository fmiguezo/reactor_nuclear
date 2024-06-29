import AlertaEstandar from "./alerta_estandar";
import IAlerta from "./ialerta";
import IGeneradorDeAlertas from "./igenerador_alertas";

export default class GeneradorDeAlertasEstandar implements IGeneradorDeAlertas {
  public generarAlerta(): IAlerta {
    return new AlertaEstandar();
  }
}
