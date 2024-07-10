import { Constantes } from "../../../../central_nuclear/reactor/constantes_reactor";

export default class EncenderError extends Error {
  constructor(message: string = Constantes.MENSAJE_ENCENDER_CRITICO) {
    super(message);
    this.name = "EncenderError";
  }
}
