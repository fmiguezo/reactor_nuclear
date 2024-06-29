import RApagado from "./estados_reactor/apagado.js";
import IEstadoReactor from "./estados_reactor/estadoreactor.js";
import IMecanismoDeControl from "../interfaces/imecanismo_control.js";
import ISensor from "../interfaces/isensor.js";
import BarraControl from "../barras_control/barra_control.js";
import AdministradorBarras from "./administrador/administrador_barras.js";

export default class Reactor {
  private idReactor: string = "";
  private _estado: IEstadoReactor = new RApagado(this);
  private mecanimosDeControl: IMecanismoDeControl[] = [];
  private barrasControl: BarraControl[] = [];
  private sensores: ISensor[] = [];
  private temperatura: number = 0;
  private _administradorBarras!: AdministradorBarras;

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

  public get barrasDeControl(): BarraControl[] {
    return this.barrasControl;
  }

  public set barrasDeControl(bc: BarraControl[]) {
    this.barrasControl = bc;
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

  public get administradorBarras(): AdministradorBarras {
    return this._administradorBarras;
  }

  public set administradorBarras(componente: AdministradorBarras) {
    this._administradorBarras = componente;
  }
}
