import FabricaBarraCadmio from "../../../../src/central_nuclear/barras_control/fabrica/fabrica_barra_cadmio";
import SelectorFabricaBarra from "../../../../src/central_nuclear/barras_control/fabrica/selector_fabrica";

describe("Testea el selector de fabrica de barras", () => {
  let selector: SelectorFabricaBarra;

  beforeEach(() => {
    (SelectorFabricaBarra as any)._instancia = null;
    selector = SelectorFabricaBarra.getInstancia();
  });

  it("deberia retornar una nueva fábrica", () => {
    const fabricaBarraCadmio = selector.getFabrica("cadmio");
    expect(fabricaBarraCadmio).toBeInstanceOf(FabricaBarraCadmio);
  });

  it("debería retornar una excepción", () => {
    expect(() => {
      selector.getFabrica("unaFabricaQueNoExiste");
    }).toThrow("No existe la fabrica");
  });
});
