export default class DesactivarError extends Error {
    constructor(message: string = "No fue posible desactivar la barra de control, dado que la misma esta vencida") {
        super(message);
        this.name = "DesactivarError";
    }
}