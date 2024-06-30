import Command from "../../src/sistema_de_control/comandos/command";
import ApagarReactor from "../../src/sistema_de_control/comandos/apagar_reactor";
import Reactor from "../../src/central_nuclear/reactor/reactor";
import RNormal from "../../src/central_nuclear/reactor/estados_reactor/normal";


describe("Test del comando Apagar reactor", () => {
    let reactor: Reactor;
    let apagarReactor: ApagarReactor;
  
    beforeEach(() => {
      reactor = new Reactor();
      apagarReactor = new ApagarReactor();
      MockEncendido = new RNormal(reactor) as jest.Mocked<RNormal>;
      reactor.setEstado(MockEncendido);
    });
    
    afterEach(() => {
        jest.clearAllMocks();
    });
    
  
    test("debería apagar el reactor", () => {
      expect(reactor.getEstado().estaEncendido()).toBe(true);
      apagarReactor.ejecutar(reactor);
      expect(reactor.getEstado().estaEncendido()).toBe(false);
        });
  });