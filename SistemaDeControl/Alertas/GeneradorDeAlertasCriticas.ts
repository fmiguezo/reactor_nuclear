import AlertaCritica from "./AlertaCritica";
import IAlerta from "./IAlerta";
import IGeneradorDeAlertas from "./IGeneradorDeAlertas";

export default class GeneradorDeAlertasCriticas implements IGeneradorDeAlertas {
    public generarAlerta(): IAlerta {
        return new AlertaCritica();
    }
}