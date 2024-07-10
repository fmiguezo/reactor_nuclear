import { Constantes } from "../../../central_nuclear/reactor/constantes";
export default class SubirBarrasError extends Error {
    constructor(message: string = Constantes.NO_PUEDE_SUBIR_BARRA) {
        super(message);
        this.name = "SubirBarrasError";
    }
}
