import { Constantes } from "../../../../central_nuclear/reactor/constantes_reactor";
export default class ApagarError extends Error {
  constructor(message: string = Constantes.MENSAJE_APAGADO) {
    super(message);
    this.name = "apagarError";
  }
}
