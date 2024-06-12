import IAlerta from "./IAlerta";

export default class AlertaCritica implements IAlerta {

    tipoAlerta: TipoAlerta = TipoAlerta.CRITICA;
    date: Date = new Date();

    public obtenerTipoDeAlerta() {
        return this.tipoAlerta;
    }

    public obtenerMensajeDeAlerta(): string {
        return "ALERTA CRITICA, EL REACTOR SE APAGARA";
    }

    public obtenerTimestampDeAlerta(): Date {
        return this.date;
    }
    
}