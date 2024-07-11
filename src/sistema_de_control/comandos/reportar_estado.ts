import Command from "./command";
import Reactor from "../../central_nuclear/reactor/reactor";

export default class ReportarEstado implements Command {
  public ejecutar(r: Reactor): void {
    console.log(`${r.getEstado().toString()}`);
  }
}
