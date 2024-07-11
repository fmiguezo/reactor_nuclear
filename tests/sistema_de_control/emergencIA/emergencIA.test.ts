import modEmergencIA from "../../../src/sistema_de_control/emergencIA/modEmergencIA";
import Reactor from "../../../src/central_nuclear/reactor/reactor";
import REmergencia from "../../../src/central_nuclear/reactor/estados_reactor/emergencia";
import BuilderReactorNormal from "../../../src/central_nuclear/reactor/builder/builder_reactor_normal";
import PlantaNuclear from "../../../src/planta_nuclear";
import DirectorBuildReactor from "../../../src/central_nuclear/reactor/builder/director_build_reactor";
import RApagado from "../../../src/central_nuclear/reactor/estados_reactor/apagado";

let MockPlanta: jest.Mocked<PlantaNuclear> =
  new PlantaNuclear() as jest.Mocked<PlantaNuclear>;
let MockBuilderConcreto: jest.Mocked<BuilderReactorNormal> =
  new BuilderReactorNormal() as jest.Mocked<BuilderReactorNormal>;
let MockDirectorBuilder: jest.Mocked<DirectorBuildReactor> =
  new DirectorBuildReactor(
    MockBuilderConcreto
  ) as jest.Mocked<DirectorBuildReactor>;
MockDirectorBuilder.cargarPlantaNuclear(MockPlanta);
let MockReactor: jest.Mocked<Reactor> =
  MockDirectorBuilder.buildReactorNormal() as jest.Mocked<Reactor>;

describe("Test de módulo EmergencIA", () => {
  let MockBuilderConcreto: jest.Mocked<BuilderReactorNormal> =
    new BuilderReactorNormal() as jest.Mocked<BuilderReactorNormal>;
  let director = new DirectorBuildReactor(MockBuilderConcreto);
  let plantaNuclear = new PlantaNuclear();

  beforeEach(() => {
    jest.useFakeTimers();
    director.cargarPlantaNuclear(plantaNuclear);
    MockReactor = director.buildReactorNormal() as jest.Mocked<Reactor>;
  });

  it("Verifica que la instancia sea de tipo DirectorBuilderReactor", () => {
    expect(director).toBeInstanceOf(DirectorBuildReactor);
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("el botón AZ-5 debería evitar el desastre...", () => {
    MockReactor.encender();
    MockReactor.setTemperatura(470);

    expect(MockReactor.getAdministradorBarras().getBarrasTotales().length).toBe(
      10
    );

    MockReactor.getEstado().verificarEstado();
    MockReactor.getEstado().verificarEstado();
    MockReactor.getEstado().verificarEstado();

    // Verifica que el reactor esté en REmergencia
    expect(MockReactor.getEstado()).toBeInstanceOf(REmergencia);

    // Obtiene la instancia de EmergencIA
    const instanciaEmergencIA: modEmergencIA = modEmergencIA.instancia;

    // Presiona el botón
    instanciaEmergencIA.AZ5(MockReactor);

    jest.advanceTimersByTime(1000000);

    // Verifica que se haya apagado
    expect(MockReactor.estaEncendido()).toBeFalsy();
    expect(MockReactor.getEstado()).toBeInstanceOf(RApagado);
  });
});
