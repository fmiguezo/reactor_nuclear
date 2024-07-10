import { Constantes } from "../../../central_nuclear/reactor/constantes_reactor";

export default class InsertarBarrasError extends Error {
  constructor(message: string = Constantes.NO_PUEDE_INSERTAR_BARRA) {
    super(message);
    this.name = "InsertarBarrasError";
  }
}
