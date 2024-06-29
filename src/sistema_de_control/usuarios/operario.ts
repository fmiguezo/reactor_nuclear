import ISuscriptor from "../interfaces/isuscriptor";
import Alerta from "../alertas/alerta";

export default abstract class Operador implements ISuscriptor {
  public abstract notificar(a: Alerta): void;
}
