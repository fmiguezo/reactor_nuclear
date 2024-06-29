import IEmpleado from "../interfaces/empleado";
import Alerta from "../alertas/alerta";

export default abstract class Operador implements IEmpleado {
  notificar(a: Alerta): void {
    // TO-DO
  }
}
