import Reactor from "../../../../src/central_nuclear/reactor/reactor";
import Chernobyl from "../../../../src/central_nuclear/reactor/estados_reactor/chernobyl";
import VerificarEstadoError from "../../../../src/errores/errores_central_nuclear/errores_de_los_estados_del_reactor/error_estado_chernobyl/verificar_estado_error";
import EncenderError from "../../../../src/errores/errores_central_nuclear/errores_de_los_estados_del_reactor/error_estado_chernobyl/encender_error";
import ApagarError from "../../../../src/errores/errores_central_nuclear/errores_de_los_estados_del_reactor/error_estado_chernobyl/apagar_error";
let instance: Chernobyl;
let instanceReactor: Reactor;

beforeEach(() => {
  jest.useFakeTimers();
  instance = new Chernobyl(instanceReactor);
  instanceReactor = new Reactor();
  instanceReactor.setEstado(instance);
  instanceReactor.setTemperatura(100);
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
  jest.clearAllMocks();
  jest.clearAllTimers();
});

describe("Test del estado apagado", () => {
  it("verifica que la instancia sea de tipo RApagado", () => {
    expect(instance).toBeInstanceOf(Chernobyl);
  });

  it("Verifica que verificarEstado este lanzando el mensaje correcto", () => {
    expect(instance.verificarEstado()).toThrow(new VerificarEstadoError());
  });

  it("Verifica que encender este lanzando el mensaje correcto", () => {
    expect(instance.encender()).toThrow(new EncenderError());
  });

  it("Verifica que encender este lanzando el mensaje correcto", () => {
    expect(instance.apagar()).toThrow(new ApagarError());
  });

  it("Verifica que estaEncendido, devuelva false", () => {
    expect(instance.estaEncendido()).toBe(false);
  });
});
