import ComprobadorSaludReactor from "./ComprobadorSaludReactor";

export default interface IAlerta {

    obtenerTipoDeAlerta(): TipoAlerta;
    obtenerMensajeDeAlerta(): string;
    obtenerTimestampDeAlerta(): Date;

}