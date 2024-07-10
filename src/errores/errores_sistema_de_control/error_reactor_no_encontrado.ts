import { Constantes } from "../../../../reactor_nuclear/src/central_nuclear/reactor/constantes";
export default class ReactorNoEncontradoError extends Error {
    constructor(message: string = Constantes.NO_SE_ENCONTRO_REACTOR) {
        super(message);
        this.name = "ReactorNoEncontradoError";
    }
}