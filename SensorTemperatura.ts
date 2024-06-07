import ISensor from "./ISensor";
import Reactor from "./Reactor";

export default class SensorTemperatura implements ISensor {
  private activo: boolean = true;
  private ultimaTemperatura: number = 0;
  private static readonly INCREMENTO_POR_MINUTO: number = 25;

  public estaActivo(): boolean {
    return this.activo;
  }

  public activar(): void {
    this.activo = true;
  }

  public desactivar(): void {
    this.activo = false;
  }

  public actualizarValor(valor: number): void {
    this.ultimaTemperatura = valor;
  }

  public obtenerValor(): number {
    return this.ultimaTemperatura;
  }
}
