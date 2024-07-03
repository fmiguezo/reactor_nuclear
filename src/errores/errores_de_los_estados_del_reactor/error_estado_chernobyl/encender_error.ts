export default class EncenderError extends Error {
    constructor(message: string = "No fue posible encender el reactor dado que: el reactor exploto por los aires") {
        super(message);
        this.name = "EncenderError";
    }
}
