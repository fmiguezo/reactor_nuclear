import IAlerta from "./IAlerta";

export default class AlertaEstandar implements IAlerta {

    tipoAlerta: TipoAlerta = TipoAlerta.ESTANDAR;
    date: Date = new Date();

    public obtenerTipoDeAlerta() {
        return this.tipoAlerta;
    }

    public obtenerMensajeDeAlerta(): string {
        return "ALERTA ESTANDAR, SE ACTIVARAN MECANISMOS DE ENFRIAMIENTO";
    }

    public obtenerTimestampDeAlerta(): Date {
        return this.date;
    }
    
}