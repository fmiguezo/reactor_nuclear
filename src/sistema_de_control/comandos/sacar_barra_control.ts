import Reactor from "../../central_nuclear/reactor/reactor";
import Command from "./command";

export default class InsertarBarraDeControl implements Command {
  public ejecutar(r: Reactor): void {
    throw new Error("Metodo no implementado aun");
  }
}
