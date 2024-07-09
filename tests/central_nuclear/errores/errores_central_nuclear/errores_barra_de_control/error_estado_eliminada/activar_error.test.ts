import ActivarError from '../../../../../../src/errores/errores_central_nuclear/errores_barras_de_control/error_estado_eliminada/activar_error';
import { Constantes } from "../../../../../../src/central_nuclear/barras_control/constantes";

describe('ActivarError', () => {
    it('debería crear una instancia de ActivarError con el mensaje predeterminado', () => {
      const error = new ActivarError();
      expect(error instanceof ActivarError).toBeTruthy();
      expect(error.message).toBe(Constantes.MENSAJE_BARRA_VENCIDA);
    });
  
    it('debería crear una instancia de ActivarError con un mensaje personalizado', () => {
      const mensajePersonalizado = 'La barra de control está vencida y no puede activarse';
      const error = new ActivarError(mensajePersonalizado);
      expect(error instanceof ActivarError).toBeTruthy();
      expect(error.message).toBe(mensajePersonalizado);
    });
  
    it('debería tener el nombre de "ActivarError"', () => {
      const error = new ActivarError();
      expect(error.name).toBe('ActivarError');
    });
  });