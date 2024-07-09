import { Constantes } from "../../../../central_nuclear/barras_control/constantes";

export default class DesactivarError extends Error {
    constructor(message: string = Constantes.MENSAJE_BARRA_DESACTIVADA) {
        super(message);
        this.name = "DesactivarError";
    }
}