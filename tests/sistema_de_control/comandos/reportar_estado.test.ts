import Reactor from "../../../src/central_nuclear/reactor/reactor";
import RCritico from "../../../src/central_nuclear/reactor/estados_reactor/critico";
import ReportarEstado from "../../../src/sistema_de_control/comandos/reportar_estado";
import PlantaNuclear from "../../../src/planta_nuclear";
import Sistema from "../../../src/sistema_de_control/sistema";
import BuilderReactorNormal from "../../../src/central_nuclear/reactor/builder/builder_reactor_normal";
import DirectorBuildReactor from "../../../src/central_nuclear/reactor/builder/director_build_reactor";
import { Constantes } from "../../../src/central_nuclear/reactor/constantes_reactor";
import REmergencia from "../../../src/central_nuclear/reactor/estados_reactor/emergencia";
import Chernobyl from "../../../src/central_nuclear/reactor/estados_reactor/chernobyl";
import RNormal from "../../../src/central_nuclear/reactor/estados_reactor/normal";
import REncenciendo from "../../../src/central_nuclear/reactor/estados_reactor/encendiendo";
import RApagado from "../../../src/central_nuclear/reactor/estados_reactor/apagado";

describe("Test del comando para reportar estado del reactor", () => {
  let instance: ReportarEstado = new ReportarEstado();
  let MockPlanta: jest.Mocked<PlantaNuclear> =
    new PlantaNuclear() as jest.Mocked<PlantaNuclear>;
  let MockSistema: jest.Mocked<Sistema> = new Sistema(
    MockPlanta
  ) as jest.Mocked<Sistema>;
  let MockBuilderConcreto: jest.Mocked<BuilderReactorNormal> =
    new BuilderReactorNormal() as jest.Mocked<BuilderReactorNormal>;
  let MockDirectorBuilder: jest.Mocked<DirectorBuildReactor> =
    new DirectorBuildReactor(
      MockBuilderConcreto
    ) as jest.Mocked<DirectorBuildReactor>;
  MockDirectorBuilder.cargarPlantaNuclear(MockPlanta);
  let MockReactor: jest.Mocked<Reactor> =
    MockDirectorBuilder.buildReactorNormal() as jest.Mocked<Reactor>;
  let MockCritico: jest.Mocked<RCritico>;

  beforeEach(() => {
    jest.useFakeTimers();
    MockCritico = new RCritico(MockReactor) as jest.Mocked<RCritico>;
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("se testea que el mensaje sea el correcto: RApagado", () => {
    MockReactor.setEstado(new RApagado(MockReactor));
    const espiaConsola = jest.spyOn(console, "log");

    instance.ejecutar(MockReactor);
    expect(espiaConsola).toHaveBeenCalledWith(
      Constantes.MENSAJE_ESTADO_APAGADO
    );
  });

  it("se testea que el mensaje sea el correcto: REncenciendo", () => {
    MockReactor.setEstado(new REncenciendo(MockReactor));
    const espiaConsola = jest.spyOn(console, "log");

    instance.ejecutar(MockReactor);
    expect(espiaConsola).toHaveBeenCalledWith(
      Constantes.MENSAJE_ESTADO_ENCENDIENDO
    );
  });

  it("se testea que el mensaje sea el correcto: RNormal", () => {
    MockReactor.setEstado(new RNormal(MockReactor));
    const espiaConsola = jest.spyOn(console, "log");

    instance.ejecutar(MockReactor);
    expect(espiaConsola).toHaveBeenCalledWith(Constantes.MENSAJE_ESTADO_NORMAL);
  });

  it("se testea que el mensaje sea el correcto: RCritico", () => {
    MockReactor.setEstado(MockCritico);
    const espiaConsola = jest.spyOn(console, "log");

    instance.ejecutar(MockReactor);
    expect(espiaConsola).toHaveBeenCalledWith(
      Constantes.MENSAJE_ESTADO_CRITICO
    );
  });

  it("se testea que el mensaje sea el correcto: REmergencia", () => {
    MockReactor.setEstado(new REmergencia(MockReactor));
    const espiaConsola = jest.spyOn(console, "log");

    instance.ejecutar(MockReactor);
    expect(espiaConsola).toHaveBeenCalledWith(
      Constantes.MENSAJE_ESTADO_EMERGENCIA
    );
  });

  it("se testea que el mensaje sea el correcto: REmergencia", () => {
    MockReactor.setEstado(new Chernobyl(MockReactor));
    const espiaConsola = jest.spyOn(console, "log");

    instance.ejecutar(MockReactor);
    expect(espiaConsola).toHaveBeenCalledWith(
      Constantes.MENSAJE_ESTADO_CHERNOBYL_EXPLOTO
    );
  });
});
