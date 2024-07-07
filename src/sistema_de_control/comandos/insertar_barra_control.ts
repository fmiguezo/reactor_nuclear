import Command from "./command";
import Reactor from "../../central_nuclear/reactor/reactor";
import InsertarBarrasError from "../../errores/errores_central_nuclear/errores_del_administrador_de_barras/insertar_barras_error";

export default class InsertarBarraDeControl implements Command {
  public ejecutar(r: Reactor): void {
    try {
      r.getAdministradorBarras().insertarBarras(1);
    } catch (error) {
      if (error instanceof InsertarBarrasError) {
        console.log(error.message);
      } else {
        console.log(error.message);
      }
    }
  }
}
