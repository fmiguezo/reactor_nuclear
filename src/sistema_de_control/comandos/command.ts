import Reactor from "../../central_nuclear/reactor/reactor";

export default interface Command {
  ejecutar(r: Reactor, params?: { [key: string]: any }): void;
}
