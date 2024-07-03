import EstadoBarraControl from "./estado_barra_control";
import { Constantes } from "../constantes";
import Registro from "../../../sistema_de_control/registros/registro";
import RegistroBarrasUsadas from "../../../sistema_de_control/registros/registro_barras_usadas";
import ActivarError from "../../../errores/errores_barras_de_control/error_estado_eliminada/activar_error";
import DesactivarError from "../../../errores/errores_barras_de_control/error_estado_eliminada/desactivar_error";
export default class Eliminada extends EstadoBarraControl {
  private _RegistroBarrasUsadas: Registro = RegistroBarrasUsadas.instancia;

  constructor() {
    super();
    this.reportarVencimiento;
  }

  override estaActivo(): boolean {
    return false;
  }

  override activar(): void {
    throw new ActivarError(Constantes.MENSAJE_BARRA_VENCIDA);
  }

  override desactivar(): void {
    throw new DesactivarError(Constantes.MENSAJE_BARRA_VENCIDA);
  }

  override calcPctBarra(): number {
    return 0;
  }

  private reportarVencimiento(): void {
    this._RegistroBarrasUsadas.insertarRegistro(1);
  }
}
