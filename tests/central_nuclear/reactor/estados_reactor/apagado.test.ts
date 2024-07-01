import Reactor from "../../../../src/central_nuclear/reactor/reactor";
import RApagado from "../../../../src/central_nuclear/reactor/estados_reactor/apagado";
import REncenciendo from "../../../../src/central_nuclear/reactor/estados_reactor/encendiendo";
import { Constantes } from "../../../../src/central_nuclear/reactor/constantes";
import Alerta from "../../../../src/sistema_de_control/alertas/alerta";

let MockReactor: jest.Mocked<Reactor>;
let instance: RApagado;

beforeEach(() => {
  MockReactor = new Reactor() as jest.Mocked<Reactor>;
  instance = new RApagado(MockReactor);
  MockReactor.setEstado(instance);
  MockReactor.setTemperatura(100);
});

describe("Test del estado apagado", () => {
  it("debería ser de tipo de instancia RApagado", () => {
    expect(MockReactor).toBeInstanceOf(RApagado);
  });

  it("debería calcular el valor de energía termal en 0 si el reactor está apagado", () => {
    expect(MockReactor.obtenerEnergiaTermal()).toBe(0);
  });

  it("debería calcular el valor de energía neta en 0 si el reactor está apagado", () => {
    expect(MockReactor.obtenerEnergiaNeta()).toBe(0);
  });

  it("debería cambiar el estado del reactor (encenderlo) si la temperatura del reactor es mayor a 0", () => {
    instance.verificarEstado();
    expect(MockReactor.estaEncendido()).toBe(true);
  });

  it("debería mantener el estado apagado si la temperatura del reactor es igual a 0", () => {
    MockReactor.setTemperatura(0);
    instance.verificarEstado();
    expect(MockReactor.estaEncendido()).toBe(false);
  });

  it("debería cambiar el estado a encendiendo si se llama al metodo encender", () => {
    instance.encender();
    expect(MockReactor.getEstado()).toBeInstanceOf(REncenciendo);
  });

  it("debería dar un mensaje de error si se quiere apagar un reactor apagado", () => {
    expect(() => instance.apagar()).toThrow(new Error(Constantes.MENSAJE_APAGADO));
  });

  it("debería tener un estado de encendido falso si el reactor está apagado", () => {
    expect(instance.estaEncendido()).toBe(false);
  });

  it("no debería cambiar la temperatura si el reactor está apagado", () => {
    let valorTemperatura = MockReactor.getTemperatura();
    instance.incrementarTemperatura();
    expect(valorTemperatura).toBe(MockReactor.getTemperatura());
  });

  it("no debería genere una alerta si el reactor está apagado", () => {
    expect(instance.generarAlerta()).toBeNull();
  });

  it("Verifica que to string devuelva el mensaje esperado", () => {
    expect(instance.toString()).toBe(Constantes.MENSAJE_ESTADO_APAGADO);
  });
});
