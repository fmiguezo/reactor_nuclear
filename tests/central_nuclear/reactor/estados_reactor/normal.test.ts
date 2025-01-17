import Reactor from "../../../../src/central_nuclear/reactor/reactor";
import RCritico from "../../../../src/central_nuclear/reactor/estados_reactor/critico";
import RApagado from "../../../../src/central_nuclear/reactor/estados_reactor/apagado";
import BuilderReactorNormal from "../../../../src/central_nuclear/reactor/builder/builder_reactor_normal";
import PlantaNuclear from "../../../../src/planta_nuclear";
import DirectorBuildReactor from "../../../../src/central_nuclear/reactor/builder/director_build_reactor";
import Sistema from "../../../../src/sistema_de_control/sistema";
import EncenderError from "../../../../src/errores/errores_central_nuclear/errores_de_los_estados_del_reactor/error_estado_emergencia/error_encender";
import { Constantes } from "../../../../src/central_nuclear/reactor/constantes_reactor";
import RNormal from "../../../../src/central_nuclear/reactor/estados_reactor/normal";
import RegistroEnergiaGenerada from "../../../../src/sistema_de_control/registros/registro_energia_generada";
import RegistroEstados from "../../../../src/sistema_de_control/registros/registroEstados";

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
let MockRegistroEnergia: jest.Mocked<RegistroEnergiaGenerada> =
  RegistroEnergiaGenerada.instancia as jest.Mocked<RegistroEnergiaGenerada>;
let MockRegistroEstados: jest.Mocked<RegistroEstados> = RegistroEstados.instancia as jest.Mocked<RegistroEstados>;

jest.mock("../../../../src/sistema_de_control/registros/registro_energia_generada", () => ({
  instancia: {
    insertarRegistro: jest.fn(),
  },
}));

beforeEach(() => {
  jest.useFakeTimers();
  instance = new RNormal(MockReactor);
  MockReactor.setEstado(instance);
  MockReactor.setTemperatura(Constantes.TEMP_MINIMA_NORMAL);
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
  jest.clearAllMocks();
  jest.clearAllTimers();
});

describe("Test del estado Normal", () => {
  it("verifica que la instancia sea de tipo RNormal", () => {
    expect(MockReactor.getEstado()).toBeInstanceOf(RNormal);
  });

  it("debería cambiar a estado RCritico si la temperatura es 330 o mayor", () => {
    MockReactor.setTemperatura(330);
    MockReactor.getEstado().verificarEstado();
    expect(MockReactor.getEstado()).toBeInstanceOf(RCritico);
  });

  it("debería dar error si se intenta encender un reactor en estado RNormal", () => {
    jest.clearAllTimers();
    expect(() => instance.encender()).toThrow(new EncenderError());
  });

  it("debería cambiar a estado apagado si se llama al método apagar", () => {
    jest.clearAllTimers();
    instance.apagar();
    expect(MockReactor.getEstado()).toBeInstanceOf(RApagado);
  });

  it("debería confirmar que el reactor está encendido si el estado es RNormal", () => {
    jest.clearAllTimers();
    let encendido = instance.estaEncendido();
    expect(encendido).toBeTruthy;
  });

  it("No debería generar alertas si está en estado RNormal", () => {
    jest.clearAllTimers();
    let alerta = instance.generarAlerta();
    expect(alerta).toBeNull;
  });

  it("debería calcular un valor de energía neta en 100 si la temperatura es 280", () => {
    MockReactor.setTemperatura(280);
    MockReactor.getEstado().verificarEstado();
    expect(instance.obtenerEnergiaNeta()).toBe(100);
  });

  it("debería cambiar a estado crítico si la temperatura es igual o mayor a 330 grados", () => {
    MockReactor.setTemperatura(330);
    MockReactor.getEstado().verificarEstado();
    expect(MockReactor.getEstado()).toBeInstanceOf(RCritico);
  });

  it("no debería cambiar de estado si la temperatura es menor a 330 grados", () => {
    MockReactor.setTemperatura(329);
    MockReactor.getEstado().verificarEstado();
    expect(MockReactor.getEstado()).toBeInstanceOf(RNormal);
  });

  it("debería asegurar que no se puedan insertar barras de control en estado normal", () => {
    jest.clearAllTimers();
    const puedeInsertar = instance.puedeInsertarBarras();
    expect(puedeInsertar).toBe(false);
  });

  it("debería crear un registro con el mismo valor de la energía neta producida si llama a liberarEnergia()", () => {
    instance.liberarEnergia();
    jest.clearAllTimers();
    expect(RegistroEnergiaGenerada.instancia.insertarRegistro).toHaveBeenCalledWith(100);
  });

  it("toString debería volver el mensaje de estado normal", () => {
    jest.clearAllTimers();
    expect(instance.toString()).toBe("El reactor está en estado normal.");
  });

  it("debería resetear el timeout de generación de energía", () => {
    const spyEliminarTimeout = jest.spyOn(instance as any, "eliminarTimeOut");
    const spyCrearTimeout = jest.spyOn(instance as any, "crearTimeOutEnergia");

    (instance as any).resetTimeOutEnergia();

    expect(spyEliminarTimeout).toHaveBeenCalled();
    expect(spyCrearTimeout).toHaveBeenCalled();
  });

  it("debería resetear y recrear el timeout de generación de energía", () => {
    const spyEliminarTimeout = jest.spyOn(instance as any, "eliminarTimeOut");
    const spyCrearTimeout = jest.spyOn(instance as any, "crearTimeOutEnergia");

    (instance as any).resetTimeOutEnergia(150000);

    expect(spyEliminarTimeout).toHaveBeenCalled();
    expect(spyCrearTimeout).toHaveBeenCalled();
  });

  it("debería crear un nuevo timeout de generación de energía", () => {
    jest.spyOn(global, "setTimeout");
    (instance as any).crearTimeOutEnergia(10000);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 10000);
  });

  it("debería cambiar a estado crítico y registrar el cambio de estado", () => {
    const spyCambiarEstado = jest.spyOn(MockReactor, "cambiarEstado");
    const spyAumentarRegistro = jest.spyOn(MockRegistroEstados, "aumentarRegistro");

    (instance as any).cambiarAEstadoCritico();

    expect(spyCambiarEstado).toHaveBeenCalledWith(expect.any(RCritico));
    expect(spyAumentarRegistro).toHaveBeenCalledWith(expect.any(RCritico));
  });

  it("debería lanzar una alerta cuando se genera una alerta", () => {
    const alerta = instance.generarAlerta();
    expect(alerta).toBeDefined();
  });

  it("debería insertar barras de control si el estado lo permite", () => {
    const puedeInsertar = instance.puedeInsertarBarras();
    expect(puedeInsertar).toBe(false);
  });

  it("debería liberar energía y registrarla adecuadamente", () => {
    instance.liberarEnergia();
    jest.advanceTimersByTime(30000);
    expect(MockRegistroEnergia.insertarRegistro).toHaveBeenCalledWith(100);
  });

  it("debería retornar el mensaje de estado normal", () => {
    const resultado = instance.toString();
    expect(resultado).toBe(Constantes.MENSAJE_ESTADO_NORMAL);
  });

  it("debería mantener el estado normal si la temperatura es menor que la mínima normal", () => {
    MockReactor.setTemperatura(290);
    MockReactor.getEstado().verificarEstado();
    expect(MockReactor.getEstado()).toBeInstanceOf(RNormal);
  });

  it("debería llamar a crearTimeOutEnergia durante la inicialización", () => {
    const spyCrearTimeOutEnergia = jest.spyOn(RNormal.prototype as any, "crearTimeOutEnergia");
    const instance = new RNormal(MockReactor);
    expect(spyCrearTimeOutEnergia).toHaveBeenCalledTimes(1);
    jest.clearAllMocks();
  });
});
