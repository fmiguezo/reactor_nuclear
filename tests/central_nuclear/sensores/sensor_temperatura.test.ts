import Reactor from "../../../src/central_nuclear/reactor/reactor";
import { Constantes } from "../../../src/central_nuclear/sensores/constantes";
import SensorTemperatura from "../../../src/central_nuclear/sensores/sensor_temperatura";
import ActualizarError from "../../../src/errores/errores_central_nuclear/errores_sensores/error_sensor_temperatura/actualizar_error";
import PlantaNuclear from "../../../src/planta_nuclear";
import Sistema from "../../../src/sistema_de_control/sistema";
import BuilderReactorNormal from "../../../src/central_nuclear/reactor/builder/builder_reactor_normal";
import DirectorBuildReactor from "../../../src/central_nuclear/reactor/builder/director_build_reactor";

let instance: SensorTemperatura;
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
  instance = new SensorTemperatura();
  instance.activo = true;
  instance.ultimaTemperatura = 0;
});

describe("SensorTemperatura getters y setters", () => {
  it("verifica que la instancia sea de tipo SensorTemperatura", () => {
    expect(instance).toBeInstanceOf(SensorTemperatura);
  });

  it("Verifica que la instancia este activa", () => {
    expect(instance.activo).toBe(true);
  });
});

describe("Test de los metodos implementados de ISensor.ts", () => {
  it("Verifica que la instancia este activa", () => {
    expect(instance.activo).toBe(true);
  });

  it("Verfica el metodo activar", () => {
    instance.activo = false;
    instance.activar();
    expect(instance.activo).toBe(true);
  });

  it("verifica el metodo desactivar", () => {
    instance.activo = true;
    instance.desactivar();
    expect(instance.activo).toBe(false);
  });

  it("verifica que la instancia actualizar valor reciba correctamente la temperatura y la sette in ultimaTemperatura", () => {
    instance.actualizar(MockReactor);
    expect(instance.obtenerValor()).toBe(0);
  });

  it("Verifica que este activo devuelva el valor esperado", () => {
    instance.activo = true;
    expect(instance.estaActivo()).toBe(true);
  });

  it("Verifica el else se actualizarValor", () => {
    instance.activo = false;
    expect(() => instance.actualizar(MockReactor)).toThrow(new ActualizarError());
  });

  it("Que la funcion toString devuelva lo esperado", () => {
    expect(instance.toString()).toBe(Constantes.MENSAJE_SENSOR_TEMPERATURA + instance.obtenerValor());
  });
});
