import IEncendible from "../../interfaces/iencendible";
import Reactor from "../reactor";
import Alerta from "../../../sistema_de_control/alertas/alerta";
import { Constantes } from "../constantes_reactor";
import BarraControl from "../../barras_control/barra_control";
import EnergiaNetaCalculationError from "../../../errores/errores_central_nuclear/errores_reaccion/error_energia/energia_neta_calculation_error";
import Energia from "../reaccion/energia";

export default abstract class EstadoReactor implements IEncendible {
  protected _reactor: Reactor;
  protected _timerTemp: NodeJS.Timeout | null = null;

  constructor(r: Reactor) {
    this._reactor = r;
    this.crearTimeOutTemp(120000);
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

  protected crearTimeOutTemp(frecuencia: number): void {
    this._timerTemp = setTimeout(() => {
      this.modificarTemperatura();
      this.resetTimeOutTemp(frecuencia);
    }, frecuencia);
  }
  private resetTimeOutTemp(frecuencia: number): void {
    this.eliminarTimeOut(this._timerTemp);
    this.crearTimeOutTemp(frecuencia);
  }

  protected eliminarTimeOut(timerCancelar: NodeJS.Timeout | null): void {
    if (timerCancelar !== null) {
      clearTimeout(timerCancelar);
    }
  }

  public calcValorEnfriamiento(): number {
    const barrasInsertadas: BarraControl[] = this._reactor
      .getAdministradorBarras()
      .getBarrasInsertadas();
    let valorEnfriamiento: number = 0;
    barrasInsertadas.forEach((b) => {
      valorEnfriamiento += b.getPctBarra();
    });

    return valorEnfriamiento;
  }

  public modificarTemperatura(): void {
    let nuevaTemp: number = this._reactor.getTemperatura();
    nuevaTemp += 100;
    nuevaTemp -= this.calcValorEnfriamiento();
    this._reactor.setTemperatura(nuevaTemp);
    this.verificarEstado();
  }

  public puedeInsertarBarras(): boolean {
    return true;
  }
}
