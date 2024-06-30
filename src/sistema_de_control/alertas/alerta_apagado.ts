import Alerta from "./alerta";
import { TipoAlerta } from "./tipo_alerta";
import { Constantes } from "../constantes";

export default class AlertaApagado extends Alerta {
  private static instance: AlertaApagado | null = null;

  private constructor(TipoAlerta: TipoAlerta) {
    super(TipoAlerta);
  }

  public static getInstance(): AlertaApagado {
    if (!AlertaApagado.instance) {
      AlertaApagado.instance = new AlertaApagado(TipoAlerta.APAGADO);
    }
    AlertaApagado.instance.setDate(new Date());
    return AlertaApagado.instance;
  }

  public override obtenerMensajeDeAlerta(): string {
    return Constantes.MENSAJE_ALERTA_APAGADO;
  }
}
