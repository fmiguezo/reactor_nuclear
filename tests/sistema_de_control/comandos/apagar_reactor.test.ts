import ApagarReactor from "../../../src/sistema_de_control/comandos/apagar_reactor";
import Reactor from "../../../src/central_nuclear/reactor/reactor";
import RNormal from "../../../src/central_nuclear/reactor/estados_reactor/normal";
import PlantaNuclear from "../../../src/planta_nuclear";
import Sistema from "../../../src/sistema_de_control/sistema";
import BuilderReactorNormal from "../../../src/central_nuclear/reactor/builder/builder_reactor_normal";
import DirectorBuildReactor from "../../../src/central_nuclear/reactor/builder/director_build_reactor";

describe("Test del comando Apagar reactor", () => {
  let instance: ApagarReactor = new ApagarReactor();

  let MockPlanta: jest.Mocked<PlantaNuclear> = new PlantaNuclear() as jest.Mocked<PlantaNuclear>;
  let MockSistema: jest.Mocked<Sistema> = new Sistema(MockPlanta) as jest.Mocked<Sistema>;
  let MockBuilderConcreto: jest.Mocked<BuilderReactorNormal> =
    new BuilderReactorNormal() as jest.Mocked<BuilderReactorNormal>;
  let MockDirectorBuilder: jest.Mocked<DirectorBuildReactor> = new DirectorBuildReactor(
    MockBuilderConcreto
  ) as jest.Mocked<DirectorBuildReactor>;
  MockDirectorBuilder.cargarPlantaNuclear(MockPlanta);
  let MockReactor: jest.Mocked<Reactor> = MockDirectorBuilder.buildReactorNormal() as jest.Mocked<Reactor>;
  let MockEncendido: jest.Mocked<RNormal>;

  beforeEach(() => {
    MockEncendido = new RNormal(MockReactor) as jest.Mocked<RNormal>;
    MockReactor.setEstado(MockEncendido);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("debería apagar el reactor", () => {
    expect(MockReactor.getEstado().estaEncendido()).toBe(true);
    instance.ejecutar(MockReactor);
    expect(MockReactor.getEstado().estaEncendido()).toBe(false);
  });
});
