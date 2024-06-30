import EstadoReactor from "./estadoreactor";
import RApagado from "./apagado";
import RNormal from "./normal";
import REmergencia from "./emergencia";
import Alerta from "../../../sistema_de_control/alertas/alerta";
import GeneradorDeAlertasEstandar from "../../../sistema_de_control/alertas/generador_alerta_estandar";
import Reactor from "../reactor";
import RegistroEnergiaGenerada from "../../../sistema_de_control/registros/registro_energia_generada";

import { Constantes } from "../constantes";
export default class RCritico extends EstadoReactor {
  private _registroEnergia: RegistroEnergiaGenerada =
    RegistroEnergiaGenerada.instancia;
  private _timerGeneracion: NodeJS.Timeout | null = null;

  constructor(r: Reactor) {
    super(r);
    this.crearTimeOut();
  }

  override calcularEnergia(temperatura: number = 0): number {
    return 0;
  }

  private resetTimeOut(frecuencia: number = 30000): void {
    this.eliminarTimeOut();
    this.crearTimeOut(frecuencia);
  }

  private crearTimeOut(frecuencia: number = 30000): void {
    this._timerGeneracion = setTimeout(() => {
      this.liberarEnergia();
      this.resetTimeOut(frecuencia);
    }, frecuencia);
  }

  private eliminarTimeOut(): void {
    if (this._timerGeneracion !== null) {
      clearTimeout(this._timerGeneracion);
    }
  }

  override verificarEstado(): void {
    const tempActual = this._reactor.getTemperatura();
    if (tempActual < Constantes.TEMP_MAXIMA_NORMAL) {
      this.cambiarAEstadoNormal();
    } else if (tempActual >= Constantes.TEMP_CRITICA) {
      this.cambiarAEstadoEmergencia();
    }
  }

  private cambiarAEstadoNormal() {
    this.eliminarTimeOut();
    let estado: EstadoReactor = new RNormal(this._reactor);
    this._reactor.cambiarEstado(estado);
  }

  private cambiarAEstadoEmergencia() {
    this.eliminarTimeOut();
    let estado: EstadoReactor = new REmergencia(this._reactor);
    this._reactor.cambiarEstado(estado);
  }

  override encender() {
    throw new Error(Constantes.MENSAJE_ENCENDIDO);
  }

  override apagar() {
    this.eliminarTimeOut();
    let estado: EstadoReactor = new RApagado(this._reactor);
    this._reactor.cambiarEstado(estado);
  }

  override estaEncendido() {
    return true;
  }

  override generarAlerta(): Alerta {
    return GeneradorDeAlertasEstandar.generarAlerta();
  }

  public liberarEnergia(): void {
    const energiaGenerada: number = this._reactor.obtenerEnergiaNeta();
    this._registroEnergia.insertarRegistro(energiaGenerada);
  }
  override toString(): string {
    return Constantes.MENSAJE_ESTADO_CRITICO;
  }
}
