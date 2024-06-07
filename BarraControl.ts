import IMecanismoControl from "./IMecanismoControl";
import { EstadoBarraDeControl } from "./EstadoBarraDeControl";

export default class BarraControl implements IMecanismoControl {
  private _material: string;
  private _estado: EstadoBarraDeControl;
  private _tiempoVidaUtilTotal: number;

  constructor(
    material: string,
    tiempoVidaUtilTotal: number = 200,
    estado: EstadoBarraDeControl = EstadoBarraDeControl.EN_DESUSO
  ) {
    this._material = material;
    this._tiempoVidaUtilTotal = tiempoVidaUtilTotal;
    this._estado = estado;
  }

  // Getters
  estaActivo(): boolean {
    const activoMap: Map<EstadoBarraDeControl, boolean> = new Map([
      [EstadoBarraDeControl.EN_DESUSO, false],
      [EstadoBarraDeControl.ELIMINADA, false],
      [EstadoBarraDeControl.INSERTADA, true],
    ]);
    return activoMap.get(this._estado) ?? false;
  }

  getPercBarra(): number {
    return this.calcPrcBarra();
  }

  // Setters
  private set estado(nuevoEstado: EstadoBarraDeControl) {
    this._estado = nuevoEstado;
  }

  // Otros Metodos

  private revisaSiPuedeActivar(): boolean {
    return this._estado != EstadoBarraDeControl.ELIMINADA;
  }

  activar(): void {
    if (this.revisaSiPuedeActivar()) {
      this.estado = EstadoBarraDeControl.INSERTADA;
    } else throw new Error("Barra inactivable");
  }

  desactivar(): void {
    this.estado = EstadoBarraDeControl.EN_DESUSO;
  }

  private calcPrcBarra(): number {
    return (this._tiempoVidaUtilTotal / 3600) * 100;
  }
}
