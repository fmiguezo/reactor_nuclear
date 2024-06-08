import { EstadoReactor } from "./EstadoReactor";
import IMecanismoDeControl from "./IMecanismoDeControl";
import ISensor from "./ISensor";
import SensorProduccionDeEnergia from "./SensorProduccionDeEnergia";
import SensorTemperatura from "./SensorTemperatura";

export default class Reactor {
  private idReactor: string = "";
  private estado: EstadoReactor;
  private mecanimosDeControl: IMecanismoDeControl[] = [];
  private sensorTemp: SensorTemperatura = new SensorTemperatura();
  private sensorEnergia: SensorProduccionDeEnergia = new SensorProduccionDeEnergia();
  private temperatura: number = 0;
  private static readonly INCREMENTO_POR_MINUTO: number = 25;

  public encender(): void {
    this.estado = EstadoReactor.ENCENDIDO;
  }

  public apagar(): void {
    this.estado = EstadoReactor.APAGADO;
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

  public getEstado(): EstadoReactor {
    return this.estado;
  }

  public agregarMecanismoDeControl(mecanismoDeControl: IMecanismoDeControl): void {
    this.mecanimosDeControl.push(mecanismoDeControl);
  }

  public eliminarMecanismoDeControl(mecanismoDeControl: IMecanismoDeControl): void {
    this.mecanimosDeControl = this.mecanimosDeControl.filter((mecanismo) => mecanismo !== mecanismoDeControl);
  }

  public notificarSensores(): void {
    this.sensorTemp.actualizarValor(this.temperatura);
  }
}
