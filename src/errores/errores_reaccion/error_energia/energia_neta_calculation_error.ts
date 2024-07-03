export default class EnergiaNetaCalculationError extends Error {
    constructor(message: string = "No se pudo calcular la energía neta, dado que la energía termal generada es menor a la producción mínima necesaria") {
        super(message);
        this.name = "EnergiaNetaCalculationError";
    }
}
