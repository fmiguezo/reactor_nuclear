import DesactivarError from '../../../../../../src/errores/errores_central_nuclear/errores_barras_de_control/error_estado_en_desuso/desactivar_error';
import { Constantes } from "../../../../../../src/central_nuclear/barras_control/constantes";

describe('DesactivarError', () => {
    it('debería crear una instancia de DesactivarError con el mensaje predeterminado', () => {
      const error = new DesactivarError();
      expect(error instanceof DesactivarError).toBeTruthy();
      expect(error.message).toBe(Constantes.MENSAJE_BARRA_VENCIDA);
    });
  
    it('debería crear una instancia de DesactivarError con un mensaje personalizado', () => {
      const mensajePersonalizado = 'La barra de control está vencida y no puede desactivarse';
      const error = new DesactivarError(mensajePersonalizado);
      expect(error instanceof DesactivarError).toBeTruthy();
      expect(error.message).toBe(mensajePersonalizado);
    });
  
    it('debería tener el nombre de "DesactivarError"', () => {
      const error = new DesactivarError();
      expect(error.name).toBe('DesactivarError');
    });
  });
