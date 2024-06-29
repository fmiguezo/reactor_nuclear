import EstadoReactor from "./estadoreactor";

export default class Chernobyl extends EstadoReactor {
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
