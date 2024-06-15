import AlertaCritica from "./AlertaCritica";
import IAlerta from "./IAlerta";
import IGeneradorDeAlertas from "./IGeneradorDeAlertas";

export default class GeneradorDeAlertasCriticas implements IGeneradorDeAlertas {
    public generarAlerta(c: ComprobadorSaludReactor): IAlerta {
        return new AlertaCritica();
    }
}