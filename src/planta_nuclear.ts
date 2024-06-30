import Reactor from "./central_nuclear/reactor/reactor";
import Sistema from "./sistema_de_control/sistema";
export default class PlantaNuclear {
  private _reactores: Reactor[] = [];
  private _sistema!: Sistema;

  public setSistema(sistema: Sistema) {
    this._sistema = sistema;
  }

  public getReactores(): Reactor[] {
    return this._reactores;
  }

  public getSistema(): Sistema {
    return this._sistema;
  }

  public cargarSistema(sistema: Sistema): void {
    this._sistema = sistema;
  }

  public agregarReactores(reactores: Reactor[]): void {
    this._reactores = this._reactores.concat(reactores);
  }
}
