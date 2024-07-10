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
  let MockReactor: jest.Mocked<Reactor>;

  beforeEach(() => {
    jest.useFakeTimers();
    MockReactor =
      MockDirectorBuilder.buildReactorNormal() as jest.Mocked<Reactor>;
    instance =
      new InsertarBarraDeControl() as jest.Mocked<InsertarBarraDeControl>;
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
    // Setea el estado en RNormal
    MockReactor.encender();
    expect(MockReactor.estaEncendido()).toBeTruthy();
    MockReactor.setTemperatura(Constantes.TEMP_MINIMA_CRITICA);
    expect(MockReactor.getEstado()).toBeInstanceOf(RCritico);

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

  // it("Deberia ejecutar el comando y disminuir la temperatura", () => {
  //   MockReactor.encender();
  //   // Setea la temperatura en TEMP_MINIMA_CRITICA + 30
  //   MockReactor.setTemperatura(Constantes.TEMP_MINIMA_CRITICA + 30);

  //   // Verifica que reactor esté en estado RCritico
  //   expect(MockReactor.getEstado()).toBeInstanceOf(RCritico);

  //   const temperaturaInicial: number = MockReactor.getTemperatura();
  //   // Baja todas las barras
  //   const params = { param1: 100 };
  //   instance.ejecutar(MockReactor, params);

  //   // Avanza el tiempo
  //   jest.advanceTimersByTime(250);

  //   expect(
  //     MockReactor.getAdministradorBarras().getBarrasInsertadas().length
  //   ).toBe(MockReactor.getAdministradorBarras().getBarrasTotales().length);
  //   // Verifica que la temperatura haya disminuido
  //   expect(MockReactor.getTemperatura()).toBeLessThan(temperaturaInicial);
  // });
});
