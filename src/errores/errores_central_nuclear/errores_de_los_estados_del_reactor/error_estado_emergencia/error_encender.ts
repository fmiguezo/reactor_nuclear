import { Constantes } from "../../../../central_nuclear/reactor/constantes";

export default class EncenderError extends Error {
  constructor(message: string = Constantes.MENSAJE_ENCENDIDO) {
    super(message);
    this.name = "EncenderError";
  }
}
