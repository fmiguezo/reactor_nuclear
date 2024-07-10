import Reactor from "./central_nuclear/reactor/reactor";
import Sistema from "./sistema_de_control/sistema";
export default class PlantaNuclear {
  private _reactores: Map<number, Reactor> = new Map();
  private _sistema: Sistema = new Sistema(this);

  public getReactores(): Map<number, Reactor> {
    return this._reactores;
  }

  public getSistema(): Sistema {
    return this._sistema;
  }

  public cargarSistema(sistema: Sistema): void {
    this._sistema = sistema;
  }

  public agregarReactores(reactor: Reactor): void {
    this._reactores.set(reactor.id, reactor);
  }
}
