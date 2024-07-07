export default class ReactorNoEncontradoError extends Error {
    constructor(message: string = "No fue posible encontrar el ractor especificado") {
        super(message);
        this.name = "ReactorNoEncontradoError";
    }
}