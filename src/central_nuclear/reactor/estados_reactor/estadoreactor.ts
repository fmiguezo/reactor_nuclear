import IEncendible from "../../interfaces/iencendible";
import Reactor from "../reactor";

export default abstract class EstadoReactor implements IEncendible {
  protected static readonly INCREMENTO_POR_MINUTO: number = 25;
  protected contexto: Reactor;

  constructor(r: Reactor) {
    this.contexto = r;
  }

  public abstract calcularEnergia(temperatura: number): number;
  public abstract encender(): void;
  public abstract apagar(): void;
  public abstract estaEncendido(): boolean;

  public cargaContexto(contexto: Reactor): void {
    this.contexto = contexto;
  }

  public incrementarTemperatura(): void {
    this.contexto.setTemperatura(EstadoReactor.INCREMENTO_POR_MINUTO + this.contexto.getTemperatura());
    this.contexto.notificarSensores();
  }

  public abstract verificaEstado(): void;
}
