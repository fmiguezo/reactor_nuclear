import IAlerta from "./ialerta";

export default interface IGeneradorDeAlertas {
  generarAlerta(): IAlerta;
}
