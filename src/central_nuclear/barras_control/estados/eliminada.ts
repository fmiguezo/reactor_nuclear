import EstadoBarraControl from "./estado_barra_control";

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

  override calcPctBarra(): number {
    return 0;
  }
}
