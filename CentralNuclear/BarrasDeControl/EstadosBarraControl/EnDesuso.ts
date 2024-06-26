import EstadoBarraControl from "./EstadoBarraControl";
import Insertada from "./Insertada";

export default class EnDesuso extends EstadoBarraControl {
  override estaActivo(): boolean {
    return false;
  }

  override activar(): void {
    let nuevoEstado: EstadoBarraControl = new Insertada();
    this._BarraControl.cambiarEstado(nuevoEstado);
  }

  override desactivar(): void {
    console.log("La barra ya estaba desactivada");
  }
}
