import EstadoReactor from "./estadoreactor";
import RApagado from "./apagado";
import RCritico from "./critico";
<<<<<<< HEAD
import RegistroEnergiaGenerada from "../../../sistema_de_control/registros/registro_energia_generada";
import Reactor from "../reactor";

=======
import { Constantes } from "../constantes";
>>>>>>> develop
export default class RNormal extends EstadoReactor {
  private _registroEnergia: RegistroEnergiaGenerada =
    RegistroEnergiaGenerada.instancia;

  private _timerGeneracion: NodeJS.Timeout | null = null;

  constructor(r: Reactor) {
    super(r);
    this.crearTimeOut();
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

  override calcularEnergia(temperatura: number = 0): number {
    return 0;
  }

  override verificarEstado(): void {
    const tempActual = this._reactor.getTemperatura();
    if (tempActual < Constantes.TEMP_MINIMA_NORMAL) {
      this.apagar();
    } else if (tempActual >= Constantes.TEMP_MAXIMA_NORMAL) {
      this.cambiarAEstadoCritico();
    }
  }

  private cambiarAEstadoCritico() {
    this.eliminarTimeOut();
    let estado: EstadoReactor = new RCritico(this._reactor);
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

<<<<<<< HEAD
  public liberarEnergia(): void {
    const energiaGenerada: number = this._reactor.obtenerEnergiaNeta();
    this._registroEnergia.insertarRegistro(energiaGenerada);
=======
  override toString(): string {
    return Constantes.MENSAJE_ESTADO_NORMAL;
>>>>>>> develop
  }
}
