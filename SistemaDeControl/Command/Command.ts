import Reactor from "../../src/central_nuclear/reactor/reactor";


export default interface Command {

    ejecutar( r : Reactor): void;

}
