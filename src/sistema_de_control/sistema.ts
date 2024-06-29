import Reactor from "../central_nuclear/reactor/reactor";

export default class Sistema {
  private _reactor: Reactor;

  constructor(reactor: Reactor) {
    this._reactor = reactor;
  }

  public actualizar(): void {}
}
