import IAlerta from "./ialerta";

export default interface ISuscriptor {
  notificar(alerta: IAlerta): void;
}
