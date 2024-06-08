import IAlerta from "./IAlerta";
import ComprobadorSaludReactor from "./ComprobadorSaludReactor";

export default class AlertaCritica implements IAlerta {

    tipoAlerta: TipoAlerta.CRITICA;
    date: Date = new Date();

    public obtenerTipoDeAlerta(c: ComprobadorSaludReactor) {
        return this.tipoAlerta;
    }

    public obtenerMensajeDeAlerta(c: ComprobadorSaludReactor): string {
        return "ALERTA CRITICA, EL REACTOR SE APAGARA";
    }

    public obtenerTimestampDeAlerta(c: ComprobadorSaludReactor): Date {
        return this.date;
    }
    
}