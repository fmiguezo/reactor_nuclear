import Reactor from "../central_nuclear/reactor/reactor";
import IAlerta from "./alertas/alerta";
import ISuscriptor from "./interfaces/isuscriptor";

export default class Sistema {
  private _reactor: Reactor;
  private _operarios: ISuscriptor[] = [];
  private _supervisor: ISuscriptor[] = [];

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
  }

  public notificarSupervisores(alerta: IAlerta): void {
    this._supervisor.forEach((s) => s.notificar(alerta));
  }

  constructor(reactor: Reactor) {
    this._reactor = reactor;
  }

  public actualizar(): void {
    let alerta = this._reactor.getEstado().generarAlerta();
    if (alerta != null) {
      this.notificarOperarios(alerta);
    }
  }
}
