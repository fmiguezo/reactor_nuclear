import Reactor from "../../../src/central_nuclear/reactor/reactor";
import RCritico from "../../../src/central_nuclear/reactor/estados_reactor/critico";
import PlantaNuclear from "../../../src/planta_nuclear";
import EnergiaTermalCalculationError from "../../../src/errores/errores_central_nuclear/errores_reaccion/error_energia/energia_termal_calculation_error";
import SubirBarrasError from "../../../src/errores/errores_central_nuclear/errores_del_administrador_de_barras/subir_barras_error";
import EstadoReactor from "../../../src/central_nuclear/reactor/estados_reactor/estadoreactor";
import Energia from "../../../src/central_nuclear/reactor/reaccion/energia";
import ISensor from "../../../src/central_nuclear/interfaces/isensor";
import IMecanismoDeControl from "../../../src/central_nuclear/interfaces/imecanismo_control";
import BarraControl from "../../../src/central_nuclear/barras_control/barra_control";
import { Constantes } from "../../../src/central_nuclear/reactor/constantes_reactor";
import Sistema from "../../../src/sistema_de_control/sistema";
import AdministradorBarras from "../../../src/central_nuclear/reactor/administrador/administrador_barras";
import RApagado from "../../../src/central_nuclear/reactor/estados_reactor/apagado";
import REmergencia from "../../../src/central_nuclear/reactor/estados_reactor/emergencia";

describe("Reactor", () => {
  let reactor: Reactor;
  let estadoMock: EstadoReactor;
  let barraControlMock: BarraControl;
  let mecanismoDeControlMock: IMecanismoDeControl;
  let sensorMock: ISensor;
  let administradorBarrasMock: AdministradorBarras;
  let plantaNuclearMock: jest.Mocked<PlantaNuclear> = new PlantaNuclear() as jest.Mocked<PlantaNuclear>;
  let sistemaMock: jest.Mocked<Sistema> = new Sistema(plantaNuclearMock) as jest.Mocked<Sistema>;
  let RCriticoMock: jest.Mocked<RCritico>;
  let RApagadoMock: jest.Mocked<RApagado>;
  let REmergenciaMock: jest.Mocked<REmergencia>;

  beforeEach(() => {
    estadoMock = {
      encender: jest.fn(),
      apagar: jest.fn(),
      estaEncendido: jest.fn().mockReturnValue(true),
      verificarEstado: jest.fn(),
      obtenerEnergiaNeta: jest.fn().mockReturnValue(100),
      puedeInsertarBarras: jest.fn().mockReturnValue(true),
    } as unknown as EstadoReactor;

    barraControlMock = {} as unknown as BarraControl;

    mecanismoDeControlMock = {} as unknown as IMecanismoDeControl;

    sensorMock = {
      actualizar: jest.fn(),
    } as unknown as ISensor;

    administradorBarrasMock = {
      getBarrasInsertadas: jest.fn().mockReturnValue([]),
      subirBarras: jest.fn(),
      setReactor: jest.fn(),
    } as unknown as AdministradorBarras;

    reactor = new Reactor();
    reactor.setEstado(estadoMock);
    reactor.setAadministradorBarras(administradorBarrasMock);
    reactor.setPlantaNuclear(plantaNuclearMock);
  });

  it("debería encender el reactor", () => {
    reactor.encender();
    expect(estadoMock.encender).toHaveBeenCalled();
  });

  it("debería apagar el reactor", () => {
    reactor.apagar();
    expect(estadoMock.apagar).toHaveBeenCalled();
  });

  it("debería verificar si el reactor está encendido", () => {
    expect(reactor.estaEncendido()).toBe(true);
    expect(estadoMock.estaEncendido).toHaveBeenCalled();
  });

  it("debería obtener y establecer el estado del reactor", () => {
    const nuevoEstado = {} as EstadoReactor;
    reactor.setEstado(nuevoEstado);
    expect(reactor.getEstado()).toBe(nuevoEstado);
  });

  it("debería obtener y establecer la temperatura del reactor", () => {
    reactor.setTemperatura(100);
    expect(reactor.getTemperatura()).toBe(100);
  });

  it("debería obtener y establecer las barras de control", () => {
    const barras = [barraControlMock];
    reactor.setBarrasDeControl(barras);
    expect(reactor.getBarrasDeControl()).toBe(barras);
  });

  it("debería obtener la energía termal", () => {
    jest.spyOn(Energia, "calcularEnergiaTermal").mockReturnValue(500);
    expect(reactor.obtenerEnergiaTermal()).toBe(500);
  });

  it("debería manejar el error al calcular la energía termal", () => {
    jest.spyOn(Energia, "calcularEnergiaTermal").mockImplementation(() => {
      throw new EnergiaTermalCalculationError("Error de cálculo");
    });
    console.log = jest.fn();
    expect(reactor.obtenerEnergiaTermal()).toBe(0);
    expect(console.log).toHaveBeenCalledWith("Error de cálculo");
  });

  it("debería obtener la energía neta", () => {
    expect(reactor.obtenerEnergiaNeta()).toBe(100);
    expect(estadoMock.obtenerEnergiaNeta).toHaveBeenCalled();
  });

  it("debería cambiar el estado del reactor y notificar al sistema", () => {
    const nuevoEstado: EstadoReactor = new RCritico(reactor);
    reactor.setTemperatura(Constantes.TEMP_MINIMA_CRITICA);
    jest.clearAllTimers();
    const sistema = new Sistema(plantaNuclearMock);
    plantaNuclearMock.cargarSistema(sistema);

    // Crea Spy para sistema
    const espiaActualiza = jest.spyOn(sistema, "actualizar");
    reactor.cambiarEstado(nuevoEstado);
    expect(reactor.getEstado()).toBeInstanceOf(RCritico);
    expect(espiaActualiza).toHaveBeenCalledWith(reactor);
  });

  it("debería agregar y eliminar mecanismos de control", () => {
    reactor.agregarMecanismoDeControl(mecanismoDeControlMock);
    expect(reactor["_mecanimosDeControl"]).toContain(mecanismoDeControlMock);

    reactor.eliminarMecanismoDeControl(mecanismoDeControlMock);
    expect(reactor["_mecanimosDeControl"]).not.toContain(mecanismoDeControlMock);
  });

  it("debería agregar y eliminar sensores", () => {
    reactor.agregarSensor(sensorMock);
    expect(reactor.getSensores()).toContain(sensorMock);

    reactor.eliminarSensor(sensorMock);
    expect(reactor.getSensores()).not.toContain(sensorMock);
  });

  it("debería notificar a los sensores", () => {
    reactor.agregarSensor(sensorMock);
    reactor.notificarSensores();
    expect(sensorMock.actualizar).toHaveBeenCalledWith(reactor);
  });

  describe("debería notificar al sistema cuando se produce un cambio de estado a critico, emergencia o apagado", () => {
    it("debería notificar al sistema cuando se produce un cambio de estado a critico", () => {
      jest.spyOn(reactor, "notificarSistema");
      RCriticoMock = new RCritico(reactor) as jest.Mocked<RCritico>;
      reactor.cambiarEstado(RCriticoMock);
      expect(reactor.notificarSistema).toHaveBeenCalled();
    });

    it("debería notificar al sistema cuando se produce un cambio de estado a emergencia", () => {
      jest.spyOn(reactor, "notificarSistema");
      RApagadoMock = new RApagado(reactor) as jest.Mocked<RApagado>;
      reactor.cambiarEstado(RApagadoMock);
      expect(reactor.notificarSistema).toHaveBeenCalled();
    });

    it("debería notificar al sistema cuando se produce un cambio de estado a apagado", () => {
      jest.spyOn(reactor, "notificarSistema");
      REmergenciaMock = new REmergencia(reactor) as jest.Mocked<REmergencia>;
      reactor.cambiarEstado(REmergenciaMock);
      expect(reactor.notificarSistema).toHaveBeenCalled();
    });
  });

  it("debería obtener y establecer el administrador de barras", () => {
    expect(reactor.getAdministradorBarras()).toBe(administradorBarrasMock);
  });

  it("debería verificar si se pueden insertar barras", () => {
    expect(reactor.puedeInsertarBarras()).toBe(true);
    expect(estadoMock.puedeInsertarBarras).toHaveBeenCalled();
  });

  it("debería desactivar los mecanismos de control", () => {
    administradorBarrasMock.getBarrasInsertadas = jest.fn().mockReturnValue([barraControlMock]);
    reactor.desactivarMecanismosDeControl();
    expect(administradorBarrasMock.subirBarras).toHaveBeenCalled();
  });

  it("debería manejar errores al desactivar los mecanismos de control", () => {
    administradorBarrasMock.getBarrasInsertadas = jest.fn().mockReturnValue([barraControlMock]);
    administradorBarrasMock.subirBarras = jest.fn().mockImplementation(() => {
      throw new SubirBarrasError(Constantes.NO_PUEDE_SUBIR_BARRA);
    });
    console.log = jest.fn();
    reactor.desactivarMecanismosDeControl();
    expect(console.log).toHaveBeenCalledWith(Constantes.NO_PUEDE_SUBIR_BARRA);
  });

  it("debería agregar barras de control", () => {
    reactor.agregarBarra(barraControlMock);
    expect(reactor.getBarrasDeControl()).toContain(barraControlMock);
  });
});
