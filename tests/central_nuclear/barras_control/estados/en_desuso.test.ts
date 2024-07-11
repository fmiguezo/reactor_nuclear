import BarraControl from "../../../../src/central_nuclear/barras_control/barra_control";
import EstadoBarraControl from "../../../../src/central_nuclear/barras_control/estados/estado_barra_control";
import EnDesuso from "../../../../src/central_nuclear/barras_control/estados/en_desuso";
import BarraControlCadmio from "../../../../src/central_nuclear/barras_control/barra_control_cadmio";
import DesactivarError from "../../../../src/errores/errores_central_nuclear/errores_barras_de_control/error_estado_en_desuso/desactivar_error";

describe("Test de Estado Barra de Control: EnDesuso", () => {
  let rodInstance: BarraControl;
  let stateInstance: EnDesuso;

  beforeEach(() => {
    jest.useFakeTimers();
    stateInstance = new EnDesuso();
    rodInstance = new BarraControlCadmio(200, stateInstance);
    stateInstance.setBarraControl(rodInstance);
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("Constructor debería llamar al constructor de la clase padre", () => {
    jest.resetModules();

    const EstadoBarraControl =
      require("../../../../src/central_nuclear/barras_control/estados/estado_barra_control").default;
    jest.mock("../../../../src/central_nuclear/barras_control/estados/estado_barra_control");
    const superSpy = jest.spyOn(EstadoBarraControl.prototype, "constructor");

    const EnDesuso = require("../../../../src/central_nuclear/barras_control/estados/en_desuso").default;
    new EnDesuso();

    expect(superSpy).toHaveBeenCalled();
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

  it("Verifica que desactivar tire una excepcion", () => {
    expect(() => rodInstance.desactivar()).toThrow(new DesactivarError());
  });

  it("Verifica que el getter de la barra funcione correctamente", () => {
    expect(stateInstance.getBarraControl()).toBe(rodInstance);
  });

  it("Verifica que el setter de la barra funcione correctamente", () => {
    let rodInstance1 = new BarraControlCadmio(200, stateInstance);
    stateInstance.setBarraControl(rodInstance1);
    expect(stateInstance.getBarraControl()).toBe(rodInstance1);
  });

  it("debería devolver la barra de control al llamar al getter", () => {
    const barraControl = stateInstance.getBarraControl();
    expect(barraControl).toBe(stateInstance["_barraControl"]);
  });
});
