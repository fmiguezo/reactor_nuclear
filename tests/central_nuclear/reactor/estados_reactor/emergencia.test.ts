import Reactor from "../../../../src/central_nuclear/reactor/reactor";
import REmergencia from "../../../../src/central_nuclear/reactor/estados_reactor/emergencia";
import RCritico from "../../../../src/central_nuclear/reactor/estados_reactor/critico";
import Chernobyl from "../../../../src/central_nuclear/reactor/estados_reactor/chernobyl";
import RApagado from "../../../../src/central_nuclear/reactor/estados_reactor/apagado";
import BuilderReactorNormal from "../../../../src/central_nuclear/reactor/builder/builder_reactor_normal";
import PlantaNuclear from "../../../../src/planta_nuclear";
import DirectorBuildReactor from "../../../../src/central_nuclear/reactor/builder/director_build_reactor";
import Sistema from "../../../../src/sistema_de_control/sistema";
import EncenderError from "../../../../src/errores/errores_central_nuclear/errores_de_los_estados_del_reactor/error_estado_emergencia/error_encender";
import AlertaCritica from "../../../../src/sistema_de_control/alertas/alerta_critica";

let instance: REmergencia;
let MockPlanta: jest.Mocked<PlantaNuclear> = new PlantaNuclear() as jest.Mocked<PlantaNuclear>;
let MockSistema: jest.Mocked<Sistema> = new Sistema(MockPlanta) as jest.Mocked<Sistema>;
let MockBuilderConcreto: jest.Mocked<BuilderReactorNormal> =
  new BuilderReactorNormal() as jest.Mocked<BuilderReactorNormal>;
let MockDirectorBuilder: jest.Mocked<DirectorBuildReactor> = new DirectorBuildReactor(
  MockBuilderConcreto
) as jest.Mocked<DirectorBuildReactor>;
MockDirectorBuilder.cargarPlantaNuclear(MockPlanta);
let MockReactor: jest.Mocked<Reactor> = MockDirectorBuilder.buildReactorNormal() as jest.Mocked<Reactor>;

beforeEach(() => {
  jest.useFakeTimers();
  instance = new REmergencia(MockReactor);
  MockReactor.setEstado(instance);
  MockReactor.setTemperatura(332);
  jest.clearAllTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
  jest.clearAllMocks();
  jest.clearAllTimers();
});

afterAll(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
});

describe("Test del estado apagado", () => {
  it("debería ser una instancia de REmergencia", () => {
    expect(instance).toBeInstanceOf(REmergencia);
  });

  it("debería cambiar a estado crítico si la temperatura es 390", () => {
    MockReactor.setTemperatura(390);
    MockReactor.getEstado().verificarEstado();
    expect(MockReactor.getEstado()).toBeInstanceOf(RCritico);
  });

  it("debería cambiar a estado Chernobyl si la temperatura es 500", () => {
    MockReactor.setTemperatura(500);
    MockReactor.getEstado().verificarEstado();
    expect(MockReactor.getEstado()).toBeInstanceOf(Chernobyl);
  });

  it("debería dar error si se intenta encender un reactor en estado de emergencia", () => {
    expect(() => instance.encender()).toThrow(new EncenderError());
  });

  it("debería cambiar a estado apagado si se llama al método apagar", () => {
    instance.apagar();
    expect(MockReactor.getEstado()).toBeInstanceOf(RApagado);
  });

  it("debería confirmar que el reactor está encendido si el estado es emergencia", () => {
    expect(instance.estaEncendido()).toBe(true);
  });

  it("verifica que generar alerta genere la alerta de tipo Critica", () => {
    expect(instance.generarAlerta()).toBeInstanceOf(AlertaCritica);
  });

  it("debería poder insertar barras", () => {
    expect(instance.puedeInsertarBarras()).toBeTruthy();
  });
});
