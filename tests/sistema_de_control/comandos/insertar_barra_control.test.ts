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
import { Constantes } from "../../../src/central_nuclear/reactor/constantes_reactor";

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
  let MockReactor: jest.Mocked<Reactor>;
  let MockRCritico: jest.Mocked<RCritico>;

  beforeEach(() => {
    jest.useFakeTimers();
    MockReactor =
      MockDirectorBuilder.buildReactorNormal() as jest.Mocked<Reactor>;
    instance =
      new InsertarBarraDeControl() as jest.Mocked<InsertarBarraDeControl>;
    MockRCritico = new RCritico(MockReactor) as jest.Mocked<RCritico>;
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("Verifica que NO se puedan insertar barras cuando el reactor se encuentra en estado Normal", () => {
    // Setea el estado en RNormal
    MockReactor.encender();
    expect(MockReactor.estaEncendido()).toBeTruthy();
    MockReactor.setTemperatura(Constantes.TEMP_MINIMA_NORMAL);
    MockReactor.getEstado().verificarEstado();
    expect(MockReactor.getEstado()).toBeInstanceOf(RNormal);

    // Setea el spy
    const consoleSpy = jest.spyOn(console, "log");

    // Envía el comando InsertarBarras
    const params = { param1: 10 };
    instance.ejecutar(MockReactor, params);

    // Verifica si en la consola salió el error
    expect(consoleSpy).toHaveBeenCalledWith(Constantes.NO_PUEDE_INSERTAR_BARRA);

    // Restaura el mock
    consoleSpy.mockRestore();
  });

  it("Debería poder bajar las barras en estado Crítico", () => {
    // Setea el estado en RCritico
    MockReactor.setTemperatura(Constantes.TEMP_MINIMA_CRITICA);
    MockReactor.cambiarEstado(MockRCritico);

    // Frena el tiempo para evitar explosiones
    jest.clearAllTimers();

    // Setea el spy
    const consoleSpy = jest.spyOn(console, "log");

    // Envía el comando InsertarBarras. 0 baja todas las barras
    const params = { param1: 0 };
    instance.ejecutar(MockReactor, params);

    // Verifica que hayan bajado las barras
    const cantBarrasInsertadas: number =
      MockReactor.getAdministradorBarras().getBarrasInsertadas().length;

    expect(cantBarrasInsertadas).toBeGreaterThan(0);
    // Verifica que no haya salido el error
    expect(consoleSpy).toHaveBeenCalledTimes(0);

    // Restaura el mock
    consoleSpy.mockRestore();
  });

  it("Deberia ejecutar el comando y disminuir la temperatura", () => {
    MockReactor.encender();

    const temperaturaInicial: number = 370;

    MockReactor.setTemperatura(temperaturaInicial);
    MockReactor.cambiarEstado(MockRCritico);

    // Baja todas las barras
    const params = { param1: 10 };
    instance.ejecutar(MockReactor, params);

    // Comprueba que hayan bajado todas las barras
    expect(
      MockReactor.getAdministradorBarras().getBarrasInsertadas().length
    ).toBe(MockReactor.getAdministradorBarras().getBarrasTotales().length);

    expect(
      MockReactor.getAdministradorBarras().getBarrasEnDesuso().length
    ).toBe(0);

    // Avanza el tiempo
    jest.advanceTimersByTime(10000);

    // Verifica que la temperatura haya disminuido
    expect(MockReactor.getTemperatura()).toBeLessThan(temperaturaInicial);
  });
});
