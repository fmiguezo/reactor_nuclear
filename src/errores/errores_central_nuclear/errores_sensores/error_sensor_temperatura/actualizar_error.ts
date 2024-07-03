export default class ActualizarError extends Error {
    constructor(message: string = "No fue posible actualizar el sensor dado que: el mismo se encuentra inactivo") {
        super(message);
        this.name = "ActualizarError";
    }
}