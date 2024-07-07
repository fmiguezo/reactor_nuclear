import BarraControl from "../../../../src/central_nuclear/barras_control/barra_control";
import EstadoBarraControl from "../../../../src/central_nuclear/barras_control/estados/estado_barra_control";
import Eliminada from "../../../../src/central_nuclear/barras_control/estados/eliminada";
import BarraControlCadmio from "../../../../src/central_nuclear/barras_control/barra_control_cadmio";
import { Constantes } from "../../../../src/central_nuclear/barras_control/constantes";
import ActivarError from "../../../../src/errores/errores_central_nuclear/errores_barras_de_control/error_estado_eliminada/activar_error";
import DesactivarError from "../../../../src/errores/errores_central_nuclear/errores_barras_de_control/error_estado_eliminada/desactivar_error";

describe("Test de Estado Barra de Control: Eliminada", () => {
  let rodInstance: BarraControl;
  let stateInstance: EstadoBarraControl;

  beforeEach(() => {
    jest.useFakeTimers();
    stateInstance = new Eliminada();
    rodInstance = new BarraControlCadmio(200, stateInstance);
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("Verifica que NO esté activo", () => {
    let estado: boolean = stateInstance.estaActivo();
    expect(estado).toBe(false);
  });

  it("Verifica que NO pueda activarse", () => {
    expect(() => rodInstance.activar()).toThrow(
      new ActivarError()
    );
  });

  it("Verifica que NO pueda activarse y desactivarse", () => {
    let estado: boolean = rodInstance.estaActivo();
    expect(estado).toBe(false);

    expect(() => rodInstance.activar()).toThrow(
      new ActivarError(Constantes.MENSAJE_BARRA_VENCIDA)
    );
    estado = rodInstance.estaActivo();
    expect(estado).toBe(false);

    expect(() => rodInstance.desactivar()).toThrow(
      new DesactivarError()
    );
    estado = rodInstance.estaActivo();
    expect(estado).toBe(false);
  });

  afterEach(() => {
    jest.clearAllTimers();
  });
});
