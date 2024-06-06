export default interface ISensor extends IActivable {

    estaActivo(): boolean;
    activar(): void;
    desactivar(): void;
    obtenerValores(): number;

}