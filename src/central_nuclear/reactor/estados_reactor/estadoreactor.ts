import IEncendible from "../../interfaces/iencendible";
import Reactor from "../reactor";
import Alerta from "../../../sistema_de_control/alertas/alerta";
import { Constantes } from "../constantes";
import BarraControl from "../../barras_control/barra_control";

export default abstract class EstadoReactor implements IEncendible {
  protected _incrementoTemp: number = Constantes.INCREMENTO_POR_MINUTO;
  protected _reactor: Reactor;
  protected _timerTemp: NodeJS.Timeout | null = null;

  constructor(r: Reactor) {
    this._reactor = r;
    this.crearTimeOutTemp(300000);
  }

  public abstract calcularEnergia(temperatura: number): number;
  public abstract encender(): void;
  public abstract apagar(): void;
  public abstract estaEncendido(): boolean;

  public setReactor(reactor: Reactor): void {
    this._reactor = reactor;
  }

  public incrementarTemperatura(): void {
    this._reactor.setTemperatura(this._incrementoTemp + this._reactor.getTemperatura());
    this._reactor.notificarSensores();
  }

  public abstract verificarEstado(): void;

  public generarAlerta(): Alerta | null {
    return null;
  }

  protected crearTimeOutTemp(frecuencia: number = 300000): void {
    this._timerTemp = setTimeout(() => {
      this.modificarTemperatura();
      this.resetTimeOutTemp(frecuencia);
    }, frecuencia);
  }
  private resetTimeOutTemp(frecuencia: number = 300000): void {
    this.eliminarTimeOut(this._timerTemp);
    this.crearTimeOutTemp(frecuencia);
  }

  protected eliminarTimeOut(timerCancelar: NodeJS.Timeout | null): void {
    if (timerCancelar !== null) {
      clearTimeout(timerCancelar);
    }
  }

  public calcValorEnfriamiento(): number {
    const barrasInsertadas: BarraControl[] = this._reactor.getAdministradorBarras().getBarrasInsertadas();
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
  }

  public puedeInsertarBarras(): boolean {
    return true;
  }
}
