import IMecanismoControl from "./IMecanismoControl";
import { EstadoBarraDeControl } from "./EstadoBarraDeControl";

export default class BarraControl implements IMecanismoControl {
  private _material: string;
  private _estado: EstadoBarraDeControl = EstadoBarraDeControl.EN_DESUSO;
  private _tiempoVidaUtilTotal: number = 200;

  constructor() {}

  // Getters
  estaActivo(): boolean {
    const activoMap: Map<EstadoBarraDeControl, boolean> = new Map([
      [EstadoBarraDeControl.EN_DESUSO, false],
      [EstadoBarraDeControl.ELIMINADA, false],
      [EstadoBarraDeControl.INSERTADA, true],
    ]);
    return activoMap.get(this._estado) ?? false;
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

  enfriarReactor(): void {
    /* Idea para implementar:
        let temperatura: number = getReactorTemperatura();
        tem
        */
  }
}
