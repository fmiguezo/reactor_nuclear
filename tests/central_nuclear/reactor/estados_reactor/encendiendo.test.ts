import Reactor from "../../../../src/central_nuclear/reactor/reactor";
import { Constantes } from "../../../../src/central_nuclear/reactor/constantes";
import RApagado from "../../../../src/central_nuclear/reactor/estados_reactor/apagado";
import REncenciendo from "../../../../src/central_nuclear/reactor/estados_reactor/encendiendo";
import RNormal from "../../../../src/central_nuclear/reactor/estados_reactor/normal";
import BuilderReactorNormal from "../../../../src/central_nuclear/reactor/builder/builder_reactor_normal";
import PlantaNuclear from "../../../../src/planta_nuclear";
import DirectorBuildReactor from "../../../../src/central_nuclear/reactor/builder/director_build_reactor";
import Sistema from "../../../../src/sistema_de_control/sistema";

let instance: REncenciendo;
let MockPlanta: jest.Mocked<PlantaNuclear> = new PlantaNuclear() as jest.Mocked<PlantaNuclear>;
let MockSistema: jest.Mocked<Sistema> = new Sistema(MockPlanta) as jest.Mocked<Sistema>;
let MockBuilderConcreto: jest.Mocked<BuilderReactorNormal> =
  new BuilderReactorNormal() as jest.Mocked<BuilderReactorNormal>;
let MockDirectorBuilder: jest.Mocked<DirectorBuildReactor> = new DirectorBuildReactor(
  MockBuilderConcreto
) as jest.Mocked<DirectorBuildReactor>;
MockDirectorBuilder.cargarPlantaNuclear(MockPlanta);
let MockReactor: jest.Mocked<Reactor> = MockDirectorBuilder.buildReactorNormal() as jest.Mocked<Reactor>;

beforeEach(() => {
  instance = new REncenciendo(MockReactor);
  MockReactor.setEstado(instance);
  MockReactor.setTemperatura(0);
});

describe("Test del estado apagado", () => {
  it("verifica que la instancia sea de tipo RApagado", () => {
    expect(instance).toBeInstanceOf(REncenciendo);
  });

  it("Verifica que verificarEstado cambie al estado a normal", () => {
    MockReactor.setTemperatura(300);
    instance.verificarEstado();
    expect(MockReactor.getEstado()).toBeInstanceOf(RNormal);
  });

  it("Verifica que verificarEstado que continue en estado encendido", () => {
    MockReactor.setTemperatura(350);
    instance.verificarEstado();
    expect(MockReactor.getEstado()).toBeInstanceOf(REncenciendo);
  });

  it("Verifica que encender que tire el Error correcto", () => {
    expect(() => instance.encender()).toThrow(new Error(Constantes.MENSAJE_ENCENDIDO));
  });

  it("Verifica que apagar cambie de estado correctamente", () => {
    instance.apagar();
    expect(MockReactor.getEstado()).toBeInstanceOf(RApagado);
  });

  it("Verifica que estaEncendido, tire true", () => {
    expect(instance.estaEncendido()).toBe(true);
  });
});
