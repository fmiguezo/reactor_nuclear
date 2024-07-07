import Reactor from "../../../src/central_nuclear/reactor/reactor";
import InsertarBarraDeControl from "../../../src/sistema_de_control/comandos/insertar_barra_control";
import RNormal from "../../../src/central_nuclear/reactor/estados_reactor/normal";
import RCritico from "../../../src/central_nuclear/reactor/estados_reactor/critico";

describe("Test del comando insertar barra de control dentro del reactor", () => {
  let reactorNormal: Reactor;
  let insertarBarraControl: InsertarBarraDeControl;
  let reactorCritico: Reactor;
  let MockNormal: RNormal;
  let MockCritico: RCritico;

  beforeEach(() => {
    jest.useFakeTimers();
    let reactorNormal = new Reactor();
    let reactorCritico = new Reactor();
    let insertarBarraControl = new InsertarBarraDeControl();
    let MockNormal = new RNormal(reactorNormal) as jest.Mocked<RNormal>;
    let MockCritico = new RCritico(reactorCritico) as jest.Mocked<RCritico>;
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  /* A IMPLEMENTAR

    it("Verifica que no se pueda insertar barras cuando el reactor se encuentra en estado normal", () => {
      expect(reactorNormal.insertarBarra()).tobe(error)
    });



  it("Verifico que el estado del reactor sea critico", () => {
    expect(reactorCritico.getEstado()).toBeInstanceOf(RCritico);
  });

  it(" Deberia de ejecutar el comando y disminuir la temperatura ", () => {
    let temperaturaInicial = reactorCritico.getTemperatura();
    insertarBarraControl.ejecutar(reactorCritico);
    expect(reactorCritico.getTemperatura()).toBeLessThan(temperaturaInicial);
  }); */
});
