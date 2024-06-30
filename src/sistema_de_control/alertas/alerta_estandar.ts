import Alerta from "./alerta";
import { Constantes } from "../constantes";
import { TipoAlerta } from "./tipo_alerta";
export default class AlertaEstandar extends Alerta {
  private static instance: AlertaEstandar | null = null;

  private constructor(TipoAlerta: TipoAlerta) {
    super(TipoAlerta);
  }

  public static getInstance(): AlertaEstandar {
    if (!AlertaEstandar.instance) {
      AlertaEstandar.instance = new AlertaEstandar(TipoAlerta.ESTANDAR);
    }
    AlertaEstandar.instance.setDate(new Date());
    return AlertaEstandar.instance;
  }

  public override obtenerMensajeDeAlerta(): string {
    return Constantes.MENSAJE_ALERTA_ESTANDAR;
  }
}
