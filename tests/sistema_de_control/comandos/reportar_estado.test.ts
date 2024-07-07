import Reactor from "../../../src/central_nuclear/reactor/reactor";
import RCritico from "../../../src/central_nuclear/reactor/estados_reactor/critico";
import ReportarEstado from "../../../src/sistema_de_control/comandos/reportar_estado";
import PlantaNuclear from "../../../src/planta_nuclear";
import Sistema from "../../../src/sistema_de_control/sistema";
import BuilderReactorNormal from "../../../src/central_nuclear/reactor/builder/builder_reactor_normal";
import DirectorBuildReactor from "../../../src/central_nuclear/reactor/builder/director_build_reactor";

describe("Test del comando para reportar estado del reactor", () => {
  let instance: ReportarEstado = new ReportarEstado();
  let MockPlanta: jest.Mocked<PlantaNuclear> =
    new PlantaNuclear() as jest.Mocked<PlantaNuclear>;
  let MockSistema: jest.Mocked<Sistema> = new Sistema(
    MockPlanta
  ) as jest.Mocked<Sistema>;
  let MockBuilderConcreto: jest.Mocked<BuilderReactorNormal> =
    new BuilderReactorNormal() as jest.Mocked<BuilderReactorNormal>;
  let MockDirectorBuilder: jest.Mocked<DirectorBuildReactor> =
    new DirectorBuildReactor(
      MockBuilderConcreto
    ) as jest.Mocked<DirectorBuildReactor>;
  MockDirectorBuilder.cargarPlantaNuclear(MockPlanta);
  let MockReactor: jest.Mocked<Reactor> =
    MockDirectorBuilder.buildReactorNormal() as jest.Mocked<Reactor>;
  let MockCritico: jest.Mocked<RCritico>;

  beforeEach(() => {
    jest.useFakeTimers();
    MockCritico = new RCritico(MockReactor) as jest.Mocked<RCritico>;
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("Verifica el estado", () => {
    MockReactor.setEstado(MockCritico);
    expect(MockReactor.getEstado()).toBeInstanceOf(RCritico);
    // Falta desarrollar verificacion
  });

  it("se testea que el mensaje sea el correcto", () => {
    // A REALIZAR
  });
});
