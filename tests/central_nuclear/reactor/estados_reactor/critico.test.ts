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
  jest.useFakeTimers();
  instanceReactor = new Reactor();
  instance = new RCritico(instanceReactor);
  instanceReactor.setEstado(instance);
  instanceReactor.setTemperatura(Constantes.TEMP_MINIMA_CRITICA);
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
  jest.clearAllMocks();
  jest.clearAllTimers();
});

describe("Test del estado Critico", () => {
  it("verifica que la instancia sea de tipo RCritico", () => {
    expect(instance).toBeInstanceOf(RCritico);
  });

  it("Verifica que calcularEnergia de el valor esperado", () => {
    expect(instance.calcularEnergia()).toBe(0);
  });

  it("debería cambiar a estado crítico si la temperatura es 389 o menor", () => {
    instanceReactor.setTemperatura(389);
    instance.verificarEstado();
    expect(instanceReactor.getEstado()).toBeInstanceOf(RCritico);
  });
});
