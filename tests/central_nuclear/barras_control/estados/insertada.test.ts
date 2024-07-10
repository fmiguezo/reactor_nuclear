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
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("El constructor deberia settear la fecha ", () => {
    expect(stateInstance["fechaInsertada"]).toBeInstanceOf(Date);
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
    // No aseguramos que el timeoutBarra sea null
    stateInstance["timeoutBarra"] = null;
    // Luego desactivamos
    stateInstance.desactivar();

    // Y esto es lo que se espera que suceda:
    // Primero el clearTimeoutSpy no tuvo que haber sido llamado, dado que no entra en el if por que el
    // timeoutBarra === null
    expect(clearTimeoutSpy).not.toHaveBeenCalled();
    // Luego el actualizarVidaRestantesBarraSpy que usamos para poder acceder al metodo privado actualizarVidaRestanteBarra
    // tuvo que haber sido llamado.
    expect(actualizarVidaRestanteBarraSpy).toHaveBeenCalled();
    // Y por ulitmo tiene que pasar lo mismo con el cambio de estado tambien "espiado" de la barra instanciada
    // y este metodo tiene que recibir cualquiera mientras sea del tipo EnDesuso
    expect(cambiarEstadoSpy).toHaveBeenCalledWith(expect.any(EnDesuso));
  });

  it("Se verifica que desactivar limpia el timeotBarra si existe", () => {
    const clearTimeoutSpy = jest.spyOn(global, "clearTimeout");
    const actualizarVidaRestanteBarraSpy = jest.spyOn(stateInstance as any, "actualizarVidaRestanteBarra");
    const cambiarEstadoSpy = jest.spyOn(rodInstance as any, "cambiarEstado");
    // Le damos un balor al timeoutBarra
    stateInstance["timeoutBarra"] = setTimeout(() => {}, 1000);
    // Luego desactivamos
    stateInstance.desactivar();

    // Y esto es lo que se espera que suceda:
    // Primero el clearTimeoutSpy es llamado dado que el timeoutBarra !== null
    expect(clearTimeoutSpy).toHaveBeenCalled();
    // Luego el actualizarVidaRestantesBarraSpy que usamos para poder acceder al metodo privado actualizarVidaRestanteBarra
    // tuvo que haber sido llamado.
    expect(actualizarVidaRestanteBarraSpy).toHaveBeenCalled();
    // Y por ulitmo tiene que pasar lo mismo con el cambio de estado tambien "espiado" de la barra instanciada
    // y este metodo tiene que recibir cualquiera mientras sea del tipo EnDesuso
    expect(cambiarEstadoSpy).toHaveBeenCalledWith(expect.any(EnDesuso));
  });

  it("Se verifica el metodo calcPctBarra de el valor esperado", () => {
    stateInstance.setBarraControl(rodInstance);
    expect(stateInstance.calcPctBarra()).toBe(
      (rodInstance.getVidaUtilRestante() / Constantes.VIDA_UTIL_BARRA) * Constantes.MULTIPLICADOR_FORMULA_BARRA
    );
  });

  it("Se verifica que el metodo calcDiffTiempoActual devuelva una diferencia logica", () => {
    // Creo una fecha que sea mas antigua que la actual, en este caso: 5000 ms en el pasado
    let fechaInsertada = new Date(Date.now() - 5000);
    // Establesco el valor de la fecha insertada dentro del stateInstance.
    stateInstance["fechaInsertada"] = fechaInsertada;
    // Llamo al metodo privado calcDiffTiempoActual usando:
    // (insertada as any) es una técnica de TypeScript que permite eludir la verificación
    // de tipos y acceder a métodos privados o protegidos.
    let diffTiempoActual = (stateInstance as any).calcDiffTiempoActual();
    // Esta línea verifica que el valor devuelto por calcDiffTiempoActual esté cercano a 5000 milisegundos.
    // toBeCloseTo(5000, -2) usa una función de Jest que compara números con una tolerancia. Aquí, 5000 es el
    // valor esperado y -2 es el número de dígitos a considerar para la comparación.
    // -2 en toBeCloseTo indica que la comparación debería ser precisa hasta los dos dígitos más cercanos, lo
    // que significa que cualquier valor entre 4998 y 5002 sería considerado válido.
    expect(diffTiempoActual).toBeCloseTo(5000, -2);
  });

  it("Se verifica el metodo actualizarVidaRestanteBarra cuando la vida util de la barra es > 0", () => {
    rodInstance.setVidaUtilRestante(1000);
    stateInstance.setBarraControl(rodInstance);
    // Lo que hago es forsar que el calcDiffTiempoActualSpy devuelva 500
    const calcDiffTiempoActualSpy = jest.spyOn(stateInstance as any, "calcDiffTiempoActual").mockReturnValue(500);
    const setVidaUtilSpy = jest.spyOn(rodInstance as any, "setVidaUtilRestante");
    // Usando el as any, puedo usar el metodo privado
    (stateInstance as any).actualizarVidaRestanteBarra();
    // Esto es lo que espero que suceda:
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
    // Esto es lo que espero que suceda:
    expect(calcDiffTiempoActualSpy).toHaveBeenCalled(); // 400 - 500, pero se establece a 0
    expect(setVidaUtilSpy).toHaveBeenCalledWith(0);
    expect(expirarSpy).toHaveBeenCalled();
  });

  it("Se verifica el metodo crearTimeOut", () => {
    const vidaRestante = 5000; // Tiempo de vida restante en milisegundos
    const expirarSpy = jest.spyOn(stateInstance as any, "expirar"); // Espía el método expirar
    const setTimeoutSpy = jest.spyOn(global, "setTimeout"); // Espía global.setTimeout

    // Llamo al método que quiero probar
    (stateInstance as any).crearTimeOut(vidaRestante);

    // Verifica que se alla llamado a el setTimeout una vez
    expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
    // Verifica que setTimeout haya sido llamado con la función expirar
    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), vidaRestante);
    // Simula la ejecución de la función que setTimeout debería llamar
    const setTimeoutCallback = setTimeoutSpy.mock.calls[0][0] as () => void;
    setTimeoutCallback(); // Simula que expira el tiempo (Linea de codigo magica sacada de un lugar fantastico)

    // Verifica que expirar haya sido llamado después de expirar el tiempo
    expect(expirarSpy).toHaveBeenCalledTimes(1);
  });

  it("Se verifica el metodo expirar", () => {
    const cambiarEstadoSpy = jest.spyOn(rodInstance as any, "cambiarEstado");
    (stateInstance as any).expirar();
    expect(cambiarEstadoSpy).toHaveBeenCalledWith(expect.any(Eliminada));
  });
});
