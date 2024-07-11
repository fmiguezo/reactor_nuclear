import Command from "./command";
import Reactor from "../../central_nuclear/reactor/reactor";
import ApagarErrorEApagado from "../../errores/errores_central_nuclear/errores_de_los_estados_del_reactor/error_estado_apagado/apagar_error";
import ApagarErrorEChernobyl from "../../errores/errores_central_nuclear/errores_de_los_estados_del_reactor/error_estado_apagado/apagar_error";

export default class ApagarReactor implements Command {
  public ejecutar(r: Reactor): void {
    try {
      r.apagar();
    } catch (error) {
      if (error instanceof ApagarErrorEApagado) {
        console.log(error.message);
      } else if (error instanceof ApagarErrorEChernobyl) {
        console.log(error.message);
      } else {
        console.log(error.message);
      }
    }
  }
}
