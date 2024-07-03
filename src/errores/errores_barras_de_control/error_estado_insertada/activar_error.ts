export default class ActivarError extends Error {
    constructor(message: string = "No fue posible activar la barra de control, dado que la misma ya está insertada") {
        super(message);
        this.name = "ActivarError";
    }
}