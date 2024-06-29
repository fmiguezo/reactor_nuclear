import AlertaEstandar from "./alerta_estandar";
import IAlerta from "../interfaces/ialerta";
import IGeneradorDeAlertas from "../interfaces/igenerador_alertas";

export default class GeneradorDeAlertasEstandar implements IGeneradorDeAlertas {
  public generarAlerta(): IAlerta {
    return new AlertaEstandar();
  }
}
