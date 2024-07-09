import Reactor from "../../../../src/central_nuclear/reactor/reactor";
import REmergencia from "../../../../src/central_nuclear/reactor/estados_reactor/emergencia";
import RCritico from "../../../../src/central_nuclear/reactor/estados_reactor/critico";
import RApagado from "../../../../src/central_nuclear/reactor/estados_reactor/apagado";
import BuilderReactorNormal from "../../../../src/central_nuclear/reactor/builder/builder_reactor_normal";
import PlantaNuclear from "../../../../src/planta_nuclear";
import DirectorBuildReactor from "../../../../src/central_nuclear/reactor/builder/director_build_reactor";
import Sistema from "../../../../src/sistema_de_control/sistema";
import EncenderError from "../../../../src/errores/errores_central_nuclear/errores_de_los_estados_del_reactor/error_estado_emergencia/error_encender";
import { Constantes } from "../../../../src/central_nuclear/reactor/constantes";
import RNormal from "../../../../src/central_nuclear/reactor/estados_reactor/normal";
import AlertaEstandar from "../../../../src/sistema_de_control/alertas/alerta_estandar";

let instance: RNormal;

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
  instance = new RNormal(MockReactor);
  MockReactor.setEstado(instance);
  MockReactor.setTemperatura(Constantes.TEMP_MINIMA_NORMAL);
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
  jest.clearAllMocks();
  jest.clearAllTimers();
});

describe("Test del estado Normal", () => {
  it("verifica que la instancia sea de tipo RNormal", () => {
    expect(MockReactor.getEstado()).toBeInstanceOf(RNormal);
  });

  it("el reactor deberia apagarse si la temperatura es menor a 280", () => {
    MockReactor.setTemperatura(Constantes.TEMP_MINIMA_NORMAL - 1);
    instance.verificarEstado();
    expect(MockReactor.getEstado()).toBeInstanceOf(RApagado);
  });

  it("debería cambiar a estado RCritico si la temperatura es 330 o mayor", () => {
    MockReactor.setTemperatura(Constantes.TEMP_MINIMA_CRITICA);
    instance.verificarEstado();
    expect(MockReactor.getEstado()).toBeInstanceOf(RCritico);
  });

  it("debería dar error si se intenta encender un reactor en estado RNormal", () => {
    expect(() => instance.encender()).toThrow(new EncenderError());
  });

  it("debería cambiar a estado apagado si se llama al método apagar", () => {
    instance.apagar();
    expect(MockReactor.getEstado()).toBeInstanceOf(RApagado);
  });

  it("debería confirmar que el reactor está encendido si el estado es RNormal", () => {
    expect(instance.estaEncendido()).toBeTruthy;
  });

  it("No debería generar alertas si está en estado RNormal", () => {
    expect(instance.generarAlerta()).toBeNull;
  });

  it("debería calcular un valor de energía neta en 100 si la temperatura es 280", () => {
    MockReactor.setTemperatura(Constantes.TEMP_MINIMA_NORMAL);
    expect(instance.obtenerEnergiaNeta()).toBe(100);
  });

  test("Verifica que to string devuelva el mensaje esperado", () => {
    expect(instance.toString()).toBe(Constantes.MENSAJE_ESTADO_NORMAL);
  });

  it("no debería poder insertar barras", () => {
    expect(instance.puedeInsertarBarras()).toBeFalsy();
  });
});
