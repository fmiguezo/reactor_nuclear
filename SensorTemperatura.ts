import ISensor from "./ISensor";
import Reactor from "./Reactor";

export default class SensorTemperatura implements ISensor {
  private _activo: boolean;
  private _ultimaTemperatura: number;

  public constructor()
  {
    this._activo = true;
    this._ultimaTemperatura = 0
  }

  public get activo(): boolean {
    return this._activo;
  }

  public set activo(value: boolean) {
    this._activo = value;
  }

  public get ultimaTemperatura(): number {
    return this._ultimaTemperatura;
  }

  public set ultimaTemperatura(value: number) {
    this._ultimaTemperatura = value;
  }

  public estaActivo(): boolean {
    return this._activo;
  }

  public activar(): void {
    this._activo = true;
  }

  public desactivar(): void {
    this._activo = false;
  }

  public actualizarValor(temperatura: number): void {
    if (this._activo) {
      this._ultimaTemperatura = temperatura;
    } else {
      throw new Error("El sensor no está activo");
    }
  }

  public obtenerValor(): number {
    return this._ultimaTemperatura;
  }
}
