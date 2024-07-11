import AlertaApagado from "../../../src/sistema_de_control/alertas/alerta_apagado";
import GeneradorDeAlertaApagado from "../../../src/sistema_de_control/alertas/generador_alerta_apagado";

describe("Test de la clase GeneradorDeAlertasCriticas", () => {
  let instance: GeneradorDeAlertaApagado;

  beforeEach(() => {
    instance = new GeneradorDeAlertaApagado();
  });

  it("Verifica que la instancia sea de GeneradorDeAlertasCriticas", () => {
    expect(instance).toBeInstanceOf(GeneradorDeAlertaApagado);
  });

  it("Verifica que el objeto retornado sea de tipo AlertaCritica", () => {
    expect(GeneradorDeAlertaApagado.generarAlerta()).toBeInstanceOf(AlertaApagado);
  });
});
