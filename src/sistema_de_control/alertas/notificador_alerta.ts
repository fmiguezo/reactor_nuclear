import IAlerta from "../interfaces/ialerta";
import ISuscriptor from "../interfaces/isuscriptor";

export default class NotificadorDeAlerta {
  private _operarios!: ISuscriptor[];
  private _supervisor!: ISuscriptor[];

  public suscribirOperario(o: ISuscriptor): void {
    this._operarios.push(o);
  }

  public desuscribirOperario(o: ISuscriptor): void {
    this._operarios = this._operarios.filter((operario) => operario !== o);
  }

  public suscribirSupervisor(s: ISuscriptor): void {
    this._supervisor.push(s);
  }

  public desuscribirSupervisor(s: ISuscriptor): void {
    this._supervisor = this._supervisor.filter((supervisor) => supervisor !== s);
  }

  public notificarOperarios(alerta: IAlerta): void {
    this._operarios.forEach((o) => o.notificar(alerta));

    // return `Mensaje: ${alerta.obtenerMensajeDeAlerta()}
    //     \nTipo de alerta: ${alerta.obtenerTipoDeAlerta()}
    //     \nFecha: ${alerta.obtenerTimestampDeAlerta()}`;
  }
}
