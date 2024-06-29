import EnDesuso from "./en_desuso";
import Eliminada from "./eliminada";
import EstadoBarraControl from "./estado_barra_control";
import BarraControl from "../barra_control";

export default class Insertada extends EstadoBarraControl {
  private fechaInsertada: Date;
  private timeoutBarra: NodeJS.Timeout | null = null;

  constructor() {
    super();
    this.fechaInsertada = new Date();
  }

  override setBarraControl(barra: BarraControl): void {
    this._barraControl = barra;
    let tiempoRestanteBarra: number = this._barraControl.getVidaUtilRestante();
    this.crearTimeOut(tiempoRestanteBarra);
  }

  override estaActivo(): boolean {
    return true;
  }

  override activar(): void {
    throw new Error(MENSAJE_BARRA_INSERTADA);
  }

  override desactivar(): void {
    if (this.timeoutBarra !== null) {
      clearTimeout(this.timeoutBarra);
    }
    this.actualizarVidaRestanteBarra();
    let nuevoEstado: EstadoBarraControl = new EnDesuso();
    this._barraControl.cambiarEstado(nuevoEstado);
  }

  override calcPctBarra(): number {
    return (this._barraControl.getVidaUtilRestante() / 3600) * 100;
  }

  private calcDiffTiempoActual(): number {
    let tiempoActual = new Date();
    let diferencia = tiempoActual.getTime() - this.fechaInsertada.getTime();
    return diferencia;
  }

  private actualizarVidaRestanteBarra(): void {
    const tiempoTranscurrido = this.calcDiffTiempoActual();
    this._barraControl.setVidaUtilRestante(this._barraControl.getVidaUtilRestante() - tiempoTranscurrido);
    if (this._barraControl.getVidaUtilRestante() <= 0) {
      this._barraControl.setVidaUtilRestante(0);
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
    this._barraControl.cambiarEstado(nuevoEstado);
  }
}
