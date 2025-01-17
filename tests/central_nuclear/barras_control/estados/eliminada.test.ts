import Eliminada from "../../../../src/central_nuclear/barras_control/estados/eliminada";
import ActivarError from "../../../../src/errores/errores_central_nuclear/errores_barras_de_control/error_estado_eliminada/activar_error";
import DesactivarError from "../../../../src/errores/errores_central_nuclear/errores_barras_de_control/error_estado_eliminada/desactivar_error";
import RegistroBarrasUsadas from "../../../../src/sistema_de_control/registros/registro_barras_usadas";
import BarraControlCadmio from "../../../../src/central_nuclear/barras_control/barra_control_cadmio";
import EstadoBarraControl from "../../../../src/central_nuclear/barras_control/estados/estado_barra_control";

describe("Eliminada", () => {
  let eliminada: Eliminada;
  let rodInstance: BarraControlCadmio;

  beforeEach(() => {
    eliminada = new Eliminada();
    rodInstance = new BarraControlCadmio(200, eliminada);
    eliminada.setBarraControl(rodInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it("Constructor debería llamar al constructor de la clase padre", () => {
    jest.resetModules();

    const EstadoBarraControl =
      require("../../../../src/central_nuclear/barras_control/estados/estado_barra_control").default;
    jest.mock("../../../../src/central_nuclear/barras_control/estados/estado_barra_control");

    const superSpy = jest.spyOn(EstadoBarraControl.prototype, "constructor");

    const Eliminada = require("../../../../src/central_nuclear/barras_control/estados/eliminada").default;
    new Eliminada();

    expect(superSpy).toHaveBeenCalled();
  });

  it("Constructor debería llamar a reportarVencimiento", () => {
    const insertarRegistroSpy = jest.spyOn(RegistroBarrasUsadas.instancia, "insertarRegistro");
    new Eliminada();
    expect(insertarRegistroSpy).toHaveBeenCalledWith(1);
  });

  it("estaActivo debería devolver falso", () => {
    let activo = eliminada.estaActivo();
    expect(activo).toBe(false);
  });

  it("activar debería tirar ActivarError con el mensaje de barra vencida", () => {
    expect(() => eliminada.activar()).toThrow(ActivarError);
    expect(() => eliminada.activar()).toThrow("La barra está vencida. No puede utilizarse.");
  });

  it("desactivar debería tirar DesactivarError con el mensaje de barra vencida", () => {
    expect(() => eliminada.desactivar()).toThrow(DesactivarError);
    expect(() => eliminada.desactivar()).toThrow("La barra está vencida. No puede utilizarse.");
  });

  it("calcPctBarra debería devolver 0", () => {
    let pctBarra = eliminada.calcPctBarra();
    expect(pctBarra).toBe(0);
  });

  it("reportarVencimiento debería insertar el registo en RegistroBarrasUsadas", () => {
    const insertarRegistroSpy = jest.spyOn(RegistroBarrasUsadas.instancia, "insertarRegistro");
    eliminada["reportarVencimiento"]();
    expect(insertarRegistroSpy).toHaveBeenCalledWith(1);
  });

  it("Verifica que el getter de la barra funcione correctamente", () => {
    let barra = eliminada.getBarraControl();
    expect(barra).toBe(rodInstance);
  });

  it("Verifica que el setter de la barra funcione correctamente", () => {
    let rodInstance1 = new BarraControlCadmio(200, eliminada);
    eliminada.setBarraControl(rodInstance1);
    let barra = eliminada.getBarraControl();
    expect(barra).toBe(rodInstance1);
  });

  it("debería retornar falso en estaActivo()", () => {
    expect(eliminada.estaActivo()).toBe(false);
  });

  it("debería lanzar un ActivarError al intentar activar()", () => {
    expect(() => {
      eliminada.activar();
    }).toThrow(ActivarError);
  });

  it("debería devolver la barra de control al llamar al getter", () => {
    const barraControl = eliminada.getBarraControl();
    expect(barraControl).toBe(eliminada["_barraControl"]);
  });

  it("Constructor debería llamar a reportarVencimiento", () => {
    const insertarRegistroSpy = jest.spyOn(RegistroBarrasUsadas.instancia, "insertarRegistro");
    new Eliminada();
    expect(insertarRegistroSpy).toHaveBeenCalledWith(1);
  });

  it("activar y desactivar no deben alterar la barra de control", () => {
    const initialBarraControl = eliminada.getBarraControl();

    try {
      eliminada.activar();
    } catch (e) {
      // tendría que lanzar un error
    }

    try {
      eliminada.desactivar();
    } catch (e) {
      // tendría que lanzar un error
    }

    expect(eliminada.getBarraControl()).toBe(initialBarraControl);
  });
});
