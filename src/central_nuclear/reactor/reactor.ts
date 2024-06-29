import RApagado from "./estados_reactor/apagado.js";
import IEstadoReactor from "./estados_reactor/estadoreactor.js";
import IMecanismoDeControl from "../interfaces/imecanismo_control.js";
import ISensor from "../interfaces/isensor.js";
import BarraControl from "../barras_control/barra_control.js";
import AdministradorBarras from "./administrador/administrador_barras.js";

export default class Reactor {
  private _idReactor: string = "";
  private _estado: IEstadoReactor = new RApagado(this);
  private _mecanimosDeControl: IMecanismoDeControl[] = [];
  private _barrasControl: BarraControl[] = [];
  private _sensores: ISensor[] = [];
  private _temperatura: number = 0;
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
    return this._temperatura;
  }

  public getBarrasDeControl(): BarraControl[] {
    return this._barrasControl;
  }

  public setBarrasDeControl(bc: BarraControl[]) {
    this._barrasControl = bc;
  }

  public actualizarTemperatura(): void {
    // TO-DO
  }

  public setTemperatura(temperatura: number): void {
    this._temperatura = temperatura;
  }

  public getIdReactor(): string {
    return this._idReactor;
  }

  public getEstado() {
    return this.estado.estaEncendido();
  }

  public cambiarEstado(state: IEstadoReactor): void {
    console.log("Cambiando estado");
    this.estado = state;
    this.estado.cargaContexto(this);
  }

  public agregarMecanismoDeControl(mecanismoDeControl: IMecanismoDeControl): void {
    this._mecanimosDeControl.push(mecanismoDeControl);
  }

  public eliminarMecanismoDeControl(mecanismoDeControl: IMecanismoDeControl): void {
    this._mecanimosDeControl = this._mecanimosDeControl.filter((mecanismo) => mecanismo !== mecanismoDeControl);
  }

  public agregarSensor(sensor: ISensor): void {
    this._sensores.push(sensor);
  }

  public eliminarSensor(sensor: ISensor): void {
    this._sensores = this._sensores.filter((sensor) => sensor !== sensor);
  }

  public notificarSensores(): void {
    this._sensores.forEach((sensor) => sensor.actualizar(this));
  }

  public calcularTemperatura(): void {}

  public get administradorBarras(): AdministradorBarras {
    return this._administradorBarras;
  }

  public set administradorBarras(componente: AdministradorBarras) {
    this._administradorBarras = componente;
  }
}
