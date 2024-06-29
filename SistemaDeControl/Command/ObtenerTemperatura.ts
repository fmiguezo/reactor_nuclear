import Command from "./Command";
import Reactor from "../../src/central_nuclear/reactor/reactor";

export default class ObtenerTemperatura implements Command {
    public ejecutar(r: Reactor): void {
        console.log(r.getTemperatura())
    }
}