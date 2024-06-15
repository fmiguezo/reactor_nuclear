import IAlerta from "./IAlerta";

export default interface GeneradorDeAlertas {
    generarAlerta(c: ComprobadorSaludReactor): IAlerta;
}