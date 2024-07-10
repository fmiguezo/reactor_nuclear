import Eliminada from "../../../../src/central_nuclear/barras_control/estados/eliminada";
import ActivarError from "../../../../src/errores/errores_central_nuclear/errores_barras_de_control/error_estado_eliminada/activar_error";
import DesactivarError from "../../../../src/errores/errores_central_nuclear/errores_barras_de_control/error_estado_eliminada/desactivar_error";
import RegistroBarrasUsadas from "../../../../src/sistema_de_control/registros/registro_barras_usadas";
import BarraControlCadmio from "../../../../src/central_nuclear/barras_control/barra_control_cadmio";

describe("Eliminada", () => {
  let eliminada: Eliminada;
  let rodInstance: BarraControlCadmio;
  beforeEach(() => {
    eliminada = new Eliminada();
    rodInstance = new BarraControlCadmio(200,eliminada);
    eliminada.setBarraControl(rodInstance);
  });

  it("Constructor debería llamar a reportarVencimiento", () => {
    const insertarRegistroSpy = jest.spyOn(RegistroBarrasUsadas.instancia, "insertarRegistro");
    new Eliminada(); // Llamamos al constructor para verificar su comportamiento
    expect(insertarRegistroSpy).toHaveBeenCalledWith(1);
  });

  it("estaActivo debería devolver falso", () => {
    expect(eliminada.estaActivo()).toBe(false);
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
    expect(eliminada.calcPctBarra()).toBe(0);
  });

  it("reportarVencimiento debería insertar el registo en RegistroBarrasUsadas", () => {
    const insertarRegistroSpy = jest.spyOn(RegistroBarrasUsadas.instancia, "insertarRegistro");
    // Accedemos al método privado usando la indexación de propiedades
    // @ts-ignore
    eliminada["reportarVencimiento"]();
    expect(insertarRegistroSpy).toHaveBeenCalledWith(1);
  });

  it('Verifica que el getter de la barra funcione correctamente', () => {
    expect(eliminada.getBarraControl()).toBe(rodInstance);
  });

  it('Verifica que el setter de la barra funcione correctamente', () => {
    let rodInstance1 = new BarraControlCadmio(200, eliminada);
    eliminada.setBarraControl(rodInstance1);
    expect(eliminada.getBarraControl()).toBe(rodInstance1);
  });

});
