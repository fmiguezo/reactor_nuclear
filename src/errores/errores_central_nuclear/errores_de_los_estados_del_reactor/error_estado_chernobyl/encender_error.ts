import { Constantes } from "../../../../central_nuclear/reactor/constantes";

export default class EncenderError extends Error {
  constructor(
    message: string = Constantes.MENSAJE_ESTADO_CHERNOBYL_NO_ENCENDIO
  ) {
    super(message);
    this.name = "EncenderError";
  }
  constructor(
    message: string = Constantes.MENSAJE_ESTADO_CHERNOBYL_NO_ENCENDIO
  ) {
    super(message);
    this.name = "EncenderError";
  }
}
