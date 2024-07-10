import Reactor from "../../../../src/central_nuclear/reactor/reactor";
import RApagado from "../../../../src/central_nuclear/reactor/estados_reactor/apagado";
import REncenciendo from "../../../../src/central_nuclear/reactor/estados_reactor/encendiendo";
import { Constantes } from "../../../../src/central_nuclear/reactor/constantes";
import AlertaApagado from "../../../../src/sistema_de_control/alertas/alerta_apagado";
import BuilderReactorNormal from "../../../../src/central_nuclear/reactor/builder/builder_reactor_normal";
import PlantaNuclear from "../../../../src/planta_nuclear";
import DirectorBuildReactor from "../../../../src/central_nuclear/reactor/builder/director_build_reactor";
import Sistema from "../../../../src/sistema_de_control/sistema";
import ApagarError from "../../../../src/errores/errores_central_nuclear/errores_de_los_estados_del_reactor/error_estado_apagado/apagar_error";

let instance: RApagado;

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
  instance = new RApagado(MockReactor);
  MockReactor.setEstado(instance);
  MockReactor.setTemperatura(0);
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
  jest.clearAllMocks();
  jest.clearAllTimers();
});

describe("Test del estado apagado", () => {
  it("debería ser de tipo de instancia RApagado", () => {
    expect(MockReactor.getEstado()).toBeInstanceOf(RApagado);
  });

  it("debería mantener el estado apagado si la temperatura del reactor es igual a 0", () => {
    MockReactor.setTemperatura(0);
    instance.verificarEstado();
    expect(MockReactor.estaEncendido()).toBe(false);
  });

  it("debería cambiar el estado a encendiendo si se llama al metodo encender", () => {
    instance.encender();
    expect(MockReactor.getEstado()).toBeInstanceOf(REncenciendo);
    expect(MockReactor.estaEncendido()).toBeTruthy;
  });

  it("debería dar un mensaje de error si se quiere apagar un reactor apagado", () => {
    expect(() => instance.apagar()).toThrow(new ApagarError());
  });

  it("debería tener un estado de encendido falso si el reactor está apagado", () => {
    expect(instance.estaEncendido()).toBe(false);
  });

  it("no debería generar una alerta si el reactor está apagado", () => {
    expect(instance.generarAlerta()).toBeInstanceOf(AlertaApagado);
  });

  it("Verifica que to string devuelva el mensaje esperado", () => {
    expect(instance.toString()).toBe(Constantes.MENSAJE_ESTADO_APAGADO);
  });
});
