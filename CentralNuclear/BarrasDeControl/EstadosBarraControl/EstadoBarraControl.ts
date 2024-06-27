import BarraControl from "../BarraControl";
import IMecanismoDeControl from "../../Interfaces/IMecanismoDeControl";

export default abstract class EstadoBarraControl
  implements IMecanismoDeControl
{
  protected _BarraControl!: BarraControl;

  public setBarraControl(barra: BarraControl): void {
    this._BarraControl = barra;
  }

  public abstract estaActivo(): boolean;
  public abstract activar(): void;
  public abstract desactivar(): void;
}
