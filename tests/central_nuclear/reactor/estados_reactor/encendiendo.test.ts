import Reactor from "../../../../src/central_nuclear/reactor/reactor";
import RApagado from "../../../../src/central_nuclear/reactor/estados_reactor/apagado";
import REncenciendo from "../../../../src/central_nuclear/reactor/estados_reactor/encendiendo";
import RNormal from "../../../../src/central_nuclear/reactor/estados_reactor/normal";
import BuilderReactorNormal from "../../../../src/central_nuclear/reactor/builder/builder_reactor_normal";
import PlantaNuclear from "../../../../src/planta_nuclear";
import DirectorBuildReactor from "../../../../src/central_nuclear/reactor/builder/director_build_reactor";
import Sistema from "../../../../src/sistema_de_control/sistema";
import EncenderError from "../../../../src/errores/errores_central_nuclear/errores_de_los_estados_del_reactor/error_estado_enciendo/error_encender";
import { Constantes } from "../../../../src/central_nuclear/reactor/constantes";

let instance: REncenciendo;
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
  instance = new REncenciendo(MockReactor);
  MockReactor.setEstado(instance);
  MockReactor.setTemperatura(1);
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
  jest.clearAllMocks();
  jest.clearAllTimers();
});

describe("Test del estado Rencendiendo", () => {
  it("verifica que la instancia sea de tipo REncendiendo", () => {
    expect(instance).toBeInstanceOf(REncenciendo);
  });

  it("si la temperatura es 280°C o más, debería cambiar a RNormal", () => {
    MockReactor.setTemperatura(Constantes.TEMP_MINIMA_NORMAL);
    instance.verificarEstado();
    expect(MockReactor.getEstado()).toBeInstanceOf(RNormal);
  });

  it("energía neta debería ser 0", () => {
    expect(instance.obtenerEnergiaNeta()).toBe(0);
  });

  it("debería lanzar una excepción de tipo EncenderError", () => {
    expect(() => instance.encender()).toThrow(new EncenderError());
  });

  it("apagar() deberia cambiar de estado correctamente", () => {
    instance.apagar();
    expect(MockReactor.getEstado()).toBeInstanceOf(RApagado);
  });

  it("estaEncendido() debería retornar true", () => {
    expect(instance.estaEncendido()).toBeTruthy;
  });

  it("no debería generar alertas", () => {
    expect(instance.generarAlerta()).toBeNull;
  });

  it("no debería poder insertar barras", () => {
    expect(instance.puedeInsertarBarras()).toBeFalsy();
  });
});
