import BarraControl from "../barra_control";
import IMecanismoDeControl from "../../interfaces/imecanismo_control";
export default abstract class EstadoBarraControl implements IMecanismoDeControl {
  protected _barraControl!: BarraControl;
  public setBarraControl(barra: BarraControl): void {
    this._barraControl = barra;
  }
  public getBarraControl(): BarraControl {
    return this._barraControl;
  }
  public abstract estaActivo(): boolean;
  public abstract activar(): void;
  public abstract desactivar(): void;
  public abstract calcPctBarra(): number;
}
