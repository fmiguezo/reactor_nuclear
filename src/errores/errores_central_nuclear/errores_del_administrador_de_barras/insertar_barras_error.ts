export default class InsertarBarrasError extends Error {
    constructor(message: string = "No se pudo insertar ninguna barra dado que: El estado del reactor no admite insertar barras") {
        super(message);
        this.name = "InsertarBarrasError";
    }
}
