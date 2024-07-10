import Energia from "../../../../src/central_nuclear/reactor/reaccion/energia";
import { Constantes } from "../../../../src/central_nuclear/reactor/reaccion/constantes_formula_energia";
import EnergiaTermalCalculationError from "../../../../src/errores/errores_central_nuclear/errores_reaccion/error_energia/energia_termal_calculation_error";
import EnergiaNetaCalculationError from "../../../../src/errores/errores_central_nuclear/errores_reaccion/error_energia/energia_neta_calculation_error";

describe("Test de Energia", () => {
  describe("Tests del cálculo de energía termal", () => {
    it("debería lanzar un error cuando la temperatura es menor que la mínima para producir energía", () => {
      const temp: number = Constantes.MIN_TEMPERATURA - 1;
      expect(() => Energia.calcularEnergiaTermal(temp)).toThrow(EnergiaTermalCalculationError);
      expect(() => Energia.calcularEnergiaTermal(temp)).toThrow(Constantes.MENSAJE_TEMP_MIN_INSUFICIENTE);
    });

    it("debería calcular correctamente la energía termal con una temperatura válida (según la tabla)", () => {
      const temp: number = 280;
      expect(Energia.calcularEnergiaTermal(temp)).toBe(2100);
    });

    it("debería lanzar un error cuando la energía termal es menor que la mínima permitida", () => {
      const energiaTermal = Constantes.PRODUCCCION_MINIMA_ENERGIA_TERMAL - 1;
      expect(() => Energia.calcularEnergiaNeta(energiaTermal)).toThrow(EnergiaNetaCalculationError);
      expect(() => Energia.calcularEnergiaNeta(energiaTermal)).toThrow(Constantes.MENSAJE_TEMP_MIN_INSUFICIENTE);
    });
  });

  describe("Test de cálculo de energía neta", () => {
    it("debería calcular correctamente la energía neta cuando la energía termal es igual a la mínima permitida", () => {
      const energiaTermal = Constantes.PRODUCCCION_MINIMA_ENERGIA_TERMAL;
      expect(Energia.calcularEnergiaNeta(energiaTermal)).toBe(100);
    });

    it("debería calcular correctamente la energía neta con energía termal válida (para 2100, 100)", () => {
      const energiaTermal = 2100;
      expect(Energia.calcularEnergiaNeta(energiaTermal)).toBe(100);
    });

    it("debería calcular correctamente la energía neta con energía termal válida (para 2166.67, 116.65)", () => {
      const energiaTermal = 2166.67;
      expect(Energia.calcularEnergiaNeta(energiaTermal)).toBe(116.65);
    });

    it("debería calcular correctamente la energía neta con energía termal válida (para 2233.34, 233.32)", () => {
      const energiaTermal = 2233.34;
      const energiaNeta = Energia.calcularEnergiaNeta(energiaTermal);
      expect(energiaNeta).toBe(233.32);
    });
  });

  it("Verifica que la energía neta producida se corresponda con los valores de la tabla", () => {
    const temp: number[] = [280, 288.33, 296.66, 304.99, 313.32, 321.65, 329.98];
    const energNetaEsperada: number[] = [100, 116.65, 233.32, 349.99, 466.66, 583.33, 700];
    const tolerancia = 2;

    temp.forEach((t, i) => {
      const energiaTermal = Energia.calcularEnergiaTermal(t);
      const energiaNeta = Energia.calcularEnergiaNeta(energiaTermal);
      expect(energiaNeta).toBeGreaterThanOrEqual(energNetaEsperada[i] - tolerancia);
      expect(energiaNeta).toBeLessThanOrEqual(energNetaEsperada[i] + tolerancia);
    });
  });
});
