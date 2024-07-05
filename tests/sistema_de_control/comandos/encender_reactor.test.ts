import EncenderReactor from "../../../src/sistema_de_control/comandos/encender_reactor";
import Reactor from "../../../src/central_nuclear/reactor/reactor";
import RApagado from "../../../src/central_nuclear/reactor/estados_reactor/apagado";
import PlantaNuclear from "../../../src/planta_nuclear";
import Sistema from "../../../src/sistema_de_control/sistema";
import BuilderReactorNormal from "../../../src/central_nuclear/reactor/builder/builder_reactor_normal";
import DirectorBuildReactor from "../../../src/central_nuclear/reactor/builder/director_build_reactor";

describe("Test del comando Encender reactor", () => {
  let instance: EncenderReactor = new EncenderReactor();
  let MockPlanta: jest.Mocked<PlantaNuclear> = new PlantaNuclear() as jest.Mocked<PlantaNuclear>;
  let MockSistema: jest.Mocked<Sistema> = new Sistema(MockPlanta) as jest.Mocked<Sistema>;
  let MockBuilderConcreto: jest.Mocked<BuilderReactorNormal> =
    new BuilderReactorNormal() as jest.Mocked<BuilderReactorNormal>;
  let MockDirectorBuilder: jest.Mocked<DirectorBuildReactor> = new DirectorBuildReactor(
    MockBuilderConcreto
  ) as jest.Mocked<DirectorBuildReactor>;
  MockDirectorBuilder.cargarPlantaNuclear(MockPlanta);
  let MockReactor: jest.Mocked<Reactor> = MockDirectorBuilder.buildReactorNormal() as jest.Mocked<Reactor>;
  let MockApagado: jest.Mocked<RApagado>;

  beforeEach(() => {
    MockApagado = new RApagado(MockReactor) as jest.Mocked<RApagado>;
    MockReactor.setEstado(MockApagado);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("debería encender el reactor", () => {
    expect(MockReactor.getEstado().estaEncendido()).toBe(false);
    instance.ejecutar(MockReactor);
    expect(MockReactor.getEstado().estaEncendido()).toBe(true);
  });
});
