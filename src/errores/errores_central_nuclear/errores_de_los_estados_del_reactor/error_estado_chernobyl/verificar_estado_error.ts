import { Constantes } from "../../../../central_nuclear/reactor/constantes";

export default class VerificarEstadoError extends Error {
    constructor(message: string = Constantes.MENSAJE_ESTADO_CHERNOBYL_EXPLOTO) {
        super(message);
        this.name = "VerificarEstadoError";
    }
}
