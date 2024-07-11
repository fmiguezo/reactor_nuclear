import SacarBarrasDeControl from "../../../src/sistema_de_control/comandos/sacar_barra_control";
import SubirBarrasError from "../../../src/errores/errores_central_nuclear/errores_del_administrador_de_barras/subir_barras_error";
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
import { Constantes } from "../../../src/central_nuclear/reactor/constantes_reactor";
import REncenciendo from "../../../src/central_nuclear/reactor/estados_reactor/encendiendo";

describe("Test del comando sacar barras de control del reactor", () => {
  let instance: jest.Mocked<SacarBarrasDeControl>;
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
  let MockApagado: jest.Mocked<RApagado>;

  beforeEach(() => {
    jest.useFakeTimers();
    instance = new SacarBarrasDeControl() as jest.Mocked<SacarBarrasDeControl>;
    MockReactor =
      MockDirectorBuilder.buildReactorNormal() as jest.Mocked<Reactor>;
    MockApagado = new RApagado(MockReactor) as jest.Mocked<RApagado>;

    MockReactor.setEstado(MockApagado);
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("Se verifica primero que haya barras activadas", () => {
    MockReactor.cambiarEstado(new RCritico(MockReactor));
    // Elimina los timers para que el reactor quede estable
    jest.clearAllTimers();
    // Inserta barras
    MockReactor.getAdministradorBarras().insertarBarras(10);
    // Verifica que barras insertadas > 0
    let barrasActivas: number =
      MockReactor.getAdministradorBarras().getBarrasInsertadas().length;
    expect(barrasActivas).toBeGreaterThan(0);
  });

  it("Deberia verificar que se puedan subir las barras de control", () => {
    // Cambia a RCritico para poder insertar las barras
    MockReactor.cambiarEstado(new RCritico(MockReactor));
    // Elimina los timers para que el reactor quede estable
    jest.clearAllTimers();
    // Inserta barras
    MockReactor.getAdministradorBarras().insertarBarras(10);
    let barrasActivas: number =
      MockReactor.getAdministradorBarras().getBarrasInsertadas().length;
    expect(barrasActivas).toEqual(10);
    // Sube las barras
    const params = { param1: 10 };
    instance.ejecutar(MockReactor, params);
    // Verifica que no hayan quedado barras insertadas
    barrasActivas =
      MockReactor.getAdministradorBarras().getBarrasInsertadas().length;
    expect(barrasActivas).toEqual(0);
  });

  it("Deberia manejar SubirBarrasError correctamente", () => {
    const consoleSpy = jest.spyOn(console, "log");

    instance.ejecutar(MockReactor);

    expect(consoleSpy).toHaveBeenCalledWith(Constantes.NO_PUEDE_SUBIR_BARRA);
  });

  it("Deberia manejar errores desconocidos correctamente", () => {
    const consoleSpy = jest.spyOn(console, "log");

    instance.ejecutar(MockReactor);

    expect(consoleSpy).toHaveBeenCalledWith(Constantes.NO_PUEDE_SUBIR_BARRA);
  });
});
