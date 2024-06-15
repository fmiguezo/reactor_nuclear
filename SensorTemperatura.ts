import ISensor from "./ISensor";

export default class SensorTemperatura implements ISensor {
  private _activo: boolean = true;
  private _ultimaTemperatura: number = 0;

  public get activo(): boolean {
    return this._activo;
  }

  public set activo(value: boolean) {
    this._activo = value;
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
    if (!this._activo) {
      throw new Error("El sensor no está activo");
    }
    this._ultimaTemperatura = temperatura;
  }

  public obtenerValor(): number {
    return this._ultimaTemperatura;
  }
}
