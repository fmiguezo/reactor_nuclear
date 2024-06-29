import ISuscriptor from "../interfaces/isuscriptor";
import IAlerta from "../alertas/alerta";

export default abstract class Operador implements ISuscriptor {
  public abstract notificar(alerta: IAlerta): void;
}
