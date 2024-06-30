import Command from "./command";
import Reactor from "../../central_nuclear/reactor/reactor";

export default class InsertarBarraDeControl implements Command {
  public ejecutar(r: Reactor): void {
    
    while(r.getTemperatura() > 330){
      r.getAdministradorBarras().insertarBarras(1);
    }


  }
}
