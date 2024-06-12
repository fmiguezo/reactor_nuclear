import ISensor from "./ISensor";

export default class SensorProduccionDeEnergia implements ISensor{
    private _activo: boolean = true;
    private _energiaProducida: number;
    estaActivo(): boolean {
       return this._activo;
    }
    
    public activar(): void {
        this._activo = true;
    }

    desactivar(): void {
        throw new Error("Method not implemented.");
    }
    actualizarValor(valor: number): void {
        throw new Error("Method not implemented.");
    }
    obtenerValor(): number {
        throw new Error("Method not implemented.");
    }




}
