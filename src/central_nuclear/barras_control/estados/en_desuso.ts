import EstadoBarraControl from "./estado_barra_control";
import Insertada from "./insertada";

export default class EnDesuso extends EstadoBarraControl {
  override estaActivo(): boolean {
    return false;
  }

  override activar(): void {
    let nuevoEstado: EstadoBarraControl = new Insertada();
    this._barraControl.cambiarEstado(nuevoEstado);
  }

  override desactivar(): void {
    throw new Error(MENSAJE_BARRA_DESACTIVADA);
  }

  override calcPctBarra(): number {
    return (this._barraControl.getVidaUtilRestante() / VIDA_UTIL_BARRA) * MULTIPLICADOR_FORMULA_BARRA;
  }
}
