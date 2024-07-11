import IEncendible from "../../interfaces/iencendible";
import Reactor from "../reactor";
import Alerta from "../../../sistema_de_control/alertas/alerta";
import { Constantes } from "../constantes_reactor";
import BarraControl from "../../barras_control/barra_control";
import EnergiaNetaCalculationError from "../../../errores/errores_central_nuclear/errores_reaccion/error_energia/energia_neta_calculation_error";
import Energia from "../reaccion/energia";
import AdministradorBarras from "../administrador/administrador_barras";
export default abstract class EstadoReactor implements IEncendible {
  protected _reactor: Reactor;
  constructor(r: Reactor) {
    this._reactor = r;
  }
  public obtenerEnergiaNeta(): number {
    let energiaNeta = 0;
    try {
      energiaNeta = Energia.calcularEnergiaNeta(
        this._reactor.obtenerEnergiaTermal()
      );
    } catch (error) {
      if (error instanceof EnergiaNetaCalculationError) {
        console.log("Error específico de energía neta:", error.message);
      } else {
        console.log("Error genérico:", error.message);
      }
    }
    return energiaNeta;
  }
  public abstract encender(): void;
  public abstract apagar(): void;
  public abstract estaEncendido(): boolean;
  public setReactor(reactor: Reactor): void {
    this._reactor = reactor;
  }
  public abstract verificarEstado(): void;
  public generarAlerta(): Alerta | null {
    return null;
  }
  public puedeInsertarBarras(): boolean {
    return true;
  }
  protected eliminarTimeOut(timerCancelar: NodeJS.Timeout | null): void {
    if (timerCancelar !== null) {
      clearTimeout(timerCancelar);
    }
  }
}