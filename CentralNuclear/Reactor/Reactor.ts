import RApagado from "./EstadosReactor/RApagado.ts";
import IEstadoReactor from "./IEstadoReactor.ts";
import IMecanismoDeControl from "../Interfaces/IMecanismoDeControl.ts";
import ISensor from "../Sensores/ISensor.ts";

export default class Reactor {
  private idReactor: string = "";
  private estado: IEstadoReactor;
  private mecanimosDeControl: IMecanismoDeControl[] = [];
  private sensores: ISensor[] = [];
  private temperatura: number = 0;

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

  public actualizarTemperatura(): void {
    // TO-DO
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

  public agregarMecanismoDeControl(
    mecanismoDeControl: IMecanismoDeControl
  ): void {
    this.mecanimosDeControl.push(mecanismoDeControl);
  }

  public eliminarMecanismoDeControl(
    mecanismoDeControl: IMecanismoDeControl
  ): void {
    this.mecanimosDeControl = this.mecanimosDeControl.filter(
      (mecanismo) => mecanismo !== mecanismoDeControl
    );
  }

  public agregarSensor(sensor: ISensor): void {
    this.sensores.push(sensor);
  }

  public eliminarSensor(sensor: ISensor): void {
    this.sensores = this.sensores.filter((sensor) => sensor !== sensor);
  }

  public notificarSensores(): void {
    this.sensores.forEach((sensor) => sensor.actualizar(this));
  }
}
