import { Constantes } from "../../central_nuclear/reactor/constantes_reactor";
export default class ReactorNoEncontradoError extends Error {
  constructor(message: string = Constantes.NO_SE_ENCONTRO_REACTOR) {
    super(message);
    this.name = "ReactorNoEncontradoError";
  }
}
