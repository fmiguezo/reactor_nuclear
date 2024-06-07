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

  public getTemperatura(): number {
    return this.temperatura;
  }

  public setTemperatura(temperatura: number): void {
    this.temperatura = temperatura;
  }

  public getIdReactor(): string {
    return this.idReactor;
  }

  public getEstado(): EstadoReactor {
    return this.estado;
  }

  public agregarMecanismoDeControl(mecanismoDeControl: IMecanismoDeControl): void {
    this.mecanimosDeControl.push(mecanismoDeControl);
  }

  public eliminarMecanismoDeControl(mecanismoDeControl: IMecanismoDeControl): void {
    this.mecanimosDeControl = this.mecanimosDeControl.filter((mecanismo) => mecanismo !== mecanismoDeControl);
  }
}
