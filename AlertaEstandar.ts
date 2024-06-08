import IAlerta from "./IAlerta";

export default class AlertaEstandar implements IAlerta {

    tipoAlerta: TipoAlerta.ESTANDAR;
    date: Date = new Date();

    obtenerTipoDeAlerta(c: ComprobadorSaludReactor) {
        return this.tipoAlerta;
    }

    obtenerMensajeDeAlerta(c: ComprobadorSaludReactor): string {
        return "ALERTA ESTANDAR, SE ACTIVARAN MECANISMOS DE ENFRIAMIENTO";
    }

    obtenerTimestampDeAlerta(c: ComprobadorSaludReactor): Date {
        return this.date;
    }
    
}