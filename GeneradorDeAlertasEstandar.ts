import AlertaEstandar from "./AlertaEstandar";
import IAlerta from "./IAlerta";
import IGeneradorDeAlertas from "./IGeneradorDeAlertas";

export default class GeneradorDeAlertasCriticas implements IGeneradorDeAlertas {
    public generarAlerta(c: ComprobadorSaludReactor): IAlerta {
        return new AlertaEstandar();
    }
}