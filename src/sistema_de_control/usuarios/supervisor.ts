import ISuscriptor from "../interfaces/isuscriptor";
import Alerta from "../alertas/alerta";

export default class Supervisor implements ISuscriptor {
  public notificar(a: Alerta): void {}
}
