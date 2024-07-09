import { Constantes } from "../../../central_nuclear/barras_control/constantes";
export default class getFabricaError extends Error {
    constructor(message: string = Constantes.MENSAJE_FABRICA_NO_ENCONTRADA) {
        super(message);
        this.name = "getFabricaError";
    }
}
