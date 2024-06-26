import EnDesuso from "./EnDesuso";
import Eliminada from "./Eliminada";
import EstadoBarraControl from "./EstadoBarraControl";

export default class Insertada extends EstadoBarraControl {
  override estaActivo(): boolean {
    return true;
  }

  override activar(): void {
    console.log("La barra ya estaba insertada");
  }

  override desactivar(): void {
    let nuevoEstado: EstadoBarraControl = new EnDesuso();
    this._BarraControl.cambiarEstado(nuevoEstado);
  }

  private expirar(): void {
    let nuevoEstado: EstadoBarraControl = new Eliminada();
    this._BarraControl.cambiarEstado(nuevoEstado);
  }
}
