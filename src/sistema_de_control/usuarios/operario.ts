import ISuscriptor from "../interfaces/isuscriptor";
import IAlerta from "../interfaces/ialerta";

export default abstract class Operador implements ISuscriptor {
  public abstract notificar(alerta: IAlerta): void;
}
