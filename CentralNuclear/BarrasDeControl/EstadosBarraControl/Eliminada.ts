import EstadoBarraControl from "./EstadoBarraControl";

export default class Eliminada extends EstadoBarraControl {
  override estaActivo(): boolean {
    return false;
  }

  override activar(): void {
    console.log("La barra está vencida. No puede utilizarse.");
  }

  override desactivar(): void {
    console.log("La barra está vencida. No puede utilizarse.");
  }
}
