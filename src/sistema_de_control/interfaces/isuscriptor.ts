import IAlerta from "../alertas/alerta";

export default interface ISuscriptor {
  notificar(alerta: IAlerta): void;
}
