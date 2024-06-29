import Alerta from "../alertas/alerta";

export default interface ISuscriptor {
  notificar(a: Alerta): void;
}
