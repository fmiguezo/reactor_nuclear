import Reactor from "../../../../src/central_nuclear/reactor/reactor";
import REmergencia from "../../../../src/central_nuclear/reactor/estados_reactor/emergencia";
import RCritico from "../../../../src/central_nuclear/reactor/estados_reactor/critico";
import Chernobyl from "../../../../src/central_nuclear/reactor/estados_reactor/chernobyl";
import RApagado from "../../../../src/central_nuclear/reactor/estados_reactor/apagado";
import BuilderReactorNormal from "../../../../src/central_nuclear/reactor/builder/builder_reactor_normal";
import PlantaNuclear from "../../../../src/planta_nuclear";
import DirectorBuildReactor from "../../../../src/central_nuclear/reactor/builder/director_build_reactor";
import Sistema from "../../../../src/sistema_de_control/sistema";
import EncenderError from "../../../../src/errores/errores_central_nuclear/errores_de_los_estados_del_reactor/error_estado_emergencia/error_encender";
import { Constantes } from "../../../../src/central_nuclear/reactor/constantes";
import RNormal from "../../../../src/central_nuclear/reactor/estados_reactor/normal";
import AlertaEstandar from "../../../../src/sistema_de_control/alertas/alerta_estandar";

let instance: RCritico;
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

beforeEach(() => {
  jest.useFakeTimers();
  instance = new RCritico(MockReactor);
  MockReactor.setEstado(instance);
  MockReactor.setTemperatura(Constantes.TEMP_MINIMA_CRITICA + 2);
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
    MockReactor.setTemperatura(Constantes.TEMP_MAXIMA_NORMAL);
    expect(MockReactor.getEstado()).toBeInstanceOf(RNormal);
  });

  it("debería cambiar a estado REmergencia si la temperatura es 400 o mayor", () => {
    MockReactor.setTemperatura(Constantes.TEMP_MINIMA_EMERGENCIA);
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
});
