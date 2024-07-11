import { Constantes } from "../../../../central_nuclear/sensores/constantes";

export default class ActualizarError extends Error {
    constructor(message: string = Constantes.MENSAJE_SENSOR_INACTIVO) {
        super(message);
        this.name = "ActualizarError";
    }
}