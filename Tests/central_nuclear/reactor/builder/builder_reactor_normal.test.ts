import BuilderReactorNormal from "../../../../src/central_nuclear/reactor/builder/builder_reactor_normal";
import Reactor from "../../../../src/central_nuclear/reactor/reactor";

describe("Test de BuilderReactorNormal", () => {
  let instance: BuilderReactorNormal;

  beforeEach(() => {
    instance = new BuilderReactorNormal();
  });

  it("Verifica que el reset() devuelva un nuevo Reactor", () => {
    instance.reset();
    expect(() => instance.getReactor).toBeInstanceOf(Reactor);
  })


});
