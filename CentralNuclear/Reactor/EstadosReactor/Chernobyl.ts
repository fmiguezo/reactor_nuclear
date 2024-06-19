import IEstadoReactor from "../IEstadoReactor";
import Reactor from "..//Reactor";
import RApagado from "./RApagado";
import RCritico from "./RCritico";
import Chernobyl from "./Chernobyl";

export default class REmergencia extends IEstadoReactor {
  override calcularEnergia(temperatura: number = 0): number {
    return 0;
  }

  override verificaEstado(): void {
    throw new Error("El reactor explotó");
  }

  override encender() {
    throw new Error("No se puede encender: el reactor explotó");
  }

  override apagar() {
    throw new Error("No se puede apagar: el reactor explotó");
  }

  override estaEncendido() {
    return false;
  }
}
