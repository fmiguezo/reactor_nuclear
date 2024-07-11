import BarraControl from "../../../../src/central_nuclear/barras_control/barra_control";
import EstadoBarraControl from "../../../../src/central_nuclear/barras_control/estados/estado_barra_control";
import Insertada from "../../../../src/central_nuclear/barras_control/estados/insertada";
import BarraControlCadmio from "../../../../src/central_nuclear/barras_control/barra_control_cadmio";
import ActivarError from "../../../../src/errores/errores_central_nuclear/errores_barras_de_control/error_estado_insertada/activar_error";
import EnDesuso from "../../../../src/central_nuclear/barras_control/estados/en_desuso";
import { Constantes } from "../../../../src/central_nuclear/barras_control/constantes";
import Eliminada from "../../../../src/central_nuclear/barras_control/estados/eliminada";

describe("Test de Estado Barra de Control: Insertada", () => {
  let rodInstance: BarraControl;
  let stateInstance: Insertada;

  beforeEach(() => {
    jest.useFakeTimers();
    stateInstance = new Insertada();
    rodInstance = new BarraControlCadmio(200, stateInstance);
    stateInstance.setBarraControl(rodInstance);
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("Constructor debería llamar al constructor de la clase padre", () => {
    jest.resetModules();

    const EstadoBarraControl =
      require("../../../../src/central_nuclear/barras_control/estados/estado_barra_control").default;
    jest.mock("../../../../src/central_nuclear/barras_control/estados/estado_barra_control");
    const superSpy = jest.spyOn(EstadoBarraControl.prototype, "constructor");

    const Insertada = require("../../../../src/central_nuclear/barras_control/estados/insertada").default;
    new Insertada();

    expect(superSpy).toHaveBeenCalled();
  });

  it("El constructor deberia settear la fecha ", () => {
    expect(stateInstance["fechaInsertada"]).toBeInstanceOf(Date);
  });

  it("Verifica que el getter de la barra funcione correctamente", () => {
    expect(stateInstance.getBarraControl()).toBe(rodInstance);
  });

  it("Verifica que el setter de la barra funcione correctamente", () => {
    let rodInstance1 = new BarraControlCadmio(200, stateInstance);
    stateInstance.setBarraControl(rodInstance1);
    expect(stateInstance.getBarraControl()).toBe(rodInstance1);
  });

  it("La instancia deberia ser de tipo Insertada", () => {
    expect(stateInstance).toBeInstanceOf(Insertada);
  });

  it("Se verifica el funcionamiento del metodo setBarraControl", () => {
    const crearTimeOutSpy = jest.spyOn(stateInstance as any, "crearTimeOut");
    stateInstance.setBarraControl(rodInstance);
    expect(stateInstance["_barraControl"]).toBe(rodInstance);
    expect(crearTimeOutSpy).toHaveBeenCalledWith(200);
  });

  it("Verifica que esté activo", () => {
    let estado: boolean = stateInstance.estaActivo();
    expect(estado).toBe(true);
  });

  it("Verifica que pueda activarse y desactivarse", () => {
    let estado: boolean = rodInstance.estaActivo();
    expect(estado).toBe(true);

    rodInstance.desactivar();
    estado = rodInstance.estaActivo();
    expect(estado).toBe(false);

    rodInstance.activar();
    estado = rodInstance.estaActivo();
    expect(estado).toBe(true);
  });

  it("El metodo activar deberia lanzar una excepcion", () => {
    expect(() => stateInstance.activar()).toThrow(new ActivarError());
  });

  it("Se verifica el funcionamiento del metodo desactivar cuando timeoutBarra es null", () => {
    const clearTimeoutSpy = jest.spyOn(global, "clearTimeout");
    const actualizarVidaRestanteBarraSpy = jest.spyOn(stateInstance as any, "actualizarVidaRestanteBarra");
    const cambiarEstadoSpy = jest.spyOn(rodInstance as any, "cambiarEstado");
    stateInstance["timeoutBarra"] = null;
    stateInstance.desactivar();
    expect(clearTimeoutSpy).not.toHaveBeenCalled();
    expect(actualizarVidaRestanteBarraSpy).toHaveBeenCalled();
    expect(cambiarEstadoSpy).toHaveBeenCalledWith(expect.any(EnDesuso));
  });

  it("Se verifica que desactivar limpia el timeotBarra si existe", () => {
    const clearTimeoutSpy = jest.spyOn(global, "clearTimeout");
    const actualizarVidaRestanteBarraSpy = jest.spyOn(stateInstance as any, "actualizarVidaRestanteBarra");
    const cambiarEstadoSpy = jest.spyOn(rodInstance as any, "cambiarEstado");
    stateInstance["timeoutBarra"] = setTimeout(() => {}, 1000);
    stateInstance.desactivar();
    expect(clearTimeoutSpy).toHaveBeenCalled();
    expect(actualizarVidaRestanteBarraSpy).toHaveBeenCalled();
    expect(cambiarEstadoSpy).toHaveBeenCalledWith(expect.any(EnDesuso));
  });

  it("Se verifica el metodo calcPctBarra de el valor esperado", () => {
    stateInstance.setBarraControl(rodInstance);
    expect(stateInstance.calcPctBarra()).toBe(
      (rodInstance.getVidaUtilRestante() / Constantes.VIDA_UTIL_BARRA) * Constantes.MULTIPLICADOR_FORMULA_BARRA
    );
  });

  it("Se verifica que el metodo calcDiffTiempoActual devuelva una diferencia logica", () => {
    let fechaInsertada = new Date(Date.now() - 5000);
    stateInstance["fechaInsertada"] = fechaInsertada;
    let diffTiempoActual = (stateInstance as any).calcDiffTiempoActual();
    expect(diffTiempoActual).toBeCloseTo(5000, -2);
  });

  it("Se verifica el metodo actualizarVidaRestanteBarra cuando la vida util de la barra es > 0", () => {
    rodInstance.setVidaUtilRestante(1000);
    stateInstance.setBarraControl(rodInstance);
    const calcDiffTiempoActualSpy = jest.spyOn(stateInstance as any, "calcDiffTiempoActual").mockReturnValue(500);
    const setVidaUtilSpy = jest.spyOn(rodInstance as any, "setVidaUtilRestante");
    (stateInstance as any).actualizarVidaRestanteBarra();
    expect(calcDiffTiempoActualSpy).toHaveBeenCalled();
    expect(setVidaUtilSpy).toHaveBeenCalledWith(500);
  });

  it("Se verifica el metodo actualizarVidaRestanteBarra cuando la vida util de la barra es <= 0", () => {
    rodInstance.setVidaUtilRestante(400);
    stateInstance.setBarraControl(rodInstance);
    const calcDiffTiempoActualSpy = jest.spyOn(stateInstance as any, "calcDiffTiempoActual").mockReturnValue(500);
    const setVidaUtilSpy = jest.spyOn(rodInstance as any, "setVidaUtilRestante");
    const expirarSpy = jest.spyOn(stateInstance as any, "expirar");

    (stateInstance as any).actualizarVidaRestanteBarra();
    expect(calcDiffTiempoActualSpy).toHaveBeenCalled();
    expect(setVidaUtilSpy).toHaveBeenCalledWith(0);
    expect(expirarSpy).toHaveBeenCalled();
  });

  it("Se verifica el metodo crearTimeOut", () => {
    const vidaRestante = 5000;
    const expirarSpy = jest.spyOn(stateInstance as any, "expirar");
    const setTimeoutSpy = jest.spyOn(global, "setTimeout");
    (stateInstance as any).crearTimeOut(vidaRestante);

    expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), vidaRestante);

    const setTimeoutCallback = setTimeoutSpy.mock.calls[0][0] as () => void;
    setTimeoutCallback();
    expect(expirarSpy).toHaveBeenCalledTimes(1);
  });

  it("Se verifica el metodo expirar", () => {
    const cambiarEstadoSpy = jest.spyOn(rodInstance as any, "cambiarEstado");
    (stateInstance as any).expirar();
    expect(cambiarEstadoSpy).toHaveBeenCalledWith(expect.any(Eliminada));
  });

  it("debería devolver la barra de control al llamar al getter", () => {
    const barraControl = stateInstance.getBarraControl();
    expect(barraControl).toBe(stateInstance["_barraControl"]);
  });
});
