import Reactor from "../../../../src/central_nuclear/reactor/reactor";
import { Constantes } from "../../../../src/central_nuclear/reactor/constantes";
import Chernobyl from "../../../../src/central_nuclear/reactor/estados_reactor/chernobyl";
let instance: Chernobyl;
let instanceReactor: Reactor;

beforeEach(() => {
  instance = new Chernobyl(instanceReactor);
  instanceReactor = new Reactor();
  instanceReactor.setEstado(instance);
  instanceReactor.setTemperatura(100);
});

afterEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
});

describe("Test del estado apagado", () => {
  it("verifica que la instancia sea de tipo RApagado", () => {
    expect(instance).toBeInstanceOf(Chernobyl);
  });

  it("Verifica que verificarEstado este lanzando el mensaje correcto", () => {
    expect(() => instance.verificarEstado()).toThrow(new Error(Constantes.MENSAJE_ESTADO_CHERNOBYL_EXPLOTO));
  });

  it("Verifica que encender este lanzando el mensaje correcto", () => {
    expect(() => instance.encender()).toThrow(new Error(Constantes.MENSAJE_ESTADO_CHERNOBYL_NO_ENCENDIO));
  });

  it("Verifica que encender este lanzando el mensaje correcto", () => {
    expect(() => instance.apagar()).toThrow(new Error(Constantes.MENSAJE_ESTADO_CHERNOBYL_NO_APAGO));
  });

  it("Verifica que estaEncendido, devuelva false", () => {
    expect(instance.estaEncendido()).toBe(false);
  });
});
