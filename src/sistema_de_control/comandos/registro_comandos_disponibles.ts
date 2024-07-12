import Command from "../comandos/command";

export default class RegistroComandosDisponibles {
  private static _instancia: RegistroComandosDisponibles;
  private mapaRegistros: Map<String, Command>;

  private constructor() {
    this.mapaRegistros = new Map();
  }

  public static get instancia(): RegistroComandosDisponibles {
    if (!RegistroComandosDisponibles._instancia) {
      RegistroComandosDisponibles._instancia = new RegistroComandosDisponibles();
    }
    return RegistroComandosDisponibles._instancia;
  }

  public insertarCommand(nombreDelComando: String, command: Command): void {
    this.mapaRegistros.set(nombreDelComando, command);
  }

  public obtenerCommands(): Map<String, Command> {
    return this.mapaRegistros;
  }
}
