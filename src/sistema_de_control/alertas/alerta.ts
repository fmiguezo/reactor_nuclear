import ISuscriptor from "../interfaces/isuscriptor";

export default abstract class Alerta {
  protected _tipoAlerta: TipoAlerta;
  protected _date: Date = new Date();
  protected _suscriptores: ISuscriptor[] = [];

  constructor(tipoAlerta: TipoAlerta) {
    this._tipoAlerta = tipoAlerta;
  }

  public abstract obtenerMensajeDeAlerta(): string;

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

  public toString(): string {
    return `Mensaje: ${this.obtenerMensajeDeAlerta()}
        \nTipo de alerta: ${this.tipoAlerta}
        \nFecha: ${this.date}`;
  }

  public agregarSuscriptor(suscriptor: ISuscriptor): void {
    this._suscriptores.push(suscriptor);
  }

  public removerSuscriptor(suscriptor: ISuscriptor): void {
    this._suscriptores = this._suscriptores.filter((s) => s !== suscriptor);
  }

  public notificarSuscriptores(): void {
    this._suscriptores.forEach((s) => s.notificar(this));
  }
}
