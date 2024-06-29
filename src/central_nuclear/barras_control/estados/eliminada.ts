import EstadoBarraControl from "./estado_barra_control";
import { Constantes } from "../constantes";

export default class Eliminada extends EstadoBarraControl {
  override estaActivo(): boolean {
    return false;
  }

  override activar(): void {
    throw new Error(Constantes.MENSAJE_BARRA_VENCIDA);
  }

  override desactivar(): void {
    throw new Error(Constantes.MENSAJE_BARRA_VENCIDA);
  }

  override calcPctBarra(): number {
    return 0;
  }
}

