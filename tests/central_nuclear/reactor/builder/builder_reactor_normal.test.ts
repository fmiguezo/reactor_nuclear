import AdministradorBarras from "../../../../src/central_nuclear/reactor/administrador/administrador_barras";
import BuilderReactorNormal from "../../../../src/central_nuclear/reactor/builder/builder_reactor_normal";
import Reactor from "../../../../src/central_nuclear/reactor/reactor";
import PlantaNuclear from "../../../../src/planta_nuclear";
import EstadoReactor from "../../../../src/central_nuclear/reactor/estados_reactor/estadoreactor";
import RNormal from "../../../../src/central_nuclear/reactor/estados_reactor/normal";
import Sistema from "../../../../src/sistema_de_control/sistema";
import RApagado from "../../../../src/central_nuclear/reactor/estados_reactor/apagado";

describe("Tests del builder de reactor normal", () => {
  let instance: BuilderReactorNormal;
  let MockPlantaNuclear: jest.Mocked<PlantaNuclear> = new PlantaNuclear() as jest.Mocked<PlantaNuclear>;
  let MockReactor: jest.Mocked<Reactor>;
  let MockNormal: jest.Mocked<RNormal>;
  let MockRApagado: jest.Mocked<RApagado>;

  beforeEach(() => {
    jest.useFakeTimers();
    instance = new BuilderReactorNormal();
    instance.reset();
    MockReactor = instance.getReactor() as jest.Mocked<Reactor>;
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("Verifica que la instancia sea de tipo BuilderReactorNormal", () => {
    expect(instance).toBeInstanceOf(BuilderReactorNormal);
  });

  it("Verifica que el reset() devuelva un nuevo Reactor", () => {
    instance.reset();
    expect(instance.getReactor()).toBeInstanceOf(Reactor);
  });

  it("Verifica que el administrador se agregue de forma correcta", () => {
    instance.setAdminBarras();
    expect(instance.getReactor().getAdministradorBarras()).toBeInstanceOf(AdministradorBarras);
  });

  it("Verifica que las barras se agreguen de forma correcta", () => {
    instance.reset();
    let reactor = instance.getReactor();
    MockNormal = new RNormal(reactor) as jest.Mocked<RNormal>;
    reactor.setEstado(MockNormal);
    instance.setAdminBarras();
    instance.setBarras();
    reactor.setPlantaNuclear(MockPlantaNuclear);
    jest.spyOn(global.console, "log");
    expect(reactor.getBarrasDeControl().length).toBe(100);
  });

  it("Verifica que los sensores se agreguen de forma correcta", () => {
    instance.reset();
    instance.setSensores();
    expect(instance.getReactor().getSensores().length).toBe(2);
  });

  it("Verifica que el estado inicial se agregue de forma correcta", () => {
    instance.reset();
    instance.setAdminBarras();
    instance.setBarras();
    instance.setEstadoIncial();
    MockRApagado = new RApagado(instance.getReactor()) as jest.Mocked<RApagado>;
    expect(instance.getReactor().getEstado()).toBeInstanceOf(RApagado);
  });
});
