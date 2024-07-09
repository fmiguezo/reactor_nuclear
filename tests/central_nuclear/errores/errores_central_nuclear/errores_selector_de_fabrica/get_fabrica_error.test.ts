import getFabricaError from "../../../../../src/errores/errores_central_nuclear/errores_selector_fabrica/get_fabrica_error";
import { Constantes } from "../../../../../src/central_nuclear/barras_control/constantes";


describe('getFabricaError', () => {
    it('debería crear una instancia de getFabricaError con el mensaje predeterminado', () => {
      const error = new getFabricaError();
      expect(error instanceof getFabricaError).toBeTruthy();
      expect(error.message).toBe(Constantes.MENSAJE_FABRICA_NO_ENCONTRADA);
    });
  
    it('debería crear una instancia de getFabricaError con un mensaje personalizado', () => {
      const mensajePersonalizado = 'Error al obtener la fábrica';
      const error = new getFabricaError(mensajePersonalizado);
      expect(error instanceof getFabricaError).toBeTruthy();
      expect(error.message).toBe(mensajePersonalizado);
    });
  
    it('debería tener el nombre de "getFabricaError"', () => {
      const error = new getFabricaError();
      expect(error.name).toBe('getFabricaError');
    });
  });