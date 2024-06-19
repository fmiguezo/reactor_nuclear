import IActivable from "../Interfaces/IActivable";
import Reactor from "../Reactor/Reactor";

export default interface ISensor extends IActivable {
  estaActivo(): boolean;
  activar(): void;
  desactivar(): void;
  actualizar(reactor: Reactor): void;
  obtenerValor(): number;
}
