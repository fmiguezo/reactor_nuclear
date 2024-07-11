import Registro from "./interfaces/registro";

export default class RegistroEnergiaGenerada implements Registro {
  private static _instancia: RegistroEnergiaGenerada;
  private mapaRegistros: Map<Date, number>;

  private constructor() {
    this.mapaRegistros = new Map();
  }

  public static get instancia(): RegistroEnergiaGenerada {
    if (!RegistroEnergiaGenerada._instancia) {
      RegistroEnergiaGenerada._instancia = new RegistroEnergiaGenerada();
    }

    return RegistroEnergiaGenerada._instancia;
  }

  public insertarRegistro(energiaProducida: number): void {
    this.mapaRegistros.set(new Date(), energiaProducida);
  }

  public obtenerRegistros(): Map<Date, number> {
    return this.mapaRegistros;
  }
}
