import IAlerta from "../interfaces/ialerta";

export default class AlertaCritica implements IAlerta {
  private _tipoAlerta: TipoAlerta = TipoAlerta.CRITICA;
  private _date: Date = new Date();

  public get tipoAlerta(): TipoAlerta {
    return this._tipoAlerta;
  }

  public set tipoAlerta(value: TipoAlerta) {
    this._tipoAlerta = value;
  }

  public get date(): Date {
    return this._date;
  }

  public set date(value: Date) {
    this._date = value;
  }

  public obtenerTipoDeAlerta() {
    return this.tipoAlerta;
  }

  public obtenerMensajeDeAlerta(): string {
    return "ALERTA CRITICA, EL REACTOR SE APAGARA";
  }

  public obtenerTimestampDeAlerta(): Date {
    return this.date;
  }
}
