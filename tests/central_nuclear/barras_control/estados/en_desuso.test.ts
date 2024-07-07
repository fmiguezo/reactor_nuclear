import BarraControl from "../../../../src/central_nuclear/barras_control/barra_control";
import EstadoBarraControl from "../../../../src/central_nuclear/barras_control/estados/estado_barra_control";
import EnDesuso from "../../../../src/central_nuclear/barras_control/estados/en_desuso";
import BarraControlCadmio from "../../../../src/central_nuclear/barras_control/barra_control_cadmio";

describe("Test de Estado Barra de Control: EnDesuso", () => {
  let rodInstance: BarraControl;
  let stateInstance: EstadoBarraControl;

  beforeEach(() => {
    jest.useFakeTimers();
    stateInstance = new EnDesuso();
    rodInstance = new BarraControlCadmio(200, stateInstance);
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("Verifica que no esté activo", () => {
    let estado: boolean = stateInstance.estaActivo();
    expect(estado).toBe(false);
  });

  it("Verifica que pueda activarse", () => {
    rodInstance.activar();
    let estado: boolean = rodInstance.estaActivo();
    expect(estado).toBe(true);
  });

  it("Verifica que pueda activarse y desactivarse", () => {
    rodInstance.activar();
    rodInstance.desactivar();
    let estado: boolean = rodInstance.estaActivo();
    expect(estado).toBe(false);
  });

  afterEach(() => {
    jest.clearAllTimers();
  });
});
