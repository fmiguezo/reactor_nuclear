import Reactor from "../../../src/central_nuclear/reactor/reactor";
import RApagado from "../../../src/central_nuclear/reactor/estados_reactor/apagado";
import RCritico from "../../../src/central_nuclear/reactor/estados_reactor/critico";
import REncenciendo from "../../../src/central_nuclear/reactor/estados_reactor/encendiendo";
import DirectorBuildReactor from "../../../src/central_nuclear/reactor/builder/director_build_reactor";
import BuilderReactorNormal from "../../../src/central_nuclear/reactor/builder/builder_reactor_normal";
import AdministradorBarras from "../../../src/central_nuclear/reactor/administrador/administrador_barras";
import { Constantes } from "../../../../reactor_nuclear/src/central_nuclear/reactor/reaccion/constantes_formula_energia";
import IBuilder from "../../../src/central_nuclear/reactor/builder/ibuilder";
import PlantaNuclear from "../../../src/planta_nuclear";
import EnergiaNetaCalculationError from "../../../src/errores/errores_central_nuclear/errores_reaccion/error_energia/energia_neta_calculation_error";
import EnergiaTermalCalculationError from "../../../src/errores/errores_central_nuclear/errores_reaccion/error_energia/energia_termal_calculation_error";

describe("Test del reactor", () => {
  let builder: IBuilder;
  let director: DirectorBuildReactor;
  let administrador: AdministradorBarras;
  let reactor: Reactor;
  let plantaNuclear: PlantaNuclear;

  beforeEach(() => {
    builder = new BuilderReactorNormal();
    director = new DirectorBuildReactor(builder);
    plantaNuclear = new PlantaNuclear();
    director.cargarPlantaNuclear(plantaNuclear);
    reactor = director.buildReactorNormal();
  });

  it("Debería inicializar el reactor con los valores correctos por defecto", () => {
    expect(reactor.getEstado()).toBeInstanceOf(RApagado);
    expect(reactor.getTemperatura()).toBe(0);
    expect(reactor.getBarrasDeControl()).toEqual([]);
  });

  it("El objeto instanciado deberia ser de tipo Reactor", () => {
    expect(reactor).toBeInstanceOf(Reactor);
  });

  it("no debería calcular energía termal ni neta si el reactor está apagado", () => {
    expect(() => reactor.obtenerEnergiaTermal()).toThrow(new EnergiaTermalCalculationError());
    expect(reactor.obtenerEnergiaNeta()).toThrow(new EnergiaNetaCalculationError());
  });
  
  it("Debería encender el reactor y verificar que esté encendiendo y su estado sea normal", () => {
    reactor.encender();
    expect(reactor.getEstado()).toBeInstanceOf(REncenciendo);
    expect(reactor.estaEncendido()).toBeTruthy();
  });

  it("Debería settear y obetener el estado del reactor correctamente", () => {
    let estadoCritico = new RCritico(reactor);
    reactor.setEstado(estadoCritico);
    expect(reactor.getEstado()).toBe(estadoCritico);
  });

  it("Debería setear y obtener la temperatura correctamente", () => {
    reactor.setTemperatura(100);
    expect(reactor.getTemperatura()).toBe(100);
  });

  it("Debería poder agregar y eliminar mecanismos de control correctamente", () => {
    let cantBarrasOriginales = administrador.getBarrasTotales().length;
    let cantAgregadas = 3
    administrador.cargarBarras(cantAgregadas);
    expect(reactor.getBarrasDeControl()).toContain(cantBarrasOriginales + cantAgregadas);

  });

});
