import ISensor from "./ISensor";
import Reactor from "./Reactor";

export default class SensorTemperatura implements ISensor {
  private activo: boolean = true;
  private ultimaTemperatura: number = 0;

  public estaActivo(): boolean {
    return this.activo;
  }

  public activar(): void {
    this.activo = true;
  }

  public desactivar(): void {
    this.activo = false;
  }

  public actualizarValor(temperatura: number): void {
    if (this.activo) {
      this.ultimaTemperatura = temperatura;
    } else {
      throw new Error("El sensor no está activo");
    }
  }

  public obtenerValor(): number {
    return this.ultimaTemperatura;
  }
}
