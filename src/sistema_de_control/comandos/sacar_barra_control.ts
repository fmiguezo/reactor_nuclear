import Reactor from "../../central_nuclear/reactor/reactor";
import Command from "./command";
import AdministradorBarras from "../../central_nuclear/reactor/administrador/administrador_barras";
import BarraControl from "../../central_nuclear/barras_control/barra_control";

export default class SacarBarrasDeControl implements Command {
  public ejecutar(r: Reactor): void {
    r.getAdministradorBarras().subirBarras(1);
  }
}
