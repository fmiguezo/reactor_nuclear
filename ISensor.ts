import IActivable from "./IActivable";

export default interface ISensor extends IActivable {
  estaActivo(): boolean;
  activar(): void;
  desactivar(): void;
  actualizarValor(valor: number): void;
  obtenerValor(): number;
}
