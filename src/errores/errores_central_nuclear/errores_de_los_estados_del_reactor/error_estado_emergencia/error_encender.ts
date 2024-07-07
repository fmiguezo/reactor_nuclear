import { Constantes } from "../../../../central_nuclear/reactor/constantes";

export default class EncenderError extends Error {
  constructor(message: string = Constantes.MENSAJE_ESTADO_EMERGENCIA) {
    super(message);
    this.name = "EncenderError";
  }
}
