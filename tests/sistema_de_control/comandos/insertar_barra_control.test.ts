import ApagarReactor from "../../../src/sistema_de_control/comandos/apagar_reactor";
import Reactor from "../../../src/central_nuclear/reactor/reactor";
import RNormal from "../../../src/central_nuclear/reactor/estados_reactor/normal";
import PlantaNuclear from "../../../src/planta_nuclear";
import Sistema from "../../../src/sistema_de_control/sistema";
import BuilderReactorNormal from "../../../src/central_nuclear/reactor/builder/builder_reactor_normal";
import DirectorBuildReactor from "../../../src/central_nuclear/reactor/builder/director_build_reactor";
import RApagado from "../../../src/central_nuclear/reactor/estados_reactor/apagado";
import RCritico from "../../../src/central_nuclear/reactor/estados_reactor/critico";
import REmergencia from "../../../src/central_nuclear/reactor/estados_reactor/emergencia";
import Chernobyl from "../../../src/central_nuclear/reactor/estados_reactor/chernobyl";
import REncenciendo from "../../../src/central_nuclear/reactor/estados_reactor/encendiendo";
import InsertarBarraDeControl from "../../../src/sistema_de_control/comandos/insertar_barra_control";
import { Constantes } from "../../../src/central_nuclear/reactor/constantes";

describe("Test del comando insertar barra de control", () => {
  let instance: jest.Mocked<InsertarBarraDeControl>;
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
  let MockApagado: jest.Mocked<RApagado>;

  beforeEach(() => {
    jest.useFakeTimers();
    let instance =
      new InsertarBarraDeControl() as jest.Mocked<InsertarBarraDeControl>;
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
    let MockApagado: jest.Mocked<RApagado>;
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("Verifica que NO se puedan insertar barras cuando el reactor se encuentra en estado Normal", () => {
    // Setea el estado en RNormal
    MockReactor.cambiarEstado(new RNormal(MockReactor));
    expect(MockReactor.estaEncendido()).toBeTruthy();

    // Setea los spy
    const insertarSpy = jest.spyOn(MockReactor, "setBarrasDeControl");
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    // Envía el comando InsertarBarras
    const params = { param1: 10 };
    instance.ejecutar(MockReactor, params);

    // Verifica si se llamó al método encender del reactor
    expect(insertarSpy).toHaveBeenCalled();

    // Verifica si en la consola salió el error
    expect(consoleSpy).toHaveBeenCalledWith(Constantes.NO_PUEDE_INSERTAR_BARRA);

    // Restaura los mocks
    insertarSpy.mockRestore();
    consoleSpy.mockRestore();
  });

  /* A IMPLEMENTAR


  it("Verifico que el estado del reactor sea critico", () => {
    expect(reactorCritico.getEstado()).toBeInstanceOf(RCritico);
  });

  it(" Deberia de ejecutar el comando y disminuir la temperatura ", () => {
    let temperaturaInicial = reactorCritico.getTemperatura();
    insertarBarraControl.ejecutar(reactorCritico);
    expect(reactorCritico.getTemperatura()).toBeLessThan(temperaturaInicial);
  }); */
});
