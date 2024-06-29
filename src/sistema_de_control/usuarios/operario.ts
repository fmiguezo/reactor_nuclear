import ISuscriptor from "../interfaces/empleado";
import Alerta from "../alertas/alerta";

export default abstract class Operador implements ISuscriptor {
  notificar(a: Alerta): void {
    // TO-DO
  }
}
