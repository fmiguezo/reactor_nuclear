import Command from "./command";
import Reactor from "../../central_nuclear/reactor/reactor";
import EncenderErrorEChernobyl from "../../errores/errores_central_nuclear/errores_de_los_estados_del_reactor/error_estado_chernobyl/encender_error";
import EncenderErrorENormal from "../../errores/errores_central_nuclear/errores_de_los_estados_del_reactor/error_estado_normal/error_encender";
import EncenderErrorECritico from "../../errores/errores_central_nuclear/errores_de_los_estados_del_reactor/error_estado_critico/encender_error";
import EncenderErrorEEmergencia from "../../errores/errores_central_nuclear/errores_de_los_estados_del_reactor/error_estado_emergencia/error_encender";
export default class EncenderReactor implements Command {
  public ejecutar(r: Reactor): void {
    try {
      r.encender();
    } catch (error) {
      if (error instanceof EncenderErrorEChernobyl) {
        console.log(error.message);
      } else if (error instanceof EncenderErrorENormal) {
        console.log(error.message);
      } else if (error instanceof EncenderErrorECritico) {
        console.log(error.message);
      } else if (error instanceof EncenderErrorEEmergencia) {
        console.log(error.message);
      } else {
        console.log(error.message);
      }

    }
  }
}
