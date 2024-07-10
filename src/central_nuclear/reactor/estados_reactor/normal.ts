import EstadoReactor from "./estadoreactor";
import RApagado from "./apagado";
import RCritico from "./critico";
import RegistroEnergiaGenerada from "../../../sistema_de_control/registros/registro_energia_generada";
import Reactor from "../reactor";
import RegistroEstados from "../../../sistema_de_control/registros/registroEstados";
import { Constantes } from "../constantes";
import EncenderError from "../../../errores/errores_central_nuclear/errores_de_los_estados_del_reactor/error_estado_normal/error_encender";

export default class RNormal extends EstadoReactor {
  private _registroEnergia: RegistroEnergiaGenerada =
    RegistroEnergiaGenerada.instancia;

  private _timerGeneracion: NodeJS.Timeout | null = null;

  constructor(r: Reactor) {
    super(r);
    this.crearTimeOutEnergia();
    // this.verificarEstado();
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

  override verificarEstado(): void {
    const tempActual = this._reactor.getTemperatura();
    if (tempActual < Constantes.TEMP_MINIMA_NORMAL) {
      this.apagar();
    } else if (tempActual > Constantes.TEMP_MAXIMA_NORMAL) {
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
    throw new EncenderError(Constantes.MENSAJE_ENCENDIDO);
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
    const energiaGenerada: number = this.obtenerEnergiaNeta();
    this._registroEnergia.insertarRegistro(energiaGenerada);
  }

  override toString(): string {
    return Constantes.MENSAJE_ESTADO_NORMAL;
  }

  override puedeInsertarBarras(): boolean {
    return false;
  }
}
