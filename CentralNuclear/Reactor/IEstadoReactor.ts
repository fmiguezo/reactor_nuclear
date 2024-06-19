import IEncendible from "./IEncendible";
import Reactor from "./Reactor";

export default abstract class IEstadoReactor implements IEncendible {
  protected static readonly INCREMENTO_POR_MINUTO: number = 25;
  protected contexto: Reactor;

  constructor() {}

  public abstract calcularEnergia(temperatura: number): number;
  public abstract encender(): void;
  public abstract apagar(): void;
  public abstract estaEncendido(): boolean;

  public cargaContexto(context): void {
    this.contexto = context;
  }

  public incrementarTemperatura(): void {
    this.contexto.setTemperatura(IEstadoReactor.INCREMENTO_POR_MINUTO + this.contexto.getTemperatura());
    this.contexto.notificarSensores();
  }

  public abstract verificaEstado(): void;
}
