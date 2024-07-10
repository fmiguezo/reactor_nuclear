import Energia from "../../../../src/central_nuclear/reactor/reaccion/energia";
import { Constantes } from "../../../../src/central_nuclear/reactor/reaccion/constantes_formula_energia";
import EnergiaTermalCalculationError from "../../../../src/errores/errores_central_nuclear/errores_reaccion/error_energia/energia_termal_calculation_error";
import EnergiaNetaCalculationError from "../../../../src/errores/errores_central_nuclear/errores_reaccion/error_energia/energia_neta_calculation_error";
describe("Test de Energia", () => {

  it("Verifica que lanzar un error cuando la temperatura es menor que la mínima permitida", () => {
    const temp: number = Constantes.MIN_TEMPERATURA - 1;
    expect(() => Energia.calcularEnergiaTermal(temp)).toThrow(EnergiaTermalCalculationError);
    expect(() => Energia.calcularEnergiaTermal(temp)).toThrow(Constantes.MENSAJE_TEMP_MIN_INSUFICIENTE);
  });

  it("Verifica que calcular correctamente la energía termal con una temperatura válida", () => {
    const temp: number = 280;
    const expectedEnergiaTermal = Number((Constantes.M_TERMAL * temp + Constantes.B_TERMAL).toFixed(2));
    expect(Energia.calcularEnergiaTermal(temp)).toBe(expectedEnergiaTermal);
  });

  it("Verifica que lanzar un error cuando la energía termal es menor que la mínima permitida", () => {
    const energiaTermal = Constantes.PRODUCCCION_MINIMA_ENERGIA_TERMAL - 1;
    expect(() => Energia.calcularEnergiaNeta(energiaTermal)).toThrow(EnergiaNetaCalculationError);
    expect(() => Energia.calcularEnergiaNeta(energiaTermal)).toThrow(Constantes.MENSAJE_TEMP_MIN_INSUFICIENTE);
  });

  it("Verifica que calcular correctamente la energía neta cuando la energía termal es igual a la mínima permitida", () => {
    const energiaTermal = Constantes.PRODUCCCION_MINIMA_ENERGIA_TERMAL;
    expect(Energia.calcularEnergiaNeta(energiaTermal)).toBe(100);
  });

  it("Verifica que calcular correctamente la energía neta con energía termal válida", () => {
    const energiaTermal = Constantes.PRODUCCCION_MINIMA_ENERGIA_TERMAL + 1;
    const expectedEnergiaNeta = Number((Constantes.M_NETA * energiaTermal + Constantes.B_NETA).toFixed(2));
    expect(Energia.calcularEnergiaNeta(energiaTermal)).toBe(expectedEnergiaNeta);
  });

  it("Verifica la energía neta producida se corresponda con los valores de la tabla", () => {
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

  it("Verifica el cálculo de energía neta en el borde superior del umbral", () => {
    const energiaTermal = Constantes.PRODUCCCION_MINIMA_ENERGIA_TERMAL;
    expect(Energia.calcularEnergiaNeta(energiaTermal)).toBe(100);
  });
  
  it("Verifica el cálculo de energía neta para valores altos de energía termal", () => {
    const energiaTermal = 2200;
    const expectedEnergiaNeta = Number((Constantes.M_NETA * energiaTermal + Constantes.B_NETA).toFixed(2));
    const actualEnergiaNeta = Energia.calcularEnergiaNeta(energiaTermal);
    expect(actualEnergiaNeta).toBe(expectedEnergiaNeta);
  });

  it("Verifica que calcular correctamente la energía termal cuando la temperatura es exactamente la mínima permitida", () => {
    const temp = Constantes.MIN_TEMPERATURA;
    const expectedEnergiaTermal = Number((Constantes.M_TERMAL * temp + Constantes.B_TERMAL).toFixed(2));
    expect(Energia.calcularEnergiaTermal(temp)).toBe(expectedEnergiaTermal);
  });
});