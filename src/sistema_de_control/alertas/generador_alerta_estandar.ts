import AlertaEstandar from "./alerta_estandar";
import Alerta from "./alerta";
import IGeneradorDeAlertas from "../interfaces/igenerador_alertas";

export default class GeneradorDeAlertasEstandar implements IGeneradorDeAlertas {
  public static generarAlerta(): Alerta {
    return AlertaEstandar.getInstance();
  }
}
