import RApagado from "./estados_reactor/apagado";
import EstadoReactor from "./estados_reactor/estadoreactor";
import IMecanismoDeControl from "../interfaces/imecanismo_control";
import ISensor from "../interfaces/isensor";
import BarraControl from "../barras_control/barra_control";
import AdministradorBarras from "./administrador/administrador_barras";
import Energia from "./reaccion/energia";
import PlantaNuclear from "../../planta_nuclear";
import EnergiaTermalCalculationError from "../../errores/errores_central_nuclear/errores_reaccion/error_energia/energia_termal_calculation_error";
import SubirBarrasError from "../../errores/errores_central_nuclear/errores_del_administrador_de_barras/subir_barras_error";
export default class Reactor {
  private _estado!: EstadoReactor;
  private _mecanimosDeControl: IMecanismoDeControl[] = [];
  private _barrasControl: BarraControl[] = [];
  private _sensores: ISensor[] = [];
  private _temperatura: number = 0;
  private _administradorBarras!: AdministradorBarras;
  private _plantaNuclear!: PlantaNuclear;
  private _id: number = 0;
  protected _timerTemp: NodeJS.Timeout | null = null;
  public get id(): number {
    return this._id;
  }
  public set id(value: number) {
    this._id = value;
  }
  public encender(): void {
    this._estado.encender();
    this.crearTimeOutTemp(10000);
  }
  public apagar(): void {
    this.eliminarTimeOut(this._timerTemp);
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
    let energiaTermal = 0;
    try {
      energiaTermal = Energia.calcularEnergiaTermal(this._temperatura);
    } catch (error) {
      if (error instanceof EnergiaTermalCalculationError) {
        console.log(error.message);
      } else {
        console.log(error.message);
      }
    }
    return energiaTermal;
  }
  public obtenerEnergiaNeta(): number {
    return this._estado.obtenerEnergiaNeta();
  }
  public cambiarEstado(state: EstadoReactor): void {
    this._estado = state;
    if (this._plantaNuclear.getSistema() != null) {
      this.notificarSistema();
    }
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
  public getSensores(): ISensor[] {
    return this._sensores;
  }
  public notificarSensores(): void {
    this._sensores.forEach((sensor) => sensor.actualizar(this));
  }
  public notificarSistema(): void {
    if (this._plantaNuclear.getSistema() != null) {
      this._plantaNuclear.getSistema().actualizar(this);
    }
  }
  public getAdministradorBarras(): AdministradorBarras {
    return this._administradorBarras;
  }
  public setAdministradorBarras(admin: AdministradorBarras) {
    this._administradorBarras = admin;
    admin.setReactor(this);
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
    if (this._administradorBarras.getBarrasInsertadas().length > 0) {
      try {
        this._administradorBarras.subirBarras();
      } catch (error) {
        if (error instanceof SubirBarrasError) {
          console.log(error.message);
        } else {
          console.log(error.message);
        }
      }
    }
  }
  public agregarBarra(barra: BarraControl): void {
    this._barrasControl.push(barra);
  }
  public calcValorEnfriamiento(): number {
    const administradorBarras: AdministradorBarras = this.getAdministradorBarras();
    let barrasInsertadas: BarraControl[] = administradorBarras.getBarrasInsertadas();
    let valorEnfriamiento: number = 0;
    barrasInsertadas.forEach((b) => (valorEnfriamiento += b.getPctBarra()));
    return valorEnfriamiento / 100;
  }
  public incrementarTemperatura(): void {
    let nuevaTemp: number = this.getTemperatura();
    nuevaTemp += 10;
    this.setTemperatura(nuevaTemp);
    this.getEstado().verificarEstado();
  }
  public enfriarReactor(): void {
    this._temperatura -= this.calcValorEnfriamiento();
  }
  private crearTimeOutTemp(frecuencia: number): void {
    this._timerTemp = setTimeout(() => {
      this.incrementarTemperatura();
      this.enfriarReactor();
      this.resetTimeOutTemp(frecuencia);
    }, frecuencia);
  }
  private eliminarTimeOut(timerCancelar: NodeJS.Timeout | null): void {
    if (timerCancelar !== null) {
      clearTimeout(timerCancelar);
    }
  }
  private resetTimeOutTemp(frecuencia: number): void {
    this.eliminarTimeOut(this._timerTemp);
    this.crearTimeOutTemp(frecuencia);
  }
}