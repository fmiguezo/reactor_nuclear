import Energia from "../../../../src/central_nuclear/reactor/reaccion/energia";
import { Constantes } from "../../../../src/central_nuclear/reactor/reaccion/constantes_formula_energia";
describe("Test de Energia", () => {
  let instance: Energia;

  beforeEach(() => {
    instance = new Energia();
  });

  it("Verifica con una temperatura que no pueda generar energía", () => {
    let temp: number = 0;
    expect(Energia.calcularEnergiaNeta(temp)).toBe(Constantes.B_NETA);
    temp = 279;
    expect(Energia.calcularEnergiaNeta(temp)).toBe(Constantes.B_NETA);
  });

  it("Verifica la energía neta producida se corresponda con los valores de la tabla", () => {
    const temp: number[] = [280, 288.33, 296.66, 304.99, 313.32, 321.65, 329.98];
    const energNetaEsperada: number[] = [100, 116.65, 233.32, 349.99, 466.66, 583.33, 700];

    const tolerancia = 2;

    let i = 0;
    temp.forEach((t) => {
      expect(Energia.calcularEnergiaNeta(t)).toBeGreaterThanOrEqual(energNetaEsperada[i] - tolerancia);
      expect(Energia.calcularEnergiaNeta(t)).toBeLessThanOrEqual(energNetaEsperada[i] + tolerancia);
      i++;
    });
  });
});
