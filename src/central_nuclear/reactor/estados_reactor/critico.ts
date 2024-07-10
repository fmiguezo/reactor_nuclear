import EstadoReactor from "./estadoreactor";
import RApagado from "./apagado";
import RNormal from "./normal";
import REmergencia from "./emergencia";
import Alerta from "../../../sistema_de_control/alertas/alerta";
import GeneradorDeAlertasEstandar from "../../../sistema_de_control/alertas/generador_alerta_estandar";
import Reactor from "../reactor";
import RegistroEnergiaGenerada from "../../../sistema_de_control/registros/registro_energia_generada";
import { Constantes } from "../constantes";
import RegistroEstados from "../../../sistema_de_control/registros/registroEstados";
import EncenderError from "../../../errores/errores_central_nuclear/errores_de_los_estados_del_reactor/error_estado_critico/encender_error";
export default class RCritico extends EstadoReactor {
  private _registroEnergia: RegistroEnergiaGenerada =
    RegistroEnergiaGenerada.instancia;
  private _timerGeneracion: NodeJS.Timeout | null = null;

  constructor(r: Reactor) {
    super(r);
    this.crearTimeOut();
    // this.verificarEstado();
  }

  private resetTimeOutEnergia(frecuencia: number = 30000): void {
    this.eliminarTimeOut(this._timerGeneracion);
    this.crearTimeOut(frecuencia);
  }

  private crearTimeOut(frecuencia: number = 30000): void {
    this._timerGeneracion = setTimeout(() => {
      this.liberarEnergia();
      this.resetTimeOutEnergia(frecuencia);
    }, frecuencia);
  }

  override verificarEstado(): void {
    const tempActual = this._reactor.getTemperatura();
    if (tempActual < Constantes.TEMP_MINIMA_CRITICA) {
      this.cambiarAEstadoNormal();
    } else if (tempActual >= Constantes.TEMP_MINIMA_EMERGENCIA) {
      this.cambiarAEstadoEmergencia();
    }
  }

  private cambiarAEstadoNormal() {
    this.eliminarTimeOut(this._timerGeneracion);
    let estado: EstadoReactor = new RNormal(this._reactor);
    this._reactor.cambiarEstado(estado);
    RegistroEstados.instancia.aumentarRegistro(estado);
    this._reactor.desactivarMecanismosDeControl();
  }

  private cambiarAEstadoEmergencia() {
    this.eliminarTimeOut(this._timerGeneracion);
    let estado: EstadoReactor = new REmergencia(this._reactor);
    this._reactor.cambiarEstado(estado);
  }

  override encender() {
    throw new EncenderError(Constantes.MENSAJE_ESTADO_CRITICO);
  }

  override apagar() {
    this.eliminarTimeOut(this._timerGeneracion);
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
    const energiaGenerada: number = this.obtenerEnergiaNeta();
    this._registroEnergia.insertarRegistro(energiaGenerada);
  }
  override toString(): string {
    return Constantes.MENSAJE_ESTADO_CRITICO;
  }
}
