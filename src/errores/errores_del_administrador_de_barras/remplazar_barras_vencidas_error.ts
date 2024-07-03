export default class RemplazarBarrasBencidasError extends Error {
    constructor(message: string = "No se pudo remplazar la barra seleccionada dado que: no es posible crear una barra de ese material") {
        super(message);
        this.name = "RemplazarBarrasBencidasError";
    }
}
