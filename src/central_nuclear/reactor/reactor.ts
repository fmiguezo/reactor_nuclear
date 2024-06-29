import RApagado from "./estados_reactor/apagado.js";
import IEstadoReactor from "./estados_reactor/estadoreactor.js";
import IMecanismoDeControl from "../interfaces/imecanismo_control.js";
import ISensor from "../interfaces/isensor.js";
import BarraControl from "../barras_control/barra_control.js";
import AdministradorBarras from "./administrador/administrador_barras.js";
import Energia from "./reaccion/energia.js";
import PlantaNuclear from "../../planta_nuclear.js";

export default class Reactor {
  private _idReactor: string = "";
  private _estado: IEstadoReactor = new RApagado(this);
  private _mecanimosDeControl: IMecanismoDeControl[] = [];
  private _barrasControl: BarraControl[] = [];
  private _sensores: ISensor[] = [];
  private _temperatura: number = 0;
  private _administradorBarras!: AdministradorBarras;
  private _plantaNuclear!: PlantaNuclear;

  constructor(plantaNuclear: PlantaNuclear) {
    this._plantaNuclear = plantaNuclear;
  }

  public encender(): void {
    this._estado.encender();
  }

  public apagar(): void {
    this._estado.apagar();
  }

  public estaEncendido(): boolean {
    return this._estado.estaEncendido();
  }

  public getEstado(): IEstadoReactor {
    return this._estado;
  }
  public setEstado(value: IEstadoReactor) {
    this._estado = value;
  }

  public getTemperatura(): number {
    return this._temperatura;
  }

  public setTemperatura(temperatura: number): void {
    this._temperatura = temperatura;
  }

  public getIdReactor(): string {
    return this._idReactor;
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

  public obtenerEnergiaTermal(): number {
    return Energia.calcularEnergiaTermal(this._temperatura);
  }

  public obtenerEnergiaNeta(): number {
    return Energia.calcularEnergiaNeta(this.obtenerEnergiaTermal());
  }

  public cambiarEstado(state: IEstadoReactor): void {
    console.log("Cambiando estado");
    this._estado = state;
    this.notificarSistema();
  }

  public agregarMecanismoDeControl(
    mecanismoDeControl: IMecanismoDeControl
  ): void {
    this._mecanimosDeControl.push(mecanismoDeControl);
  }

  public eliminarMecanismoDeControl(
    mecanismoDeControl: IMecanismoDeControl
  ): void {
    this._mecanimosDeControl = this._mecanimosDeControl.filter(
      (mecanismo) => mecanismo !== mecanismoDeControl
    );
  }

  public agregarSensor(sensor: ISensor): void {
    this._sensores.push(sensor);
  }

  public eliminarSensor(sensor: ISensor): void {
    this._sensores = this._sensores.filter((sensor) => sensor !== sensor);
  }

  public getSensores(): ISensor[] {
    return this._sensores;
  }

  public notificarSensores(): void {
    this._sensores.forEach((sensor) => sensor.actualizar(this));
  }
  public notificarSistema(): void {
    this._plantaNuclear.sistema.actualizar(this);
  }

  public calcularTemperatura(): void {}

  public getAdministradorBarras(): AdministradorBarras {
    return this._administradorBarras;
  }

  public setAadministradorBarras(componente: AdministradorBarras) {
    this._administradorBarras = componente;
  }
}
