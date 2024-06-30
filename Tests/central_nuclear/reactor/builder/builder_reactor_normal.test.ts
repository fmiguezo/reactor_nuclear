import AdministradorBarras from "../../../../src/central_nuclear/reactor/administrador/administrador_barras";
import BuilderReactorNormal from "../../../../src/central_nuclear/reactor/builder/builder_reactor_normal";
import Reactor from "../../../../src/central_nuclear/reactor/reactor";
import ISensor from "../../../../src/central_nuclear/interfaces/isensor";
import PlantaNuclear from "../../../../src/planta_nuclear";

describe("Test de BuilderReactorNormal", () => {
  let instance: BuilderReactorNormal;

  beforeEach(() => {
    instance = new BuilderReactorNormal();
  });

  it("Verifica que el reset() devuelva un nuevo Reactor", () => {
    instance.reset();
    expect(() => instance.getReactor).toBeInstanceOf(Reactor);
  })

  it("Verifica que el administrador se agregue de forma correcta", () => {
    instance.reset();
    instance.setAdminBarras();
    expect(() => instance.getReactor().getAdministradorBarras()).toBeInstanceOf(AdministradorBarras);
  })

  it("Verifica que las barras se agreguen de forma correcta", () => {
    instance.reset();
    instance.setBarras();
    expect(() => instance.getReactor().getAdministradorBarras().getBarrasEnDesuso()).toBe(100);
  })

  it("Verifica que los sensores se agreguen de forma correcta", () => {
    instance.reset();
    instance.setSensores();
    expect(() => instance.getReactor().getSensores()).toBeInstanceOf(ISensor);
  })

  it("Verifica que la planta nuclear se agregue de forma correcta", () => {
    instance.reset();
    let planta = new PlantaNuclear();
    instance.setPlantaNuclear(planta);
    expect(() => instance.getReactor().getPlantaNuclear()).toBeInstanceOf(PlantaNuclear);
  })

});
