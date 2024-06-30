import Command from "./command";
import Reactor from "../../central_nuclear/reactor/reactor";

export default class ApagarReactor implements Command {
  public ejecutar(r: Reactor): void {
    r.apagar();
    /*
    
    
    
    */ 
  }
}
