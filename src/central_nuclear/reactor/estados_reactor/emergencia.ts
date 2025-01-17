import EstadoReactor from "./estadoreactor";
import RApagado from "./apagado";
import RCritico from "./critico";
import Chernobyl from "./chernobyl";
import Alerta from "../../../sistema_de_control/alertas/alerta";
import GeneradorDeAlertaCritica from "../../../sistema_de_control/alertas/generador_alerta_critica";
import { Constantes } from "../constantes_reactor";
import RegistroEstados from "../../../sistema_de_control/registros/registroEstados";
import EncenderError from "../../../errores/errores_central_nuclear/errores_de_los_estados_del_reactor/error_estado_emergencia/error_encender";
import Reactor from "../reactor";
import RegistroEnergiaGenerada from "../../../sistema_de_control/registros/registro_energia_generada";

export default class REmergencia extends EstadoReactor {
  private _registroEnergia: RegistroEnergiaGenerada = RegistroEnergiaGenerada.instancia;
  private _timerGeneracion: NodeJS.Timeout | null = null;

  constructor(r: Reactor) {
    super(r);
    this.crearTimeoutEnergia(120000);
  }

  override verificarEstado(): void {
    const tempActual = this._reactor.getTemperatura();
    if (tempActual < Constantes.TEMP_MINIMA_EMERGENCIA) {
      this.cambiarAEstadoCritico();
    } else if (tempActual >= Constantes.TEMP_CHERNOBYL) {
      this.cambiarAEstadoChernobyl();
    }
  }

  private crearTimeoutEnergia(frecuencia: number): void {
    this._timerGeneracion = setTimeout(() => {
      this.liberarEnergia();
      this.resetTimeOutEnergia(frecuencia);
    }, frecuencia);
  }

  private cambiarAEstadoCritico() {
    let estado: EstadoReactor = new RCritico(this._reactor);
    this._reactor.cambiarEstado(estado);
    RegistroEstados.instancia.aumentarRegistro(estado);
  }

  private cambiarAEstadoChernobyl() {
    let estado: EstadoReactor = new Chernobyl(this._reactor);
    this._reactor.cambiarEstado(estado);
  }

  override encender() {
    throw new EncenderError(Constantes.MENSAJE_ENCENDIDO);
  }

  override apagar() {
    let estado: EstadoReactor = new RApagado(this._reactor);
    this._reactor.cambiarEstado(estado);
  }

  override estaEncendido() {
    return true;
  }

  override generarAlerta(): Alerta {
    return GeneradorDeAlertaCritica.generarAlerta();
  }

  override toString(): string {
    return Constantes.MENSAJE_ESTADO_EMERGENCIA;
  }

  public liberarEnergia(): void {
    const energiaGenerada: number = this.obtenerEnergiaNeta();
    this._registroEnergia.insertarRegistro(energiaGenerada);
  }

  override obtenerEnergiaNeta(): number {
    let energia = super.obtenerEnergiaNeta();
    return (energia -= energia * 0.8);
  }

  private resetTimeOutEnergia(frecuencia: number): void {
    this.eliminarTimeOut(this._timerGeneracion);
    this.crearTimeoutEnergia(frecuencia);
  }
}
