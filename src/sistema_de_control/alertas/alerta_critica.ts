import Alerta from "./alerta";
export default class AlertaCritica extends Alerta {
  private static instance: AlertaCritica | null = null;

  private constructor(TipoAlerta: TipoAlerta) {
    super(TipoAlerta);
  }

  public static getInstance(): AlertaCritica {
    if (!AlertaCritica.instance) {
      AlertaCritica.instance = new AlertaCritica(TipoAlerta.CRITICA);
    }
    AlertaCritica.instance.setDate(new Date());
    return AlertaCritica.instance;
  }

  public override obtenerMensajeDeAlerta(): string {
    return MENSAJE_ALERTA_CRITICA;
  }
}
