import Reactor from "../../../../src/central_nuclear/reactor/reactor";
import RApagado from "../../../../src/central_nuclear/reactor/estados_reactor/apagado";
import REncenciendo from "../../../../src/central_nuclear/reactor/estados_reactor/encendiendo";
import { Constantes } from "../../../../src/central_nuclear/reactor/constantes";
import GeneradorDeAlertaApagado from "../../../../src/sistema_de_control/alertas/generador_alerta_apagado";
import RegistroEnergiaGenerada from "../../../../src/sistema_de_control/registros/registro_energia_generada";
import RCritico from "../../../../src/central_nuclear/reactor/estados_reactor/critico";
let instance: RCritico;
let instanceReactor: Reactor;
let _timerGeneracion: NodeJS.Timeout | null = null;

beforeEach(() => {
  instanceReactor = new Reactor();
  instance = new RCritico(instanceReactor);
  instanceReactor.setEstado(instance);
  instanceReactor.setTemperatura(0);
});

afterEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
});

describe("Test del estado apagado", () => {
  it("verifica que la instancia sea de tipo RApagado", () => {
    expect(instance).toBeInstanceOf(RCritico);
  });

  it("Verifica que calcularEnergia de el valor esperado", () => {
    expect(instance.calcularEnergia()).toBe(0);
  });
});
