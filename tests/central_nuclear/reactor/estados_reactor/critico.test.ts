import Reactor from "../../../../src/central_nuclear/reactor/reactor";
import REmergencia from "../../../../src/central_nuclear/reactor/estados_reactor/emergencia";
import RCritico from "../../../../src/central_nuclear/reactor/estados_reactor/critico";
import PlantaNuclear from "../../../../src/planta_nuclear";
import Sistema from "../../../../src/sistema_de_control/sistema";
import BuilderReactorNormal from "../../../../src/central_nuclear/reactor/builder/builder_reactor_normal";
import DirectorBuildReactor from "../../../../src/central_nuclear/reactor/builder/director_build_reactor";
import RNormal from "../../../../src/central_nuclear/reactor/estados_reactor/normal";
import RApagado from "../../../../src/central_nuclear/reactor/estados_reactor/apagado";
import AlertaEstandar from "../../../../src/sistema_de_control/alertas/alerta_estandar";
import EncenderError from "../../../../src/errores/errores_central_nuclear/errores_de_los_estados_del_reactor/error_estado_critico/encender_error";
import { Constantes } from "../../../../src/central_nuclear/reactor/constantes_reactor";

let instance: RCritico;
let MockPlanta: jest.Mocked<PlantaNuclear> = new PlantaNuclear() as jest.Mocked<PlantaNuclear>;
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
  jest.clearAllTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
  jest.clearAllMocks();
  jest.clearAllTimers();
});

afterAll(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
});

describe("Test del estado Crítico", () => {
  it("debería inicializar correctamente como estado RCritico", () => {
    expect(MockReactor.getEstado()).toBeInstanceOf(RCritico);
  });

  it("debería cambiar a estado RNormal si la temperatura está por debajo de 330 grados", () => {
    MockReactor.setTemperatura(329);
    MockReactor.getEstado().verificarEstado();
    expect(MockReactor.getEstado()).toBeInstanceOf(RNormal);
  });

  it("debería cambiar a estado REmergencia si la temperatura es 400 o mayor", () => {
    MockReactor.setTemperatura(400);
    MockReactor.getEstado().verificarEstado();
    expect(MockReactor.getEstado()).toBeInstanceOf(REmergencia);
  });

  it("debería lanzar un error al intentar encender un reactor en estado RCritico", () => {
    expect(() => instance.encender()).toThrow(EncenderError);
  });

  it("debería cambiar a estado RApagado al llamar al método apagar", () => {
    instance.apagar();
    expect(MockReactor.getEstado()).toBeInstanceOf(RApagado);
  });

  it("debería generar una alerta de tipo AlertaEstandar al llamar a generarAlerta", () => {
    const alerta = instance.generarAlerta();
    expect(alerta).toBeInstanceOf(AlertaEstandar);
  });

  it("debería permitir insertar barras de control", () => {
    expect(instance.puedeInsertarBarras()).toBeTruthy();
  });

  it("debería resetear el timeout de generación de energía correctamente", () => {
    const spyEliminarTimeOut = jest.spyOn(instance as any, "eliminarTimeOut");
    const spyCrearTimeoutEnergia = jest.spyOn(instance as any, "crearTimeoutEnergia");
    (instance as any).resetTimeOutEnergia(10000);

    expect(spyEliminarTimeOut).toHaveBeenCalled();
    expect(spyCrearTimeoutEnergia).toHaveBeenCalledWith(10000);
  });

  it("debería cambiar al estado RNormal correctamente", () => {
    const spyEliminarTimeOut = jest.spyOn(instance as any, "eliminarTimeOut");
    const spyCambiarEstado = jest.spyOn(MockReactor, "cambiarEstado");
    (instance as any).cambiarAEstadoNormal();
    expect(spyEliminarTimeOut).toHaveBeenCalled();
    expect(spyCambiarEstado).toHaveBeenCalledWith(expect.any(RNormal));
  });

  it("debería cambiar al estado REmergencia correctamente", () => {
    const spyEliminarTimeOut = jest.spyOn(instance as any, "eliminarTimeOut");
    const spyCambiarEstado = jest.spyOn(MockReactor, "cambiarEstado");
    (instance as any).cambiarAEstadoEmergencia();
    expect(spyEliminarTimeOut).toHaveBeenCalled();
    expect(spyCambiarEstado).toHaveBeenCalledWith(expect.any(REmergencia));
  });

  it("debería liberar energía correctamente", () => {
    const spyInsertarRegistro = jest.spyOn(instance["_registroEnergia"], "insertarRegistro");
    jest.spyOn(instance, "obtenerEnergiaNeta").mockReturnValue(100);
    instance.liberarEnergia();
    expect(spyInsertarRegistro).toHaveBeenCalledWith(100);
  });

  it("debería devolver el mensaje de estado crítico correctamente", () => {
    expect(instance.toString()).toBe(Constantes.MENSAJE_ESTADO_CRITICO);
  });

  it("verificarEstado debería cambiar a estado RNormal si la temperatura está por debajo de Constantes.TEMP_MINIMA_CRITICA", () => {
    MockReactor.setTemperatura(Constantes.TEMP_MINIMA_CRITICA - 1);
    instance.verificarEstado();
    expect(MockReactor.getEstado()).toBeInstanceOf(RNormal);
  });

  it("verificarEstado debería cambiar a estado REmergencia si la temperatura es igual o mayor a Constantes.TEMP_MINIMA_EMERGENCIA", () => {
    MockReactor.setTemperatura(Constantes.TEMP_MINIMA_EMERGENCIA);
    instance.verificarEstado();
    expect(MockReactor.getEstado()).toBeInstanceOf(REmergencia);
  });

  it("liberarEnergia debería insertar el registro en _registroEnergia con la energía neta calculada", () => {
    const energiaNeta = 100;
    jest.spyOn(instance, "obtenerEnergiaNeta").mockReturnValue(energiaNeta);
    const spyInsertarRegistro = jest.spyOn(instance["_registroEnergia"], "insertarRegistro");
    instance.liberarEnergia();
    expect(spyInsertarRegistro).toHaveBeenCalledWith(energiaNeta);
  });

  it("obtenerEnergiaNeta debería aplicar correctamente el cálculo de reducción de energía", () => {
    const energiaInicial = 100;
    const energiaEsperada = energiaInicial - energiaInicial * 0.8;
    jest.spyOn(instance as any, "obtenerEnergiaNeta").mockReturnValue(energiaEsperada);
    const resultado = instance.obtenerEnergiaNeta();
    expect(resultado).toBeCloseTo(energiaEsperada);
  });

  it("toString debería devolver el mensaje de estado crítico", () => {
    const mensajeEsperado = Constantes.MENSAJE_ESTADO_CRITICO;
    const resultado = instance.toString();
    expect(resultado).toBe(mensajeEsperado);
  });
});
