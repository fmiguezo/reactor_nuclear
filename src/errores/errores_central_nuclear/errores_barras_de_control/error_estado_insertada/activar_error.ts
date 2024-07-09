import { Constantes } from "../../../../central_nuclear/barras_control/constantes";

export default class ActivarError extends Error {
    constructor(message: string = Constantes.MENSAJE_BARRA_INSERTADA) {
        super(message);
        this.name = "ActivarError";
    }
}