import EncenderReactor from "../../../src/sistema_de_control/comandos/encender_reactor";
import Reactor from "../../../src/central_nuclear/reactor/reactor";
import RApagado from "../../../src/central_nuclear/reactor/estados_reactor/apagado";
import PlantaNuclear from "../../../src/planta_nuclear";
import Sistema from "../../../src/sistema_de_control/sistema";
import BuilderReactorNormal from "../../../src/central_nuclear/reactor/builder/builder_reactor_normal";
import DirectorBuildReactor from "../../../src/central_nuclear/reactor/builder/director_build_reactor";
import EncenderErrorENormal from "../../../src/errores/errores_central_nuclear/errores_de_los_estados_del_reactor/error_estado_normal/error_encender";
import EncenderErrorEEmergencia from "../../../src/errores/errores_central_nuclear/errores_de_los_estados_del_reactor/error_estado_emergencia/error_encender";
import { Constantes } from "../../../src/central_nuclear/reactor/constantes";

describe("Test del comando Encender reactor", () => {
  // let instance: EncenderReactor;
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

  it("debería recibir alguna excepción al intentar encender un reactor ya encendido", () => {
    // Espía el método encender del reactor
    const encenderSpy = jest
      .spyOn(MockReactor, "encender")
      .mockImplementation(() => {
        throw new EncenderErrorENormal();
      });

    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    instance.ejecutar(MockReactor);

    // Verifica si se llamó al método encender del reactor
    expect(encenderSpy).toHaveBeenCalled();

    // Verifica si en la consola salió el error
    expect(consoleSpy).toHaveBeenCalledWith(Constantes.MENSAJE_ENCENDIDO);

    encenderSpy.mockRestore();
    consoleSpy.mockRestore();
  });
});
