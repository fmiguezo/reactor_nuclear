import PlantaNuclear from "../../../planta_nuclear";
import ISensor from "../../interfaces/isensor";
import SensorProduccionDeEnergia from "../../sensores/sensor_produccion_energia";
import SensorTemperatura from "../../sensores/sensor_temperatura";
import AdministradorBarras from "../administrador/administrador_barras";
import RApagado from "../estados_reactor/apagado";
import Reactor from "../reactor";
import IBuilder from "./ibuilder";

export default class BuilderReactorNormal implements IBuilder {
  private _nuevoReactor!: Reactor;

  public reset(): void {
    this._nuevoReactor = new Reactor();
  }

  public setAdminBarras(): void {
    this._nuevoReactor.setAdministradorBarras(new AdministradorBarras());
  }

  public setBarras(): void {
    this._nuevoReactor.getAdministradorBarras().cargarBarras(10, "cadmio");
  }

  public setSensores(): void {
    this._nuevoReactor.agregarSensor(new SensorTemperatura());
    this._nuevoReactor.agregarSensor(new SensorProduccionDeEnergia());
  }

  public setPlantaNuclear(plantaNuclear: PlantaNuclear): void {
    this._nuevoReactor.setPlantaNuclear(plantaNuclear);
  }

  public getReactor(): Reactor {
    return this._nuevoReactor;
  }

  public setEstadoIncial(): void {
    this._nuevoReactor.setEstado(new RApagado(this._nuevoReactor));
  }
}
