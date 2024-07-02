import getFabricaError from "../../../errores/errores_selector_fabrica/get_fabrica_error";
import FabricaBarra from "./fabrica_barra";
import FabricaBarraCadmio from "./fabrica_barra_cadmio";

export default class SelectorFabricaBarra {
  private _mapaFabricas: Map<string, FabricaBarra>;
  private static _instancia: SelectorFabricaBarra | null = null;

  constructor() {
    this._mapaFabricas = new Map<string, FabricaBarra>();
    this._mapaFabricas.set("cadmio", new FabricaBarraCadmio());
  }

  public getFabrica(nombre: string): FabricaBarra {
    const fabricaElegida = this._mapaFabricas.get(nombre);
    if (!fabricaElegida) {
      throw new getFabricaError("No existe la fabrica");
    }
    return fabricaElegida;
  }

  public static getInstancia(): SelectorFabricaBarra {
    if (this._instancia === null) {
      this._instancia = new SelectorFabricaBarra();
    }
    return this._instancia;
  }
}
