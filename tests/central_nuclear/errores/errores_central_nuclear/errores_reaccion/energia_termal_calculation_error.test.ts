import EnergiaTermalCalculationError from "../../../../../src/errores/errores_central_nuclear/errores_reaccion/error_energia/energia_termal_calculation_error"
import { Constantes } from "../../../../../../reactor_nuclear/src/central_nuclear/reactor/reaccion/constantes_formula_energia";


describe('EnergiaTermalCalculationError', () => {
    it('debería crear una instancia de EnergiaTermalCalculationError con el mensaje predeterminado', () => {
      const error = new EnergiaTermalCalculationError();
      expect(error instanceof EnergiaTermalCalculationError).toBeTruthy();
      expect(error.message).toBe(Constantes.MENSAJE_TEMP_MIN_INSUFICIENTE);
    });
  
    it('debería crear una instancia de EnergiaTermalCalculationError con un mensaje personalizado', () => {
      const mensajePersonalizado = 'Error en el cálculo de la energía termal';
      const error = new EnergiaTermalCalculationError(mensajePersonalizado);
      expect(error instanceof EnergiaTermalCalculationError).toBeTruthy();
      expect(error.message).toBe(mensajePersonalizado);
    });
  
    it('debería tener el nombre de "EnergiaTermalCalculationError"', () => {
      const error = new EnergiaTermalCalculationError();
      expect(error.name).toBe('EnergiaTermalCalculationError');
    });
  });