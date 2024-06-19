import IAlerta from "./IAlerta";

export default class AlertaCritica implements IAlerta {

    private _tipoAlerta: TipoAlerta = TipoAlerta.CRITICA;
    public get tipoAlerta(): TipoAlerta {
        return this._tipoAlerta;
    }
    public set tipoAlerta(value: TipoAlerta) {
        this._tipoAlerta = value;
    }
    private _date: Date = new Date();
    public get date(): Date {
        return this._date;
    }
    public set date(value: Date) {
        this._date = value;
    }

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