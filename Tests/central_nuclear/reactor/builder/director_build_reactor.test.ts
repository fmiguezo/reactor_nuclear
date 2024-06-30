import BuilderReactorNormal from "../../../../src/central_nuclear/reactor/builder/builder_reactor_normal";
import DirectorBuilderReactor from "../../../../src/central_nuclear/reactor/builder/director_build_reactor";
import Reactor from "../../../../src/central_nuclear/reactor/reactor";
import PlantaNuclear from "../../../../src/planta_nuclear";

describe("Test de DirectorBuilderReactor", () => {
  let instance: DirectorBuilderReactor;

  beforeEach(() => {
    instance = new DirectorBuilderReactor(new BuilderReactorNormal());
  });

  it("Verifica que la instancia sea de tipo DirectorBuilderReactor", () => {
    expect(() => instance).toBeInstanceOf(DirectorBuilderReactor);
  })

  it("Verifica que la planta nuclear se cargue correctamente", () => {
    let planta = new PlantaNuclear();
    instance.cargarPlantaNuclear(planta);
    expect(() => instance.getPlantaNuclear()).toBeInstanceOf(PlantaNuclear);
  })

  it("Verifica que el reactor se construya correctamente", () => {
    instance.buildReactorNormal();
    expect(() => instance.getBuilder().getReactor()).toBeInstanceOf(Reactor);
  })

  it("Verifica que el cambiar builder funcione", () => {
    let builder = new BuilderReactorNormal();
    instance.cambiarBuilder(builder);
    expect(() => instance.getBuilder()).toBeInstanceOf(BuilderReactorNormal);
  })

});
