import Alerta from "./alerta";

export default class AlertaApagado extends Alerta {
  private static instance: AlertaApagado | null = null;

  private constructor(TipoAlerta: TipoAlerta) {
    super(TipoAlerta);
  }

  public getInstance(): AlertaApagado {
    if (!AlertaApagado.instance) {
      AlertaApagado.instance = new AlertaApagado(TipoAlerta.APAGADO);
    }
    AlertaApagado.instance.setDate(new Date());
    return AlertaApagado.instance;
  }

  public override obtenerMensajeDeAlerta(): string {
    return MENSAJE_ALERTA_APAGADO;
  }
}
