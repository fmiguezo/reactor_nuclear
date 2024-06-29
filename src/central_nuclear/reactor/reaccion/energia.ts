import { Constantes } from "./constantes_formula_energia";
export default class Energia {
  public static calcularEnergiaTermal(temp: number): number {
    return Constantes.M_TERMAL * temp + Constantes.B_TERMAL;
  }

  public static calcularEnergiaNeta(energiaTermal: number): number {
    if (energiaTermal == Constantes.PRODUCCCION_MINIMA_ENERGIA_TERMAL) {
      return 100;
    } else {
      return Constantes.M_NETA * energiaTermal + Constantes.B_NETA;
    }
  }
}
