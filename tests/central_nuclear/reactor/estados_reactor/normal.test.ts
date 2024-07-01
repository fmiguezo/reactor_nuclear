import Reactor from "../../../../src/central_nuclear/reactor/reactor";
import { Constantes } from "../../../../src/central_nuclear/reactor/constantes";
import RApagado from "../../../../src/central_nuclear/reactor/estados_reactor/apagado";
import REncenciendo from "../../../../src/central_nuclear/reactor/estados_reactor/encendiendo";
import RNormal from "../../../../src/central_nuclear/reactor/estados_reactor/normal";
import RCritico from "../../../../src/central_nuclear/reactor/estados_reactor/critico";
import Energia from "../../../../src/central_nuclear/reactor/reaccion/energia";
import RegistroEnergiaGenerada from "../../../../src/sistema_de_control/registros/registro_energia_generada";
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
let MockReactor: jest.Mocked<Reactor> = MockBuilderConcreto.getReactor() as jest.Mocked<Reactor>;
MockDirectorBuilder.cargarPlantaNuclear(MockPlanta);
MockPlanta.cargarSistema(MockSistema);
MockBuilderConcreto.reset();
MockReactor = MockBuilderConcreto.getReactor() as jest.Mocked<Reactor>;

beforeEach(() => {
  instance = new RNormal(MockReactor);
  MockReactor.setEstado(instance);
  MockReactor.setTemperatura(280);
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

  it("Verifica que liberarEnergia devuelva lo esperado", () => {
    Energia.calcularEnergiaNeta(Energia.calcularEnergiaTermal(280));
    RegistroEnergiaGenerada.instancia.insertarRegistro(MockReactor.obtenerEnergiaNeta());
    expect(MockReactor.obtenerEnergiaNeta()).toBe(100);
  });

  it("Verifica que to string devuelva el mensaje esperado", () => {
    expect(instance.toString()).toBe(Constantes.MENSAJE_ESTADO_NORMAL);
  });
});
