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

    public desactivar(): void {
        this._activo = false;
    }

    public actualizarValor(energiaPRoducida:number): void {
        if (this._activo) {
            this._energiaProducida = energiaPRoducida;
        } else {
            throw new Error("El sensor no está activo");
        }
    }

    obtenerValor(): number {
        throw new Error("Method not implemented.");
    }

}
