import AlertaEstandar from "./AlertaEstandar";
import IAlerta from "./IAlerta";
import IGeneradorDeAlertas from "./IGeneradorDeAlertas";

export default class GeneradorDeAlertasEstandar implements IGeneradorDeAlertas {
    public generarAlerta(): IAlerta {
        return new AlertaEstandar();
    }
}