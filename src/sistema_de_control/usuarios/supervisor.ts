import ISuscriptor from "../interfaces/isuscriptor";
import IAlerta from "../interfaces/ialerta";

export default class Supervisor implements ISuscriptor {
  public notificar(alerta: IAlerta): void {}
}
