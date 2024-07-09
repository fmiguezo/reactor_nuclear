import { Constantes } from "../../../../../src/central_nuclear/reactor/constantes";
import SubirBarrasError from "../../../../../src/errores/errores_central_nuclear/errores_del_administrador_de_barras/subir_barras_error";

describe('SubirBarrasError', () => {
    it('debería crear una instancia de SubirBarrasError con el mensaje predeterminado', () => {
      const error = new SubirBarrasError();
      expect(error instanceof SubirBarrasError).toBeTruthy();
      expect(error.message).toBe(Constantes.NO_PUEDE_SUBIR_BARRA);
    });
  
    it('debería crear una instancia de SubirBarrasError con un mensaje personalizado', () => {
      const mensajePersonalizado = 'Error al intentar subir las barras de control';
      const error = new SubirBarrasError(mensajePersonalizado);
      expect(error instanceof SubirBarrasError).toBeTruthy();
      expect(error.message).toBe(mensajePersonalizado);
    });
  
    it('debería tener el nombre de "SubirBarrasError"', () => {
      const error = new SubirBarrasError();
      expect(error.name).toBe('SubirBarrasError');
    });
  });


