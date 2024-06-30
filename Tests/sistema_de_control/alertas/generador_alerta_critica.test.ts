import AlertaCritica from "../../../src/sistema_de_control/alertas/alerta_critica";
import GeneradorDeAlertasCriticas from "../../../src/sistema_de_control/alertas/generador_alerta_critica";

describe("Test de la clase GeneradorDeAlertasCriticas", () => {
  let instance: GeneradorDeAlertasCriticas;

  beforeEach(() => {
    instance = new GeneradorDeAlertasCriticas();
  });

  it("Verifica que la instancia sea de GeneradorDeAlertasCriticas", () => {
    expect(instance).toBeInstanceOf(GeneradorDeAlertasCriticas);
  });

  it("Verifica que el objeto retornado sea de tipo AlertaCritica", () => {
    expect(GeneradorDeAlertasCriticas.generarAlerta()).toBeInstanceOf(AlertaCritica);
  });
});
