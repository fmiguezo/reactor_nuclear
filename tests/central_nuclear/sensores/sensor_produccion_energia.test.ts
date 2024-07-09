import SensorProduccionDeEnergia from "../../../src/central_nuclear/sensores/sensor_produccion_energia";
import Reactor from "../../../src/central_nuclear/reactor/reactor";
import { Constantes }  from "../../../src/central_nuclear/sensores/constantes";
import ActualizarError from "../../../src/errores/errores_central_nuclear/errores_sensores/error_sensor_produccion_energia/actualizar_error";

let sensor: SensorProduccionDeEnergia;
let reactorMock: Reactor;
describe("Test de SensorProduccionDeEnergia", () => {

  beforeEach(() => {
    sensor = new SensorProduccionDeEnergia();
    reactorMock = new Reactor();
  });

  it("Verifica que el sensor esté activo por defecto al ser creado", () => {
    expect(sensor.getActivo()).toBe(true);
  });

  it("Verifica que se pueda desactivar el sensor", () => {
    sensor.desactivar();
    expect(sensor.getActivo()).toBe(false);
  });

  it("Verifica que se pueda activar el sensor", () => {
    sensor.desactivar();
    sensor.activar();
    expect(sensor.getActivo()).toBe(true);
  });

  it("Verifica que se pueda establecer correctamente la energía producida", () => {
    const energiaProducida = 1000;
    sensor.setEnergiaProducida(energiaProducida);
    expect(sensor.obtenerValor()).toBe(energiaProducida);
  });

  it("Verifica la actualización del sensor cuando está activo", () => {
    const energiaNetaEsperada = 500; // Simula una energía neta esperada para el reactor
    reactorMock.obtenerEnergiaNeta = jest.fn().mockReturnValue(energiaNetaEsperada);
    sensor.actualizar(reactorMock);
    expect(sensor.obtenerValor()).toBe(energiaNetaEsperada);
  });

  it("Verifica que lance un error al intentar actualizar el sensor cuando está inactivo", () => {
    sensor.desactivar();
    expect(() => sensor.actualizar(reactorMock)).toThrow(ActualizarError);
    expect(() => sensor.actualizar(reactorMock)).toThrow(Constantes.MENSAJE_SENSOR_INACTIVO);
  });

  it("Verifica el método toString para representar correctamente la energía producida", () => {
    const energiaProducida = 1000;
    sensor.setEnergiaProducida(energiaProducida);
    const expectedString = Constantes.MENSAJE_SENSOR_ENERGIA + energiaProducida;
    expect(sensor.toString()).toBe(expectedString);
  });
});
