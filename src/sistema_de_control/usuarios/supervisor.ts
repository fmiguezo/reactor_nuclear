import ISuscriptor from "../interfaces/isuscriptor";
import IAlerta from "../alertas/alerta";

export default class Supervisor implements ISuscriptor {
  public notificar(alerta: IAlerta): void {}
}
