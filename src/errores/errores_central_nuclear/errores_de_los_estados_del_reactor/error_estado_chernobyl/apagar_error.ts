export default class ApagarError extends Error {
    constructor(message: string = "No fue posible apagar el reactor dado que: el reactor exploto por los aires") {
        super(message);
        this.name = "ApagarError";
    }
}
