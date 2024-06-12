import { RApagado from "./EstadosReactor/RApagado.ts";
import IEstadoReactor } from "./IEstadoReactor.ts";
import IMecanismoDeControl from "./IMecanismoDeControl";
import ISensor from "./ISensor";
import SensorProduccionDeEnergia from "./SensorProduccionDeEnergia";
import SensorTemperatura from "./SensorTemperatura";

export default class Reactor {
  private idReactor: string = "";
  private estado: IEstadoReactor;
  private mecanimosDeControl: IMecanismoDeControl[] = [];
  private sensorTemp: SensorTemperatura = new SensorTemperatura();
  private sensorEnergia: SensorProduccionDeEnergia = new SensorProduccionDeEnergia();
  private temperatura: number = 0;
  private static readonly INCREMENTO_POR_MINUTO: number = 25;

  constructor(estado: IEstadoReactor = new RApagado()) {}
  public encender(): void {
    this.estado.encender();
  }

  public apagar(): void {
    this.estado.apagar();
  }

  public getTemperatura(): number {
    return this.temperatura;
  }

  public incrementarTemperatura(): void {
    if (this.estado === EstadoReactor.ENCENDIDO) {
      this.temperatura += Reactor.INCREMENTO_POR_MINUTO;
      this.notificarSensores();
    }
  }

  public actualizarTemperatura(): void {
    // TO-DO
  }

  public getIdReactor(): string {
    return this.idReactor;
  }

  public getEstado() {
    return this.estado.estaEncendido();
  }

  public cambiarEstado(state: IEstadoReactor): void {
    console.log("Cambiando estado");
    this.estado = state;
    this.estado.cargaContexto(this);
  }

  public agregarMecanismoDeControl() (
    mecanismoDeControl: IMecanismoDeControl
  ): void {
    this.mecanimosDeControl.push(mecanismoDeControl);
  }

  public eliminarMecanismoDeControl() (
    mecanismoDeControl: IMecanismoDeControl
  ): void {
    this.mecanimosDeControl = this.mecanimosDeControl.filter(
      (mecanismo) => mecanismo !== mecanismoDeControl
    );
  }

  public notificarSensores(): void {
    this.sensorTemp.actualizarValor(this.temperatura);
  }
}
