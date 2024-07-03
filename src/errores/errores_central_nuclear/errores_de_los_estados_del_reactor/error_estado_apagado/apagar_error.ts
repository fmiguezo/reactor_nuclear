export default class ApagarError extends Error {
    constructor(message: string = "No se pudo apagar el reactor en cuestion dado que: el reactor ya se encuentra apagado") {
        super(message);
        this.name = "apagarError";
    }
}
