import Command from "./Command";
import Reactor from "../../src/central_nuclear/reactor/reactor";

export default class ReportarEstado implements Command {
  public ejecutar(r: Reactor): void {
    
    if(r.getTemperatura() > 330){
      console.log("El Reactor se encuentra en estado Critico");
    }else if(r.getTemperatura() >= 280){
      console.log("El reactor se encuentra funcionando con normalidad");
    } else{
      console.log("El reactor se encuentra por debajo de los niveles normales");
    }

  }
}
