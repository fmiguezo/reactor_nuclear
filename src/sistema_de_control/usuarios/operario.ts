import IEmpleado from "../interfaces/empleado";
import Alerta from "../alertas/alerta";
import Reactor from "../../central_nuclear/reactor/reactor";
import Command from "../comandos/command";

export default abstract class Operador implements IEmpleado {
  private nombre: String;
  private reactor: Reactor;

  constructor(reactor: Reactor, nombre: String) {
    this.reactor = reactor;
    this.nombre = nombre;
  }

  realizarOperacion(comando: Command): void {
    comando.ejecutar(this.reactor);
  }

  notificar(a: Alerta): void {
    // TO-DO
  }
}
