export default class getFabricaError extends Error {
    constructor(message: string = "No se pudo obtener la fabrica dado que: No existe la fabrica") {
        super(message);
        this.name = "getFabricaError";
    }
}
