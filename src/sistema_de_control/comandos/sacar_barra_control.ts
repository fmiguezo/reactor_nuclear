import Reactor from "../../central_nuclear/reactor/reactor";
import Command from "./command";
import SubirBarrasError from "../../errores/errores_central_nuclear/errores_del_administrador_de_barras/subir_barras_error";

export default class SacarBarrasDeControl implements Command {
  public ejecutar(r: Reactor, params?: { [key: string]: any }): void {
    const { param1 } = params || {};
    try {
      r.getAdministradorBarras().subirBarras(param1);
    } catch (error) {
      if (error instanceof SubirBarrasError) {
        console.log(error.message);
      } else {
        console.log(error.message);
      }
    }
  }
}
