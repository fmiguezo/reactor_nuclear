import Command from "./command";
import Reactor from "../../central_nuclear/reactor/reactor";

export default class ObtenerInformacionReactor implements Command {
  public ejecutar(r: Reactor): void {
    for (const sensores of r.getSensores()) {
      sensores.toString();
    }
  }
}
