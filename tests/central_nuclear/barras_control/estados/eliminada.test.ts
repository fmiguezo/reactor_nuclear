import Eliminada from "../../../../src/central_nuclear/barras_control/estados/eliminada";
import { Constantes } from "../../../../src/central_nuclear/barras_control/constantes";
import ActivarError from "../../../../src/errores/errores_central_nuclear/errores_barras_de_control/error_estado_eliminada/activar_error";
import DesactivarError from "../../../../src/errores/errores_central_nuclear/errores_barras_de_control/error_estado_eliminada/desactivar_error";
import RegistroBarrasUsadas from "../../../../src/sistema_de_control/registros/registro_barras_usadas";
import BarraControlCadmio from "../../../../src/central_nuclear/barras_control/barra_control_cadmio";

describe('Eliminada', () => {
  let eliminada: Eliminada;
  let rodInstance: BarraControlCadmio;
  beforeEach(() => {
    eliminada = new Eliminada();
    rodInstance = new BarraControlCadmio(200,eliminada);
    eliminada.setBarraControl(rodInstance);
  });

  it('Constructor should call reportarVencimiento', () => {
    const insertarRegistroSpy = jest.spyOn(RegistroBarrasUsadas.instancia, 'insertarRegistro');
    new Eliminada(); // Llamamos al constructor para verificar su comportamiento
    expect(insertarRegistroSpy).toHaveBeenCalledWith(1);
  });

  it('estaActivo should return false', () => {
    expect(eliminada.estaActivo()).toBe(false);
  });

  it('activar should throw ActivarError with correct message', () => {
    expect(() => eliminada.activar()).toThrow(ActivarError);
    expect(() => eliminada.activar()).toThrow(Constantes.MENSAJE_BARRA_VENCIDA);
  });

  it('desactivar should throw DesactivarError with correct message', () => {
    expect(() => eliminada.desactivar()).toThrow(DesactivarError);
    expect(() => eliminada.desactivar()).toThrow(Constantes.MENSAJE_BARRA_VENCIDA);
  });

  it('calcPctBarra should return 0', () => {
    expect(eliminada.calcPctBarra()).toBe(0);
  });

  it('reportarVencimiento should insert record in RegistroBarrasUsadas', () => {
    const insertarRegistroSpy = jest.spyOn(RegistroBarrasUsadas.instancia, 'insertarRegistro');
    // Accedemos al método privado usando la indexación de propiedades
    // @ts-ignore
    eliminada['reportarVencimiento']();
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
