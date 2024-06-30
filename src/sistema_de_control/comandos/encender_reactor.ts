import Command from "./command";
import Reactor from "../../central_nuclear/reactor/reactor";

export default class EncenderReactor implements Command {
  public ejecutar(r: Reactor): void {
    r.encender();
  }
}
