import { EstadoReactor } from "./EstadoReactor";
import Reactor from "./Reactor.ts";


export default class ComprobadorSaludReactor{

    private estaEncendido(reactor: Reactor): boolean{ 
        if(reactor.getEstado() === EstadoReactor.ENCENDIDO){
            return true;
        }
        else{
            return false;
        }
    }

    private tieneTemperaturaSegura(reactor: Reactor): boolean{
        if(reactor.getTemperatura() > 280 && reactor.getTemperatura() < 330 ){
            return true;
        }
        else{
            return false;
        }
    }
    // Esta puesto de modo temporal, Agregar el metodo produccion de energia que va
    private produceEnergiaEnRango(reactor: Reactor): boolean{
        if(reactor.getProduccionDeEnergia() > 280 && reactor.getTemperatura() < 330 ){
            return true;
        }
        else{
            return false;
        }
    }

}