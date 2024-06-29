import IAlerta from "../interfaces/ialerta";
import Usuario from "../usuarios/usuario";

export default class NotificadorDeAlerta {
  private _suscriptores!: Usuario[];

  public suscribir(nuevoSub: Usuario): void {
    this._suscriptores.push(nuevoSub);
  }

  public desuscribir(suscriptor: Usuario): void {
    this._suscriptores = this._suscriptores.filter((s) => {
      s !== suscriptor;
    });
  }

  public notificarAlerta(alerta: IAlerta): void {
    this._suscriptores.forEach((s) => {
      s.notificar(alerta);
    });

    // return `Mensaje: ${alerta.obtenerMensajeDeAlerta()}
    //     \nTipo de alerta: ${alerta.obtenerTipoDeAlerta()}
    //     \nFecha: ${alerta.obtenerTimestampDeAlerta()}`;
  }
}
