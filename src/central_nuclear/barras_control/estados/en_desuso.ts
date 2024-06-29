import EstadoBarraControl from "./estado_barra_control";
import Insertada from "./insertada";

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

  override calcPctBarra(): number {
    return (this._BarraControl.VidaUtilRestante / 3600) * 100;
  }
}
