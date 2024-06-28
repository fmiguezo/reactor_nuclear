import RApagado from "./EstadosReactor/RApagado";
import IEstadoReactor from "./IEstadoReactor";
import IMecanismoDeControl from "../Interfaces/IMecanismoDeControl";
import ISensor from "../Sensores/ISensor";
import BarraControl from "../BarrasDeControl/BarraControl";

export default class Reactor {
  private idReactor: string = "";
  private _estado: IEstadoReactor = new RApagado();
  private mecanimosDeControl: IMecanismoDeControl[] = [];
  private barrasControl: BarraControl[] = [];
  private sensores: ISensor[] = [];
  private temperatura: number = 0;

  public get estado(): IEstadoReactor {
    return this._estado;
  }
  public set estado(value: IEstadoReactor) {
    this._estado = value;
  }

  public encender(): void {
    this._estado.encender();
  }

  public apagar(): void {
    this._estado.apagar();
  }

  public getTemperatura(): number {
    return this.temperatura;
  }

  public getBarrasInsertadas(): BarraControl[] {
    return this.barrasControl.filter((b) => {
      b.estaActivo() == true;
    });
  }

  public getBarrasVencidas(): BarraControl[] {
    return this.barrasControl.filter((b) => {
      b.VidaUtilRestante == 0;
    });
  }

  public removerBarras(barras: BarraControl[]): void {
    barras.forEach((b) => {
      this.barrasControl = this.barrasControl.filter((r) => r !== b);
    });
  }

  public agregarBarras(barras: BarraControl[]): void {
    barras.forEach((b) => {
      this.barrasControl.push(b);
    });
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

  public calcularTemperatura(): void {}
}
