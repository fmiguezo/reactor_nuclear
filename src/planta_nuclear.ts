import Reactor from "./central_nuclear/reactor/reactor.js";
import Operador from "./Operador.ts";

export default class PlantaNuclear {
  private _reactores: Reactor[] = [];
  private _operadores: Operador[] = [];

  public get operadores(): Operador[] {
    return this._operadores;
  }
  public set operadores(value: Operador[]) {
    this._operadores = value;
  }

  public get reactores(): Reactor[] {
    return this._reactores;
  }
  public set reactores(value: Reactor[]) {
    this._reactores = value;
  }
}
