import ISensor from "./ISensor";

export default class SensorTemperatura implements ISensor {
  private activo: boolean = true;
  private temperatura: number = 50;
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

  public obtenerValores(): number {
    if (this.activo) {
      this.temperatura += SensorTemperatura.INCREMENTO_POR_MINUTO;
      this.notificar();
      return this.temperatura;
    } else {
      throw new Error("El sensor de temperatura está desactivado");
    }
  }
}

// hay que repensar la relacion entre sensor y reactor para que pueda actualizar la temperatura en el reactor, sea usando composicion u otra implementacion
