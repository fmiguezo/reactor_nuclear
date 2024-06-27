import EnDesuso from "./EnDesuso";
import Eliminada from "./Eliminada";
import EstadoBarraControl from "./EstadoBarraControl";
import BarraControl from "../BarraControl";

export default class Insertada extends EstadoBarraControl {
  private fechaInsertada: Date;
  private timeoutBarra: NodeJS.Timeout | null = null;
  constructor() {
    super();
    this.fechaInsertada = new Date();
  }

  override setBarraControl(barra: BarraControl): void {
    this._BarraControl = barra;
    let tiempoRestanteBarra: number = this._BarraControl.VidaUtilRestante;
    this.crearTimeOut(tiempoRestanteBarra);
  }

  override estaActivo(): boolean {
    return true;
  }

  override activar(): void {
    console.log("La barra ya estaba insertada");
  }

  override desactivar(): void {
    if (this.timeoutBarra !== null) {
      clearTimeout(this.timeoutBarra);
    }
    this.actualizarVidaRestanteBarra();
    let nuevoEstado: EstadoBarraControl = new EnDesuso();
    this._BarraControl.cambiarEstado(nuevoEstado);
  }

  private calcDiffTiempoActual(): number {
    let tiempoActual = new Date();
    let diferencia = tiempoActual.getTime() - this.fechaInsertada.getTime();
    return diferencia;
  }

  private actualizarVidaRestanteBarra(): void {
    const tiempoTranscurrido = this.calcDiffTiempoActual();
    this._BarraControl.VidaUtilRestante -= tiempoTranscurrido;
    if (this._BarraControl.VidaUtilRestante <= 0) {
      this._BarraControl.VidaUtilRestante = 0;
      this.expirar();
    }
  }

  private crearTimeOut(vidaRestante: number): void {
    this.timeoutBarra = setTimeout(() => {
      this.expirar();
    }, vidaRestante);
  }

  private expirar(): void {
    let nuevoEstado: EstadoBarraControl = new Eliminada();
    this._BarraControl.cambiarEstado(nuevoEstado);
  }
}
