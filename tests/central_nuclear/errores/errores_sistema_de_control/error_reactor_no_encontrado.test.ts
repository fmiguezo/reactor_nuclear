import ReactorNoEncontradoError from '../../../../src/errores/errores_sistema_de_control/error_reactor_no_encontrado';
import { Constantes } from "../../../../src/central_nuclear/reactor/constantes";

describe('ReactorNoEncontradoError', () => {
  it('debería crear una instancia de ReactorNoEncontradoError con el mensaje predeterminado', () => {
    const error = new ReactorNoEncontradoError();
    expect(error instanceof ReactorNoEncontradoError).toBeTruthy();
    expect(error.message).toBe(Constantes.NO_SE_ENCONTRO_REACTOR);
  });

  it('debería crear una instancia de ReactorNoEncontradoError con un mensaje personalizado', () => {
    const mensajePersonalizado = 'No se encontró el reactor especificado';
    const error = new ReactorNoEncontradoError(mensajePersonalizado);
    expect(error instanceof ReactorNoEncontradoError).toBeTruthy();
    expect(error.message).toBe(mensajePersonalizado);
  });

  it('debería tener el nombre de "ReactorNoEncontradoError"', () => {
    const error = new ReactorNoEncontradoError();
    expect(error.name).toBe('ReactorNoEncontradoError');
  });
});