import EstadoReactor from "./estadoreactor";
import RApagado from "./apagado";
import RCritico from "./critico";
import RegistroEnergiaGenerada from "../../../sistema_de_control/registros/registro_energia_generada";
import Reactor from "../reactor";
import RegistroEstados from "../../../sistema_de_control/registros/registroEstados";
import { Constantes } from "../constantes";

export default class RNormal extends EstadoReactor {
  private _registroEnergia: RegistroEnergiaGenerada = RegistroEnergiaGenerada.instancia;

  private _timerGeneracion: NodeJS.Timeout | null = null;

  constructor(r: Reactor) {
    super(r);
    this.crearTimeOutEnergia();
  }

  private resetTimeOutEnergia(frecuencia: number = 30000): void {
    this.eliminarTimeOut(this._timerGeneracion);
    this.crearTimeOutEnergia(frecuencia);
  }

  private crearTimeOutEnergia(frecuencia: number = 30000): void {
    this._timerGeneracion = setTimeout(() => {
      this.liberarEnergia();
      this.resetTimeOutEnergia(frecuencia);
    }, frecuencia);
  }

  override calcularEnergia(temperatura: number = 0): number {
    return this._reactor.obtenerEnergiaNeta();
  }

  override verificarEstado(): void {
    const tempActual = this._reactor.getTemperatura();
    if (tempActual >= Constantes.TEMP_MAXIMA_NORMAL) {
      this.cambiarAEstadoCritico();
    }
  }

  private cambiarAEstadoCritico() {
    this.eliminarTimeOut(this._timerGeneracion);
    let estado: EstadoReactor = new RCritico(this._reactor);
    this._reactor.cambiarEstado(estado);
    RegistroEstados.instancia.aumentarRegistro(estado);
  }

  override encender() {
    throw new Error(Constantes.MENSAJE_ENCENDIDO);
  }

  override apagar() {
    this.eliminarTimeOut(this._timerGeneracion);
    let estado: EstadoReactor = new RApagado(this._reactor);
    this._reactor.cambiarEstado(estado);
    RegistroEstados.instancia.aumentarRegistro(estado);
  }

  override estaEncendido() {
    return true;
  }

  public liberarEnergia(): void {
    const energiaGenerada: number = this._reactor.obtenerEnergiaNeta();
    this._registroEnergia.insertarRegistro(energiaGenerada);
  }
  override toString(): string {
    return Constantes.MENSAJE_ESTADO_NORMAL;
  }

  override puedeInsertarBarras(): boolean {
    return false;
  }
}
