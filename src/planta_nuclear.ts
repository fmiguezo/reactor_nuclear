import Reactor from "./central_nuclear/reactor/reactor";
import Sistema from "./sistema_de_control/sistema";
export default class PlantaNuclear {
  private _reactores: Reactor[] = [];
  private _sistema!: Sistema;

  public set sistema(sistema: Sistema) {
    this._sistema = sistema;
  }

  public get reactores(): Reactor[] {
    return this._reactores;
  }

  public get sistema(): Sistema {
    return this._sistema;
  }

  public cargarSistema(sistema: Sistema): void {
    this._sistema = sistema;
  }

  public agregarReactores(reactores: Reactor[]): void {
    this._reactores = this._reactores.concat(reactores);
  }
}
