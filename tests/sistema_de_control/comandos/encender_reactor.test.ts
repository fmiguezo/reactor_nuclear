import Command from "../../../src/sistema_de_control/comandos/command";
import EncenderReactor from "../../../src/sistema_de_control/comandos/encender_reactor";
import Reactor from "../../../src/central_nuclear/reactor/reactor";
import RApagado from "../../../src/central_nuclear/reactor/estados_reactor/apagado";

describe("Test del comando Encender reactor", () => {
  let reactor: Reactor;
  let encenderReactor: EncenderReactor;
  let MockApagado: jest.Mocked<RApagado>;

  beforeEach(() => {
    reactor = new Reactor();
    encenderReactor = new EncenderReactor();
    MockApagado = new RApagado(reactor) as jest.Mocked<RApagado>;
    reactor.setEstado(MockApagado);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("debería apagar el reactor", () => {
    expect(reactor.getEstado().estaEncendido()).toBe(false);
    encenderReactor.ejecutar(reactor);
    expect(reactor.getEstado().estaEncendido()).toBe(true);
  });
});
