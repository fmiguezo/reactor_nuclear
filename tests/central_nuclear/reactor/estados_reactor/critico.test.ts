import Reactor from "../../../../src/central_nuclear/reactor/reactor";
import RApagado from "../../../../src/central_nuclear/reactor/estados_reactor/apagado";
import REncenciendo from "../../../../src/central_nuclear/reactor/estados_reactor/encendiendo";
import { Constantes } from "../../../../src/central_nuclear/reactor/constantes";
import GeneradorDeAlertaApagado from "../../../../src/sistema_de_control/alertas/generador_alerta_apagado";
import RegistroEnergiaGenerada from "../../../../src/sistema_de_control/registros/registro_energia_generada";
import RCritico from "../../../../src/central_nuclear/reactor/estados_reactor/critico";
import PlantaNuclear from "../../../../src/planta_nuclear";
import Sistema from "../../../../src/sistema_de_control/sistema";
import BuilderReactorNormal from "../../../../src/central_nuclear/reactor/builder/builder_reactor_normal";
import DirectorBuildReactor from "../../../../src/central_nuclear/reactor/builder/director_build_reactor";
import RNormal from "../../../../src/central_nuclear/reactor/estados_reactor/normal";
import REmergencia from "../../../../src/central_nuclear/reactor/estados_reactor/emergencia";

let instance: RCritico;
let _timerGeneracion: NodeJS.Timeout | null = null;
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
  jest.useFakeTimers();
  instance = new RCritico(MockReactor);
  MockReactor.setEstado(instance);
  MockReactor.setTemperatura(0);
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
  jest.clearAllMocks();
  jest.clearAllTimers();
});

describe("Test del estado apagado", () => {
  it("verifica que la instancia sea de tipo RApagado", () => {
    expect(instance).toBeInstanceOf(RCritico);
  });

  it("Verifica que calcularEnergia de el valor esperado", () => {
    expect(instance.calcularEnergia()).toBe(0);
  });

  it("debería cambiar a estado normal si la temperatura está por debajo de 300 grados", () => {
    jest.spyOn(MockReactor, "getTemperatura").mockReturnValue(299);
    instance.verificarEstado();
    expect(MockReactor.getEstado()).toBeInstanceOf(RNormal);
  });

  it("debería cambiar a estado emergencia si la temperatura es igual o mayor a 500 grados", () => {
    jest.spyOn(MockReactor, "getTemperatura").mockReturnValue(500);
    instance.verificarEstado();
    expect(MockReactor.getEstado()).toBeInstanceOf(REmergencia);
  });

  it("debería dar error si se llama a la función encender()", () => {
    expect(() => instance.encender()).toThrowError("El reactor ya está encendido.");
  });

  it("debería cambiar a estado apagado si se llama a la función apagar()", () => {
    instance.apagar();
    expect(MockReactor.getEstado()).toBeInstanceOf(RApagado);
  });
});
