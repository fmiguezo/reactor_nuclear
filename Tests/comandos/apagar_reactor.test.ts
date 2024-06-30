import Command from "../../src/sistema_de_control/comandos/command"
import ApagarReactor from "../../src/sistema_de_control/comandos/apagar_reactor"

describe("Test del comando Apagar reactor", () => {
    let reactor: Reactor;
    let apagarReactor: ApagarReactor;
  
    beforeEach(() => {
      reactor = new Reactor();
      apagarReactor = new ApagarReactor();
    });
  
    test("debería apagar el reactor", () => {
      expect(reactor.getEstado().estaEncendido()).toBe(true);
      apagarReactor.ejecutar(reactor);
      expect(reactor.getEstado().estaEncendido()).toBe(false);
        });
  });