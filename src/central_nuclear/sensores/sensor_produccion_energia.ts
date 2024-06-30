import Reactor from "../reactor/reactor";
import ISensor from "../interfaces/isensor";
import { Constantes } from "./constantes";

export default class SensorProduccionDeEnergia implements ISensor {
  private _activo: boolean = true;
  private _energiaProducida: number = 0;

  public getActivo(): boolean {
    return this._activo;
  }

  public setActivo(value: boolean) {
    this._activo = value;
  }

  public setEnergiaProducida(value: number) {
    this._energiaProducida = value;
  }

  public obtenerValor(): number {
    return this._energiaProducida;
  }

  estaActivo(): boolean {
    return this._activo;
  }

  public activar(): void {
    this._activo = true;
  }

  public desactivar(): void {
    this._activo = false;
  }

  public actualizar(reactor: Reactor): void {
    if (!this._activo) {
      throw new Error(Constantes.MENSAJE_SENSOR_INACTIVO);
    } else {
      this._energiaProducida = reactor.obtenerEnergiaNeta();
    }
  }
}
