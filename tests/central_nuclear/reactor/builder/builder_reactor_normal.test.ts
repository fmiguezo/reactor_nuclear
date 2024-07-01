import AdministradorBarras from "../../../../src/central_nuclear/reactor/administrador/administrador_barras";
import BuilderReactorNormal from "../../../../src/central_nuclear/reactor/builder/builder_reactor_normal";
import Reactor from "../../../../src/central_nuclear/reactor/reactor";
import ISensor from "../../../../src/central_nuclear/interfaces/isensor";
import PlantaNuclear from "../../../../src/planta_nuclear";
import EstadoReactor from "../../../../src/central_nuclear/reactor/estados_reactor/estadoreactor";

describe("Tests del builder de reactor normal", () => {
  let instance: BuilderReactorNormal;
  let plantaNuclear: PlantaNuclear;

  beforeEach(() => {
    instance = new BuilderReactorNormal();
    plantaNuclear = new PlantaNuclear();
  });

  it("Verifica que la instancia sea de tipo BuilderReactorNormal", () => {
    expect(() => instance).toBeInstanceOf(BuilderReactorNormal);
  });

  it("Verifica que el reset() devuelva un nuevo Reactor", () => {
    instance.reset();
    expect(() => instance.getReactor).toBeInstanceOf(Reactor);
  });

  it("Verifica que el administrador se agregue de forma correcta", () => {
    instance.reset();
    instance.setAdminBarras();
    expect(() => instance.getReactor().getAdministradorBarras()).toBeInstanceOf(AdministradorBarras);
  });

  it("Verifica que las barras se agreguen de forma correcta", () => {
    instance.reset();
    instance.setBarras();
    expect(() => instance.getReactor().getAdministradorBarras().getBarrasEnDesuso()).toBe(100);
  });

  it("Verifica que los sensores se agreguen de forma correcta", () => {
    instance.reset();
    instance.setSensores();
    expect(() => instance.getReactor().getSensores()).toBeInstanceOf([]);
  });

  /*
  it("Verifica que la planta nuclear se agregue de forma correcta", () => {
    instance.reset();
    let planta = new PlantaNuclear();
    instance.setPlantaNuclear(planta);
    expect(() => instance.getReactor().getPlantaNuclear()).toBeInstanceOf(PlantaNuclear);
  });

  */

  it("Verifica que el estado inicial se agregue de forma correcta", () => {
    instance.reset();
    instance.setEstadoIncial();
    expect(() => instance.getReactor().getEstado()).toBeInstanceOf(EstadoReactor);
  });
});
