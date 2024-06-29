import IAlerta from "../interfaces/ialerta";

export default class AlertaApagado implements IAlerta {
  private _tipoAlerta: TipoAlerta = TipoAlerta.APAGADO;
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
    return MENSAJE_ALERTA_APAGADO;
  }

  public obtenerTimestampDeAlerta(): Date {
    return this.date;
  }

  public toString(): string {
    return `Mensaje: ${this.obtenerMensajeDeAlerta()}
        \nTipo de alerta: ${this.obtenerTipoDeAlerta()}
        \nFecha: ${this.obtenerTimestampDeAlerta()}`;
  }
}
