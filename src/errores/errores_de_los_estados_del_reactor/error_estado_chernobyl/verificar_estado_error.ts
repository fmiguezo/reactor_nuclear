export default class VerificarEstadoError extends Error {
    constructor(message: string = "No se pudo verificar el estado del reactor dado que: el reactor exploto por los aires") {
        super(message);
        this.name = "VerificarEstadoError";
    }
}
