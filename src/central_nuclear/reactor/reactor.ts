import RApagado from "./estados_reactor/apagado";
import EstadoReactor from "./estados_reactor/estadoreactor";
import IMecanismoDeControl from "../interfaces/imecanismo_control";
import ISensor from "../interfaces/isensor";
import BarraControl from "../barras_control/barra_control";
import AdministradorBarras from "./administrador/administrador_barras";
import Energia from "./reaccion/energia";
import PlantaNuclear from "../../planta_nuclear";

export default class Reactor {
  private _estado!: EstadoReactor;
  private _mecanimosDeControl: IMecanismoDeControl[] = [];
  private _barrasControl: BarraControl[] = [];
  private _sensores: ISensor[] = [];
  private _temperatura: number = 0;
  private _administradorBarras!: AdministradorBarras;
  private _plantaNuclear!: PlantaNuclear;

  public encender(): void {
    this._estado.encender();
  }

  public apagar(): void {
    this._estado.apagar();
  }

  public estaEncendido(): boolean {
    return this._estado.estaEncendido();
  }

  public getEstado(): EstadoReactor {
    return this._estado;
  }
  public setEstado(value: EstadoReactor) {
    this._estado = value;
  }

  public getTemperatura(): number {
    return this._temperatura;
  }

  public setTemperatura(temperatura: number): void {
    this._temperatura = temperatura;
  }

  public getBarrasDeControl(): BarraControl[] {
    return this._barrasControl;
  }

  public setBarrasDeControl(bc: BarraControl[]) {
    this._barrasControl = bc;
  }

  public obtenerEnergiaTermal(): number {
    return Energia.calcularEnergiaTermal(this._temperatura);
  }

  public obtenerEnergiaNeta(): number {
    return Energia.calcularEnergiaNeta(this.obtenerEnergiaTermal());
  }

  public cambiarEstado(state: EstadoReactor): void {
    this._estado = state;
    this.notificarSistema();
  }

  public agregarMecanismoDeControl(
    mecanismoDeControl: IMecanismoDeControl
  ): void {
    this._mecanimosDeControl.push(mecanismoDeControl);
  }

  public eliminarMecanismoDeControl(mecanismoDeControl: IMecanismoDeControl): void {
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
    this._plantaNuclear.getSistema().actualizar(this);
  }

  public calcularTemperatura(): void {}

  public getAdministradorBarras(): AdministradorBarras {
    return this._administradorBarras;
  }

  public setAadministradorBarras(componente: AdministradorBarras) {
    this._administradorBarras = componente;
  }

  public setPlantaNuclear(plantaNuclear: PlantaNuclear) {
    this._plantaNuclear = plantaNuclear;
  }

  public getPlantaNuclear(): PlantaNuclear {
    return this._plantaNuclear;
  }

  public puedeInsertarBarras(): boolean {
    return this._estado.puedeInsertarBarras();
  }

  public desactivarMecanismosDeControl(): void {
    this._administradorBarras.subirBarras();
  }
}
