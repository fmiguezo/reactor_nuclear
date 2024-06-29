import ISuscriptor from "../interfaces/empleado";

export default abstract class Alerta {
  protected _tipoAlerta: TipoAlerta;
  protected _date: Date = new Date();
  protected _suscriptores: ISuscriptor[] = [];

  public constructor(tipoAlerta: TipoAlerta) {
    this._tipoAlerta = tipoAlerta;
  }

  public abstract obtenerMensajeDeAlerta(): string;

  public getTipoAlerta(): TipoAlerta {
    return this._tipoAlerta;
  }

  public setTipoAlerta(value: TipoAlerta) {
    this._tipoAlerta = value;
  }

  public getDate(): Date {
    return this._date;
  }

  public setDate(value: Date) {
    this._date = value;
  }

  public toString(): string {
    return `Mensaje: ${this.obtenerMensajeDeAlerta()}
        \nTipo de alerta: ${this.getTipoAlerta()}
        \nFecha: ${this.getDate()}`;
  }

  public agregarSuscriptor(suscriptor: ISuscriptor): void {
    this._suscriptores.push(suscriptor);
  }

  public removerSuscriptor(suscriptor: ISuscriptor): void {
    this._suscriptores = this._suscriptores.filter((s) => s !== suscriptor);
  }

  public notificar(): void {
    this._suscriptores.forEach((s) => s.notificar(this));
  }
}
