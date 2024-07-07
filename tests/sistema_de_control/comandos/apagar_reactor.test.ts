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
import { Constantes } from "../../../src/central_nuclear/reactor/constantes";
import REncenciendo from "../../../src/central_nuclear/reactor/estados_reactor/encendiendo";

describe("Test del comando Apagar reactor", () => {
  let instance: jest.Mocked<ApagarReactor>;
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
    instance = new ApagarReactor() as jest.Mocked<ApagarReactor>;
    MockApagado = new RApagado(MockReactor) as jest.Mocked<RApagado>;
    MockReactor.setEstado(MockApagado);
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("NO debería apagar el reactor si está en estado Apagado (espera una excepción)", () => {
    expect(MockReactor.estaEncendido()).toBeFalsy();

    // Setea los spy

    const apagarSpy = jest.spyOn(MockReactor, "apagar");
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    // Envía el comando Apagar
    instance.ejecutar(MockReactor);
    expect(MockReactor.estaEncendido()).toBeFalsy();

    // Verifica si se llamó al método encender del reactor
    expect(apagarSpy).toHaveBeenCalled();

    // Verifica si en la consola salió el error
    expect(consoleSpy).toHaveBeenCalledWith(Constantes.MENSAJE_APAGADO);

    // Restaura los mocks
    apagarSpy.mockRestore();
    consoleSpy.mockRestore();
  });

  it("debería apagar el reactor si está en estado Encendiendo", () => {
    MockReactor.cambiarEstado(new REncenciendo(MockReactor));
    expect(MockReactor.estaEncendido()).toBeTruthy();

    // Envía el comando Apagar
    instance.ejecutar(MockReactor);
    expect(MockReactor.estaEncendido()).toBeFalsy();
  });

  it("debería apagar el reactor si está en estado Normal", () => {
    MockReactor.cambiarEstado(new RNormal(MockReactor));
    expect(MockReactor.estaEncendido()).toBeTruthy();

    // Envía el comando Apagar
    instance.ejecutar(MockReactor);
    expect(MockReactor.estaEncendido()).toBeFalsy();
  });

  it("debería apagar el reactor si está en estado Critico", () => {
    MockReactor.cambiarEstado(new RCritico(MockReactor));
    expect(MockReactor.estaEncendido()).toBeTruthy();

    // Envía el comando Apagar
    instance.ejecutar(MockReactor);
    expect(MockReactor.estaEncendido()).toBeFalsy();
  });

  it("debería apagar el reactor si está en estado Emergencia", () => {
    MockReactor.cambiarEstado(new REmergencia(MockReactor));
    expect(MockReactor.estaEncendido()).toBeTruthy();

    // Envía el comando Apagar
    instance.ejecutar(MockReactor);
    expect(MockReactor.estaEncendido()).toBeFalsy();
  });

  it("NO debería apagar el reactor si está en estado Chernobyl (espera una excepción)", () => {
    MockReactor.cambiarEstado(new Chernobyl(MockReactor));
    expect(MockReactor.estaEncendido()).toBeFalsy();

    // Setea los spy

    const apagarSpy = jest.spyOn(MockReactor, "apagar");
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    // Envía el comando Apagar
    instance.ejecutar(MockReactor);
    expect(MockReactor.estaEncendido()).toBeFalsy();

    // Verifica si se llamó al método encender del reactor
    expect(apagarSpy).toHaveBeenCalled();

    // Verifica si en la consola salió el error
    expect(consoleSpy).toHaveBeenCalledWith(
      Constantes.MENSAJE_ESTADO_CHERNOBYL_NO_APAGO
    );

    // Restaura los mocks
    apagarSpy.mockRestore();
    consoleSpy.mockRestore();
  });
});
