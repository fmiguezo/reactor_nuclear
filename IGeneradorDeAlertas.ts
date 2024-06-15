import IAlerta from "./IAlerta";

export default interface IGeneradorDeAlertas {
    generarAlerta(c: ComprobadorSaludReactor): IAlerta;
}