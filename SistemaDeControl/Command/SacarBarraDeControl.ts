import Reactor from "../../src/central_nuclear/reactor/reactor";

export default class InsertarBarraDeControl implements Command {
  public ejecutar(r: Reactor): void {
    throw new Error ("Metodo no implementado aun")
  }
}
