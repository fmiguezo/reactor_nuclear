import IAlerta from "./IAlerta";

export default class AlertaEstandar implements IAlerta {

    tipoAlerta: TipoAlerta.ESTANDAR;
    date: Date = new Date();

    public obtenerTipoDeAlerta(c: ComprobadorSaludReactor) {
        return this.tipoAlerta;
    }

    public obtenerMensajeDeAlerta(c: ComprobadorSaludReactor): string {
        return "ALERTA ESTANDAR, SE ACTIVARAN MECANISMOS DE ENFRIAMIENTO";
    }

    public obtenerTimestampDeAlerta(c: ComprobadorSaludReactor): Date {
        return this.date;
    }
    
}