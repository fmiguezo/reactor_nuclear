import Reactor from "../../../../src/central_nuclear/reactor/reactor";
import REmergencia from "../../../../src/central_nuclear/reactor/estados_reactor/emergencia";
import RCritico from "../../../../src/central_nuclear/reactor/estados_reactor/critico";
import PlantaNuclear from "../../../../src/planta_nuclear";
import Sistema from "../../../../src/sistema_de_control/sistema";
import BuilderReactorNormal from "../../../../src/central_nuclear/reactor/builder/builder_reactor_normal";
import DirectorBuildReactor from "../../../../src/central_nuclear/reactor/builder/director_build_reactor";
import RNormal from "../../../../src/central_nuclear/reactor/estados_reactor/normal";
import RApagado from "../../../../src/central_nuclear/reactor/estados_reactor/apagado";
import AlertaEstandar from "../../../../src/sistema_de_control/alertas/alerta_estandar";
import EncenderError from "../../../../src/errores/errores_central_nuclear/errores_de_los_estados_del_reactor/error_estado_critico/encender_error";

let instance: RCritico;
let _timerGeneracion: NodeJS.Timeout | null = null;
let MockPlanta: jest.Mocked<PlantaNuclear> = new PlantaNuclear() as jest.Mocked<PlantaNuclear>;
let MockSistema: jest.Mocked<Sistema> = new Sistema(MockPlanta) as jest.Mocked<Sistema>;
let MockBuilderConcreto: jest.Mocked<BuilderReactorNormal> =
  new BuilderReactorNormal() as jest.Mocked<BuilderReactorNormal>;
let MockDirectorBuilder: jest.Mocked<DirectorBuildReactor> = new DirectorBuildReactor(
  MockBuilderConcreto
) as jest.Mocked<DirectorBuildReactor>;
MockDirectorBuilder.cargarPlantaNuclear(MockPlanta);
let MockReactor: jest.Mocked<Reactor> = MockDirectorBuilder.buildReactorNormal() as jest.Mocked<Reactor>;

beforeEach(() => {
  jest.useFakeTimers();
  instance = new RCritico(MockReactor);
  MockReactor.setEstado(instance);
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
  jest.clearAllMocks();
  jest.clearAllTimers();
});

describe("Test del estado Critico", () => {
  it("verifica que la instancia sea de tipo RCritico", () => {
    expect(MockReactor.getEstado()).toBeInstanceOf(RCritico);
  });

  it("debería cambiar a estado RNormal si la temperatura es 329 o menor", () => {
    MockReactor.setTemperatura(329);
    expect(MockReactor.getEstado()).toBeInstanceOf(RNormal);
  });

  it("debería cambiar a estado REmergencia si la temperatura es 400 o mayor", () => {
    MockReactor.setTemperatura(400);
    // Elimina los timers para que el reactor no explote
    jest.clearAllTimers();
    expect(MockReactor.getEstado()).toBeInstanceOf(REmergencia);
  });

  it("debería dar error si se intenta encender un reactor en estado RCritico", () => {
    expect(() => instance.encender()).toThrow(new EncenderError());
  });

  it("debería cambiar a estado apagado si se llama al método apagar", () => {
    instance.apagar();
    expect(MockReactor.getEstado()).toBeInstanceOf(RApagado);
  });

  it("debería confirmar que el reactor está encendido si el estado es RCritico", () => {
    expect(instance.estaEncendido()).toBeTruthy;
  });

  it("verifica que generar alerta genere la alerta de tipo Estandar", () => {
    expect(instance.generarAlerta()).toBeInstanceOf(AlertaEstandar);
  });

  it("debería poder insertar barras", () => {
    expect(instance.puedeInsertarBarras()).toBeTruthy();
  });

  it("debería cambiar a estado normal si la temperatura está por debajo de 300 grados", () => {
    jest.spyOn(MockReactor, "getTemperatura").mockReturnValue(299);
    instance.verificarEstado();
    expect(MockReactor.getEstado()).toBeInstanceOf(RNormal);
  });

  it("debería cambiar a estado emergencia si la temperatura es igual o mayor a 500 grados", () => {
    jest.spyOn(MockReactor, "getTemperatura").mockReturnValue(350);
    instance.verificarEstado();
    expect(MockReactor.getEstado()).toBeInstanceOf(REmergencia);
  });

  it("debería dar error si se llama a la función encender()", () => {
    expect(() => instance.encender()).toThrow(new EncenderError());
  });

  it("debería cambiar a estado apagado si se llama a la función apagar()", () => {
    instance.apagar();
    expect(MockReactor.getEstado()).toBeInstanceOf(RApagado);
  });
});
