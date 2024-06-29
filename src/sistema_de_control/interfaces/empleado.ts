import Alerta from "../alertas/alerta";

export default interface IEmpleado {
  notificar(a: Alerta): void;
}
