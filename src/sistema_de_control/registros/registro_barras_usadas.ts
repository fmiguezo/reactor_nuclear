import Registro from "./registro";

export default class RegistroBarrasUsadas implements Registro {
  private static _instancia: RegistroBarrasUsadas;
  private mapaRegistros: Map<Date, number>;

  private constructor() {
    this.mapaRegistros = new Map();
  }

  public static get instancia(): RegistroBarrasUsadas {
    if (!RegistroBarrasUsadas._instancia) {
      RegistroBarrasUsadas._instancia = new RegistroBarrasUsadas();
    }

    return RegistroBarrasUsadas._instancia;
  }

  public insertarRegistro(barrasUsadas: number): void {
    this.mapaRegistros.set(new Date(), barrasUsadas);
  }

  public obtenerRegistros(): Map<Date, number> {
    return this.mapaRegistros;
  }
}
