import { Constantes } from "../../../../central_nuclear/reactor/constantes";
export default class ApagarError extends Error {
    constructor(message: string = Constantes.MENSAJE_APAGADO) {
        super(message);
        this.name = "apagarError";
    }
}
