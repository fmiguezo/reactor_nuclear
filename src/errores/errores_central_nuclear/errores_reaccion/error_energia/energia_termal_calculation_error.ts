import { Constantes } from "../../../../central_nuclear/reactor/reaccion/constantes_formula_energia";
export default class EnergiaTermalCalculationError extends Error {
    constructor(message: string = Constantes.MENSAJE_TEMP_MIN_INSUFICIENTE) {
        super(message);
        this.name = "EnergiaTermalCalculationError";

    }
}
