import IAlerta from "./IAlerta";
import ComprobadorSaludReactor from "./ComprobadorSaludReactor";

export default class AlertaCritica implements IAlerta {

    tipoAlerta: TipoAlerta.CRITICA;
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