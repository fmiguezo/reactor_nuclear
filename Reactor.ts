import EstadoReactor from "./EstadoReactor";
import IMecanismoDeControl from "./IMecanismoDeControl";
import ISensor from "./ISensor";

export default class Reactor {
  private idReactor: string = "";
  private estado: EstadoReactor;
  private mecanimosDeControl: IMecanismoDeControl[] = [];
  private temperatura: number;

  public encender(): void {
    this.estado = EstadoReactor.ENCENDIDO;
  }
  public apagar(): void {
    this.estado = EstadoReactor.APAGADO;
  }
}
