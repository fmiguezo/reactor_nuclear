export default class EncenderError extends Error {
    constructor(message: string = "No fue posible encender el reactor dado que: el mismo ya estaba encendido") {
        super(message);
        this.name = "EncenderError";
    }
}