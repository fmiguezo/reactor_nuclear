import Command from "./Command";
import Reactor from "../../src/central_nuclear/reactor/reactor";

export default class ApagarReactor implements Command {
    public ejecutar(r: Reactor): void {
        r.apagar();
    }
}