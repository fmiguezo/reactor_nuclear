import { Constantes } from "../../../../central_nuclear/reactor/constantes_reactor";

export default class EncenderError extends Error {
  constructor(message: string = Constantes.MENSAJE_ESTADO_CRITICO) {
    super(message);
    this.name = "EncenderError";
  }
}
