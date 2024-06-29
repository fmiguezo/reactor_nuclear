import IActivable from "./iactivable";
import Reactor from "../reactor/reactor";

export default interface ISensor extends IActivable {
  estaActivo(): boolean;
  activar(): void;
  desactivar(): void;
  actualizar(reactor: Reactor): void;
  obtenerValor(): number;
}
