import IActivable from "./IActivable";

export default interface ISensor extends IActivable {
  estaActivo(): boolean;
  activar(): void;
  desactivar(): void;
  obtenerValores(): number;

  // Métodos para el patrón Observer
  agregarObservador(observador: IActivable): void;
  eliminarObservador(observador: IActivable): void;
  notificar(): void;
}
