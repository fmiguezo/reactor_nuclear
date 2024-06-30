import PlantaNuclear from "../../../planta_nuclear";
import Reactor from "../reactor";
import IBuilder from "./ibuilder";
export default class DirectorBuildReactor {
  private _builder: IBuilder;
  private _plantaNuclear!: PlantaNuclear;

  constructor(builder: IBuilder) {
    this._builder = builder;
  }

  public cargarPlantaNuclear(plantaNuclear: PlantaNuclear): void {
    this._plantaNuclear = plantaNuclear;
  }

  public buildReactorNormal(): Reactor {
    this._builder.reset();
    this._builder.setAdminBarras();
    this._builder.setBarras();
    this._builder.setSensores();
    this._builder.setPlantaNuclear(this._plantaNuclear);
    this._builder.setEstadoIncial();
    return this._builder.getReactor();
  }

  public cambiarBuilder(builder: IBuilder): void {
    this._builder = builder;
  }
}
