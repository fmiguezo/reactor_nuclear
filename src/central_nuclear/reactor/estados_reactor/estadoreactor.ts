import IEncendible from "../../interfaces/iencendible";
import Reactor from "../reactor";

export default abstract class EstadoReactor implements IEncendible {
  protected _incrementoTemp: number = INCREMENTO_POR_MINUTO;
  protected _reactor: Reactor;

  constructor(r: Reactor) {
    this._reactor = r;
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

  public abstract verificaEstado(): void;
}
