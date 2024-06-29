import EstadoBarraControl from "./estado_barra_control";
import Insertada from "./insertada";
import { Constantes } from "../constantes";

export default class EnDesuso extends EstadoBarraControl {
  override estaActivo(): boolean {
    return false;
  }

  override activar(): void {
    let nuevoEstado: EstadoBarraControl = new Insertada();
    this._barraControl.cambiarEstado(nuevoEstado);
  }

  override desactivar(): void {
    throw new Error(Constantes.MENSAJE_BARRA_DESACTIVADA);
  }

  override calcPctBarra(): number {
    return (
      (this._barraControl.getVidaUtilRestante() / Constantes.VIDA_UTIL_BARRA) *
      Constantes.MULTIPLICADOR_FORMULA_BARRA
    );
  }
}
