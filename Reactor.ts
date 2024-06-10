import RApagado from "./EstadosReactor/RApagado.ts";
import IEstadoReactor from "./IEstadoReactor.ts";
import IMecanismoDeControl from "./IMecanismoDeControl";
import ISensor from "./ISensor";

export default class Reactor {
  private idReactor: string = "";
  private estado: IEstadoReactor;
  private mecanimosDeControl: IMecanismoDeControl[] = [];
  private temperatura: number;

  constructor(estado: IEstadoReactor = new RApagado()) {}
  public encender(): void {
    this.estado.encender();
  }
  public apagar(): void {
    this.estado.apagar();
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

  public getEstado() {
    return this.estado.estaEncendido();
  }

  public cambiarEstado(state: IEstadoReactor): void {
    console.log("Cambiando estado");
    this.estado = state;
    this.estado.cargaContexto(this);
  }

  public agregarMecanismoDeControl() (
    mecanismoDeControl: IMecanismoDeControl
  ): void {
    this.mecanimosDeControl.push(mecanismoDeControl);
  }

  public eliminarMecanismoDeControl() (
    mecanismoDeControl: IMecanismoDeControl
  ): void {
    this.mecanimosDeControl = this.mecanimosDeControl.filter(
      (mecanismo) => mecanismo !== mecanismoDeControl
    );
  }
}
