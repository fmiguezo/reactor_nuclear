import EstadoBarraControl from "./estado_barra_control";
import { Constantes } from "../constantes";
import Registro from "../../../sistema_de_control/registros/registro";
import RegistroBarrasUsadas from "../../../sistema_de_control/registros/registro_barras_usadas";
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
    throw new Error(Constantes.MENSAJE_BARRA_VENCIDA);
  }

  override desactivar(): void {
    throw new Error(Constantes.MENSAJE_BARRA_VENCIDA);
  }

  override calcPctBarra(): number {
    return 0;
  }

  private reportarVencimiento(): void {
    this._RegistroBarrasUsadas.insertarRegistro(1);
  }
}
