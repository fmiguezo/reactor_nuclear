import EncenderReactor from "../../../src/sistema_de_control/comandos/encender_reactor";
import Reactor from "../../../src/central_nuclear/reactor/reactor";
import RApagado from "../../../src/central_nuclear/reactor/estados_reactor/apagado";
import PlantaNuclear from "../../../src/planta_nuclear";
import Sistema from "../../../src/sistema_de_control/sistema";
import BuilderReactorNormal from "../../../src/central_nuclear/reactor/builder/builder_reactor_normal";
import DirectorBuildReactor from "../../../src/central_nuclear/reactor/builder/director_build_reactor";
import EncenderErrorENormal from "../../../src/errores/errores_central_nuclear/errores_de_los_estados_del_reactor/error_estado_normal/error_encender";
import EncenderErrorEEmergencia from "../../../src/errores/errores_central_nuclear/errores_de_los_estados_del_reactor/error_estado_emergencia/error_encender";
import { Constantes } from "../../../src/central_nuclear/reactor/constantes_reactor";
import RCritico from "../../../src/central_nuclear/reactor/estados_reactor/critico";
import REncenciendo from "../../../src/central_nuclear/reactor/estados_reactor/encendiendo";
import RNormal from "../../../src/central_nuclear/reactor/estados_reactor/normal";
import REmergencia from "../../../src/central_nuclear/reactor/estados_reactor/emergencia";
import Chernobyl from "../../../src/central_nuclear/reactor/estados_reactor/chernobyl";

describe("Test del comando Encender reactor", () => {
  let instance: jest.Mocked<EncenderReactor>;
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
    instance = new EncenderReactor() as jest.Mocked<EncenderReactor>;
    MockApagado = new RApagado(MockReactor) as jest.Mocked<RApagado>;
    MockReactor.setEstado(MockApagado);
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("debería encender el reactor", () => {
    expect(MockReactor.getEstado().estaEncendido()).toBeFalsy;
    instance.ejecutar(MockReactor);
    expect(MockReactor.getEstado().estaEncendido()).toBeTruthy;
  });

  it("debería recibir alguna excepción al intentar encender un reactor que está encendiéndose", () => {
    // Espía el método encender del reactor
    const encenderSpy = jest.spyOn(MockReactor, "encender");

    // Enciende el reactor por primera vez
    instance.ejecutar(MockReactor);
    expect(MockReactor.getEstado()).toBeInstanceOf(REncenciendo);

    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    // Intenta encender el reactor nuevamente
    instance.ejecutar(MockReactor);

    // Verifica si se llamó al método encender del reactor
    expect(encenderSpy).toHaveBeenCalled();

    // Verifica si en la consola salió el error
    expect(consoleSpy).toHaveBeenCalledWith(Constantes.MENSAJE_ENCENDIDO);

    encenderSpy.mockRestore();
    consoleSpy.mockRestore();
  });

  it("debería recibir alguna excepción al intentar encender un reactor en estado normal", () => {
    // Espía el método encender del reactor
    const encenderSpy = jest.spyOn(MockReactor, "encender");

    // Enciende el reactor por primera vez
    instance.ejecutar(MockReactor);

    // Cambia estado a RNormal
    MockReactor.cambiarEstado(new RNormal(MockReactor));
    expect(MockReactor.getEstado()).toBeInstanceOf(RNormal);

    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    // Intenta encender el reactor nuevamente
    instance.ejecutar(MockReactor);

    // Verifica si se llamó al método encender del reactor
    expect(encenderSpy).toHaveBeenCalled();

    // Verifica si en la consola salió el error
    expect(consoleSpy).toHaveBeenCalledWith(Constantes.MENSAJE_ENCENDIDO);

    encenderSpy.mockRestore();
    consoleSpy.mockRestore();
  });

  it("debería recibir alguna excepción al intentar encender un reactor en estado critico", () => {
    // Espía el método encender del reactor
    const encenderSpy = jest.spyOn(MockReactor, "encender");

    // Enciende el reactor por primera vez
    instance.ejecutar(MockReactor);

    // Cambia estado a RCritico
    MockReactor.cambiarEstado(new RCritico(MockReactor));
    expect(MockReactor.getEstado()).toBeInstanceOf(RCritico);

    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    // Intenta encender el reactor nuevamente
    instance.ejecutar(MockReactor);

    // Verifica si se llamó al método encender del reactor
    expect(encenderSpy).toHaveBeenCalled();

    // Verifica si en la consola salió el error
    expect(consoleSpy).toHaveBeenCalledWith(
      Constantes.MENSAJE_ENCENDER_CRITICO
    );

    encenderSpy.mockRestore();
    consoleSpy.mockRestore();
  });

  it("debería recibir alguna excepción al intentar encender un reactor en estado emergencia", () => {
    // Espía el método encender del reactor
    const encenderSpy = jest.spyOn(MockReactor, "encender");

    // Enciende el reactor por primera vez
    instance.ejecutar(MockReactor);

    // Cambia estado a RCritico
    MockReactor.cambiarEstado(new REmergencia(MockReactor));
    expect(MockReactor.getEstado()).toBeInstanceOf(REmergencia);

    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    // Intenta encender el reactor nuevamente
    instance.ejecutar(MockReactor);

    // Verifica si se llamó al método encender del reactor
    expect(encenderSpy).toHaveBeenCalled();

    // Verifica si en la consola salió el error
    expect(consoleSpy).toHaveBeenCalledWith(Constantes.MENSAJE_ENCENDIDO);

    encenderSpy.mockRestore();
    consoleSpy.mockRestore();
  });

  it("debería recibir alguna excepción al intentar encender un reactor en estado Chernobyl", () => {
    const encenderSpy = jest.spyOn(MockReactor, "encender");

    instance.ejecutar(MockReactor);

    MockReactor.cambiarEstado(new Chernobyl(MockReactor));
    expect(MockReactor.getEstado()).toBeInstanceOf(Chernobyl);

    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    instance.ejecutar(MockReactor);

    expect(encenderSpy).toHaveBeenCalled();
    
    expect(consoleSpy).toHaveBeenCalledWith(
      Constantes.MENSAJE_ESTADO_CHERNOBYL_NO_ENCENDIO
    );

    encenderSpy.mockRestore();
    consoleSpy.mockRestore();
  });
});
