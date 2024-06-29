import Command from "./Command";
import Reactor from "../../src/central_nuclear/reactor/reactor";
import EstadoBarraControl from "../../src/central_nuclear/barras_control/estados/estado_barra_control";
import Insertada from "../../src/central_nuclear/barras_control/estados/insertada";
import EnDesuso from "../../src/central_nuclear/barras_control/estados/en_desuso";

export default class InsertarBarraDeControl implements Command {
     
    public ejecutar(r: Reactor): void {
        for(const barra of r.barrasDeControl){
            if(barra.getEstado() instanceof EnDesuso ){
                barra.activar();
                return;
            }
        }
        throw new BarrasNoDisponibles("No hay barras disponibles para activar en el reactor");
        
    }

}