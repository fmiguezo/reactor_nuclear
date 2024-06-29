import SensorTemperatura from "../../../src/central_nuclear/sensores/sensor_temperatura";
import SensorProduccionDeEnergia from "../../../src/central_nuclear/sensores/sensor_produccion_energia";
import Reactor from "../../../src/central_nuclear/reactor/reactor";
let instance: SensorProduccionDeEnergia;
let reactor: Reactor;

beforeEach(() => {
  instance = new SensorProduccionDeEnergia();
  instance.setActivo(true);
  instance.setEnergiaProducida(0);
  reactor = new Reactor()
  reactor.setTemperatura(100);
  reactor.getEstado().calcularEnergia(100);
});

describe("SensorTemperatura getters y setters", () => {
  it("verifica que la instancia sea de tipo SensorTemperatura", () => {
    expect(instance).toBeInstanceOf(SensorTemperatura);
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

  it("verifica que la instancia actualizar valor reciba correctamente la temperatura y la sette in ultimaTemperatura", () => {
    instance.actualizar(reactor);
    expect(instance.obtenerValor()).toBe(100);
  });

  it("Verifica que este activo devuelva el valor esperado", () => {
    instance.setActivo(true);
    expect(instance.estaActivo()).toBe(true);
  });

  it("Verifica el else se actualizarValor", () => {
    instance.setActivo(false);
    expect(() => instance.actualizar(reactor)).toThrow(Error);
  });
  
});
