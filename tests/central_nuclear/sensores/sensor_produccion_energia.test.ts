import SensorProduccionDeEnergia from "../../../src/central_nuclear/sensores/sensor_produccion_energia";
import Reactor from "../../../src/central_nuclear/reactor/reactor";
import { Constantes } from "../../../src/central_nuclear/sensores/constantes";
import ActualizarError from "../../../src/errores/errores_central_nuclear/errores_sensores/error_sensor_produccion_energia/actualizar_error";
import PlantaNuclear from "../../../src/planta_nuclear";
import Sistema from "../../../src/sistema_de_control/sistema";
import BuilderReactorNormal from "../../../src/central_nuclear/reactor/builder/builder_reactor_normal";
import DirectorBuildReactor from "../../../src/central_nuclear/reactor/builder/director_build_reactor";
import RNormal from "../../../src/central_nuclear/reactor/estados_reactor/normal";

let instance: SensorProduccionDeEnergia;
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
  instance = new SensorProduccionDeEnergia();
  instance.setActivo(true);
  instance.setEnergiaProducida(0);
  MockReactor.setTemperatura(100);
});

describe("SensorTemperatura getters y setters", () => {
  it("verifica que la instancia sea de tipo SensorTemperatura", () => {
    expect(instance).toBeInstanceOf(SensorProduccionDeEnergia);
  });

  it("Verifica que la instancia este activa", () => {
    expect(instance.getActivo()).toBe(true);
  });
});

describe("Test de los metodos implementados de ISensor.ts", () => {
  it("Verifica que la instancia este activa", () => {
    expect(instance.getActivo()).toBe(true);
  });

  it("Verfica el metodo activar", () => {
    instance.setActivo(false);
    instance.activar();
    expect(instance.getActivo()).toBe(true);
  });

  it("verifica el metodo desactivar", () => {
    instance.setActivo(true);
    instance.desactivar();
    expect(instance.getActivo()).toBe(false);
  });

  it("verifica que la instancia actualizar valor reciba correctamente la temperatura y la sette en ultimaTemperatura", () => {
    MockReactor.cambiarEstado(new RNormal(MockReactor));
    MockReactor.setTemperatura(280);
    instance.actualizar(MockReactor);
    expect(instance.obtenerValor()).toBe(100);
  });

  it("verifica que la instancia actualizar valor reciba correctamente la temperatura y la sette en ultimaTemperatura", () => {
    MockReactor.cambiarEstado(new RNormal(MockReactor));
    MockReactor.setTemperatura(288.33);
    instance.actualizar(MockReactor);
    expect(instance.obtenerValor()).toBe(116.65);
  });

  it("verifica que la instancia actualizar al el sensor estar desactivado tire un error", () => {
    instance.desactivar();
    expect(() => instance.actualizar(MockReactor)).toThrow(new ActualizarError());
  });

  it("Verifica que este activo devuelva el valor esperado", () => {
    instance.setActivo(true);
    expect(instance.estaActivo()).toBe(true);
  });

  it("Verifica el else se actualizarValor", () => {
    instance.setActivo(false);
    expect(() => instance.actualizar(MockReactor)).toThrow(new ActualizarError());
  });

  it("Que la funcion toString devuelva lo esperado", () => {
    expect(instance.toString()).toBe(Constantes.MENSAJE_SENSOR_ENERGIA + instance.obtenerValor());
  });
});
