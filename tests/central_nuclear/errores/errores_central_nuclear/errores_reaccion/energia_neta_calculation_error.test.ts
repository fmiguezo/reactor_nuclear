import EnergiaNetaCalculationError from "../../../../../src/errores/errores_central_nuclear/errores_reaccion/error_energia/energia_neta_calculation_error"
import { Constantes } from "../../../../../../reactor_nuclear/src/central_nuclear/reactor/reaccion/constantes_formula_energia";

describe('EnergiaNetaCalculationError', () => {
    it('debería crear una instancia de EnergiaNetaCalculationError con el mensaje predeterminado', () => {
      const error = new EnergiaNetaCalculationError();
      expect(error instanceof EnergiaNetaCalculationError).toBeTruthy();
      expect(error.message).toBe(Constantes.MENSAJE_TEMP_MIN_INSUFICIENTE);
    });
  
    it('debería crear una instancia de EnergiaNetaCalculationError con un mensaje personalizado', () => {
      const mensajePersonalizado = 'Error en el cálculo de la energía neta';
      const error = new EnergiaNetaCalculationError(mensajePersonalizado);
      expect(error instanceof EnergiaNetaCalculationError).toBeTruthy();
      expect(error.message).toBe(mensajePersonalizado);
    });
  
    it('debería tener el nombre de "EnergiaNetaCalculationError"', () => {
      const error = new EnergiaNetaCalculationError();
      expect(error.name).toBe('EnergiaNetaCalculationError');
    });
  });