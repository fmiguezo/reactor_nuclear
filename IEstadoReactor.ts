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
    contexto.temperatura += IEstadoReactor.INCREMENTO_POR_MINUTO;
    contexto.notificarSensores();
  }

  public abstract verificaEstado(): void;
}
