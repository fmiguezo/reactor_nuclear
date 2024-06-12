import ISensor from "./ISensor";

export default class SensorProduccionDeEnergia implements ISensor{
   
    private _activo: boolean = true;
    private _energiaProducida: number = 0;

    public get activo(): boolean {
        return this._activo;
    }
    public set activo(value: boolean) {
        this._activo = value;
    }

    public get energiaProducida(): number {
        return this._energiaProducida;
    }
    public set energiaProducida(value: number) {
        this._energiaProducida = value;
    }
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

    public obtenerValor(): number {
        return this._energiaProducida;
    }

    

}
