export default class SubirBarrasError extends Error {
    constructor(message: string = "No se pudo subir ninguna barra dado que: No hay barras insertadas") {
        super(message);
        this.name = "SubirBarrasError";
    }
}
