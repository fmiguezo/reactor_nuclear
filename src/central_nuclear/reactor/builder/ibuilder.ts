import PlantaNuclear from "../../../planta_nuclear";
import AdministradorBarras from "../administrador/administrador_barras";
import Reactor from "../reactor";

export default interface IBuilder {
  reset(): void;
  setAdminBarras(): void;
  setBarras(): void;
  setSensores(): void;
  setPlantaNuclear(plantaNuclear: PlantaNuclear): void;
  getReactor(): Reactor;
  setEstadoIncial(): void;
}
