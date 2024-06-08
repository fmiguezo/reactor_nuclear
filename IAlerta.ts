import ComprobadorSaludReactor from "./ComprobadorSaludReactor";

export default interface IAlerta {

    obtenerTipoDeAlerta(c: ComprobadorSaludReactor): TipoAlerta;
    obtenerMensajeDeAlerta(c: ComprobadorSaludReactor): string;
    obtenerTimestampDeAlerta(c: ComprobadorSaludReactor): Date;

}