import { Constantes } from "../../../central_nuclear/reactor/constantes_reactor";

export default class RemplazarBarrasBencidasError extends Error {
  constructor(message: string = Constantes.NO_PUDE_REMPLAZAR_BARRA) {
    super(message);
    this.name = "RemplazarBarrasBencidasError";
  }
}
