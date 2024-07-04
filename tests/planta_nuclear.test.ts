import Reactor from "../src/central_nuclear/reactor/reactor";
import PlantaNuclear from "../src/planta_nuclear";
import Sistema from "../src/sistema_de_control/sistema";

describe("Test de la clase AlertaEstandar", () => {
  let instance: PlantaNuclear;
  let instanceSistema: Sistema;
  let instanceReactor: Reactor;

  beforeEach(() => {
    instance = new PlantaNuclear();
    instanceSistema = new Sistema(instance);
  });

  it("Verifica que la instancia sea de Planta nuclear", () => {
    expect(instance).toBeInstanceOf(PlantaNuclear);
  });

  it("Verifica que el setter y el getter del sistema sea correcto", () => {
    instance.setSistema(instanceSistema);
    expect(instance.getSistema()).toBeInstanceOf(Sistema);
  });

  it("Verifica que el getter de los reactores devuelva un array de ellos ", () => {
    expect(Array.isArray(instance.getReactores())).toBe(true);
  });

  it("Verifica que el cargarSistema funcione correctamente", () => {
    instance.cargarSistema(instanceSistema);
    expect(instance.getSistema()).toBeInstanceOf(Sistema);
  });

  test("debería agregar reactores a la lista", () => {
    const reactor1 = new Reactor();
    const reactor2 = new Reactor();

    instance.agregarReactores(reactor1);
    instance.agregarReactores(reactor2);
    
    expect(instance.getReactores()).toHaveLength(2);
  });
});
