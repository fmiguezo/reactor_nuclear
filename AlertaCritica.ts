import IAlerta from "./IAlerta";

export default class AlertaCritica implements IAlerta {

    tipoAlerta: TipoAlerta.CRITICA;
    date: Date = new Date();

    obtenerTipoDeAlerta(c: ComprobadorSaludReactor) {
        return this.tipoAlerta;
    }

    obtenerMensajeDeAlerta(c: ComprobadorSaludReactor): string {
        return "ALERTA CRITICA, EL REACTOR SE APAGARA";
    }

    obtenerTimestampDeAlerta(c: ComprobadorSaludReactor): Date {
        return this.date;
    }
    
}