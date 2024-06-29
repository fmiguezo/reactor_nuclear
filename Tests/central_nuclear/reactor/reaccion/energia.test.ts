import Energia from "../../../../src/central_nuclear/reactor/reaccion/energia";
import { Constantes } from "../../../../src/central_nuclear/reactor/reaccion/constantes_formula_energia";
describe("Test de Energia", () => {
  let instance: Energia;

  beforeEach(() => {
    instance = new Energia();
  });

  it("Verifica con una temperatura de 0 no se puede generar energia termal", () => {
    let temp: number = 0;
    expect(() => Energia.calcularEnergiaTermal(temp)).toThrow(new Error(Constantes.MENSAJE_TEMP_MIN_INSUFICIENTE));
  })

  it("Verifica con una temperatura de 280 generara 2100", () => {
    let temp: number = 280;
    expect(Energia.calcularEnergiaTermal(temp)).toBe(2100);
  })

  it("Verifica con una temperatura de 0 no puede generar energia neta", () => {
    let temp: number = 0;
    expect(() => Energia.calcularEnergiaNeta(Energia.calcularEnergiaTermal(temp))).toThrow(Constantes.MENSAJE_TEMP_MIN_INSUFICIENTE);
  });

  it("Verifica con una temperatura de 280, genera una energia neta de 100", () => {
    let temp: number = 280;
    expect(Energia.calcularEnergiaNeta(Energia.calcularEnergiaTermal(temp))).toBe(100);
  });

  it("Verifica con una temperatura de 288.33, genera una energia neta de 116.65", () => {
    let temp: number = 288.33;
    expect(Energia.calcularEnergiaNeta(Energia.calcularEnergiaTermal(temp))).toBe(116.65);
  });

  it("Verifica la energía neta producida se corresponda con los valores de la tabla", () => {
    const temp: number[] = [280, 288.33, 296.66, 304.99, 313.32, 321.65, 329.98];
    const energNetaEsperada: number[] = [100, 116.65, 233.32, 349.99, 466.66, 583.33, 700];

    const tolerancia = 2;

    let i = 0;
    temp.forEach((t) => {
      expect(Energia.calcularEnergiaNeta(Energia.calcularEnergiaTermal(t))).toBeGreaterThanOrEqual(energNetaEsperada[i] - tolerancia);
      expect(Energia.calcularEnergiaNeta(Energia.calcularEnergiaTermal(t))).toBeLessThanOrEqual(energNetaEsperada[i] + tolerancia);
      i++;
    });
  });
});
