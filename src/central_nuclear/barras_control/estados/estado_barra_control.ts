import BarraControl from "../barra_control";
import IMecanismoDeControl from "../../interfaces/imecanismo_control";

export default abstract class EstadoBarraControl implements IMecanismoDeControl {
  protected _BarraControl!: BarraControl;

  public setBarraControl(barra: BarraControl): void {
    this._BarraControl = barra;
  }

  public abstract estaActivo(): boolean;
  public abstract activar(): void;
  public abstract desactivar(): void;
  public abstract calcPctBarra(): number;
}
