import Command from "./command";
import Reactor from "../../central_nuclear/reactor/reactor";

export default class InsertarBarraDeControl implements Command {
  public ejecutar(r: Reactor): void {
    
  // Es momentaneo, hay que implementar el metodo insertar barra en cada estado para no tener que verificar en esta clase
   
  while(r.getTemperatura() > 330){
      r.getAdministradorBarras().insertarBarras(1);
  }


  }
}
