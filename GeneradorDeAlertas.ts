import AlertaCritica from "./AlertaCritica";
import AlertaEstandar from "./AlertaEstandar";
import IAlerta from "./IAlerta";

export default class GeneradorDeAlertas {
    public generarAlerta(c: ComprobadorSaludReactor): IAlerta {
        if(c.tieneTemperaturaSegura(r)) {
            return new AlertaEstandar();
        }
        else {
            return new AlertaCritica();
        }
    }
}