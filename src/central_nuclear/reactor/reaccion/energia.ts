import EnergiaNetaCalculationError from "../../../errores/errores_energia/energia_neta_calculation_error";
import EnergiaTermalCalculationError from "../../../errores/errores_energia/energia_termal_calculation_error";
import { Constantes } from "./constantes_formula_energia";
export default class Energia {
  public static calcularEnergiaTermal(temp: number): number {
    if (temp < Constantes.MIN_TEMPERATURA)
      {
        throw new EnergiaTermalCalculationError(Constantes.MENSAJE_TEMP_MIN_INSUFICIENTE);
      }
    let calculo = Constantes.M_TERMAL * temp + Constantes.B_TERMAL;
    return Number(calculo.toFixed(2));
  }


  public static calcularEnergiaNeta(energiaTermal: number): number {
    if (energiaTermal < Constantes.PRODUCCCION_MINIMA_ENERGIA_TERMAL) {
      throw new EnergiaNetaCalculationError(Constantes.MENSAJE_TEMP_MIN_INSUFICIENTE);
    }
    else if (energiaTermal == Constantes.PRODUCCCION_MINIMA_ENERGIA_TERMAL) {
      return 100;
    }
    else {
      let calculo = Constantes.M_NETA * energiaTermal + Constantes.B_NETA;
      return Number(calculo.toFixed(2));
    }

  }
}
