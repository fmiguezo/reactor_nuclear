export default class DesactivarError extends Error {
    constructor(message: string = "No fue posible desactivar la barra de control, dado que la misma ya está desactivada") {
        super(message);
        this.name = "DesactivarError";
    }
}