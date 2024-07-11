import { Constantes } from "../../../../central_nuclear/reactor/constantes_reactor";

export default class ApagarError extends Error {
  constructor(message: string = Constantes.MENSAJE_ESTADO_CHERNOBYL_NO_APAGO) {
    super(message);
    this.name = "ApagarError";
  }
}
