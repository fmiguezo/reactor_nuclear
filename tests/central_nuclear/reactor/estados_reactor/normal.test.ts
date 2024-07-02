import Reactor from "../../../../src/central_nuclear/reactor/reactor";
import { Constantes } from "../../../../src/central_nuclear/reactor/constantes";
import RApagado from "../../../../src/central_nuclear/reactor/estados_reactor/apagado";
import RNormal from "../../../../src/central_nuclear/reactor/estados_reactor/normal";
import BuilderReactorNormal from "../../../../src/central_nuclear/reactor/builder/builder_reactor_normal";
import PlantaNuclear from "../../../../src/planta_nuclear";
import DirectorBuildReactor from "../../../../src/central_nuclear/reactor/builder/director_build_reactor";
import Sistema from "../../../../src/sistema_de_control/sistema";

let instance: RNormal;

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
  instance = new RNormal(MockReactor);
  MockReactor.setEstado(instance);
  MockReactor.setTemperatura(280);
});

afterEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
});

describe("Test del estado normal", () => {
  it("verifica que la instancia sea de tipo normal", () => {
    expect(instance).toBeInstanceOf(RNormal);
  });

  it("debería calcular un valor de energía neta en 100 si la temperatura es 280", () => {
    expect(instance.calcularEnergia()).toBe(100);
  });

  it("debería dar error si se intenta encender un reactor en estado normal", () => {
    expect(() => instance.encender()).toThrow(new Error(Constantes.MENSAJE_ENCENDIDO));
  });

  it("debería cambiar el estado a apagado si se llama a la funcion apagar", () => {
    instance.apagar();
    expect(MockReactor.getEstado()).toBeInstanceOf(RApagado);
  });

  it("verifica que el reactor esté encendido si el estado es normal", () => {
    expect(instance.estaEncendido()).toBe(true);
  });

  it("Verifica que to string devuelva el mensaje esperado", () => {
    expect(instance.toString()).toBe(Constantes.MENSAJE_ESTADO_NORMAL);
  });
});
