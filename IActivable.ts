export default interface IActivable  
{
    estaActivo(): boolean;
    activar(): void;
    desactivar(): void;
}