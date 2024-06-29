import ISuscriptor from "../interfaces/isuscriptor";
import IAlerta from "../interfaces/ialerta";

export default abstract class Usuario implements ISuscriptor {
  public abstract notificar(alerta: IAlerta): void;
}
