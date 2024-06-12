import ISensor from "./ISensor";

export default class SensorProduccionDeEnergia implements ISensor{
    
    estaActivo(): boolean {
        throw new Error("Method not implemented.");
    }
    activar(): void {
        throw new Error("Method not implemented.");
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
