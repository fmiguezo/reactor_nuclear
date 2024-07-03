export default class EnergiaTermalCalculationError extends Error {
    constructor(message: string = "No se pudo calcular la energia termal dado que la temperatura se encuentra por debajo del minimo") {
        super(message);
        this.name = "EnergiaTermalCalculationError";

    }
}
