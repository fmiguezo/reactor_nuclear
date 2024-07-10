import Reactor from "../src/central_nuclear/reactor/reactor";
import PlantaNuclear from "../src/planta_nuclear";
import Sistema from "../src/sistema_de_control/sistema";

describe("Test de la clase AlertaEstandar", () => {
  let instance: PlantaNuclear;
  let instanceSistema: Sistema;

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
    const mapaReactores: Map<number, Reactor> = instance.getReactores();
    expect(mapaReactores.get.length).toBeGreaterThan(0);
    expect(mapaReactores).toBeInstanceOf(Map);
  });

  it("Verifica que el cargarSistema funcione correctamente", () => {
    instance.cargarSistema(instanceSistema);
    expect(instance.getSistema()).toBeInstanceOf(Sistema);
  });

  test("debería agregar reactores a la lista", () => {
    // Instancia los reactores
    const reactor1 = new Reactor();
    const reactor2 = new Reactor();

    // Setea distintos IDs. Si tiene el mismo ID, nunca va a haber dos reactores.
    reactor1.id = 0;
    reactor2.id = 1;

    // Carga reactores en el Map
    instance.agregarReactores(reactor1);
    instance.agregarReactores(reactor2);

    const mapaReactores: Map<number, Reactor> = instance.getReactores();

    // Verifica que hayan quedado cargados
    expect(mapaReactores.get(0)).toBe(reactor1);
    expect(mapaReactores.get(1)).toBe(reactor2);

    // Verifica que el Map tenga 2 elementos
    expect(mapaReactores.size).toBe(2);
  });
});
