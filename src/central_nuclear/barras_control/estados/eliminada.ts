import EstadoBarraControl from "./estado_barra_control";

export default class Eliminada extends EstadoBarraControl {
  override estaActivo(): boolean {
    return false;
  }

  override activar(): void {
    throw new Error(MENSAJE_BARRA_VENCIDA);
  }

  override desactivar(): void {
    throw new Error(MENSAJE_BARRA_VENCIDA);
  }

  override calcPctBarra(): number {
    return 0;
  }
}
