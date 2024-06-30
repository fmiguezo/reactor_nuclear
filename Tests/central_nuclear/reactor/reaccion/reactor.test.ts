import Reactor from "../../../src/central_nuclear/reactor/reactor";
import RApagado from "../../../central_nuclear/reactor/estados_reactor/apagado";
import RCritico from "../../../central_nuclear/reactor/estados_reactor/critico";
import REncendido from "../../../central_nuclear/reactor/estados_reactor/encendido";
import IMecanismoDeControl from "../../../src/central_nuclear/interfaces/imecanismo_control";
import ISensor from "../../../src/central_nuclear/interfaces/isensor";
import SensorTemperatura from "../../../src/central_nuclear/sensores/sensor_temperatura";
import BarraControl from "../../../src/central_nuclear/mecanismos_control/barra_control";

jest.mock("./estados_reactor/apagado");
jest.mock("./reaccion/energia");

describe("Test del reactor", () => {
  let reactor: Reactor;
  let MockApagado: jest.Mocked<RApagado>;
  let MockCritico: jest.Mocked<RCritico>;
  let MockBarrasControl: jest.Mocked<BarraControl>;
  let MockMecanismosControl: jest.Mocked<IMecanismoDeControl>;
  let MockSensor: jest.Mocked<ISensor>;

  beforeEach(() => {
    reactor = new Reactor();
    MockApagado = new RApagado(reactor) as jest.Mocked<RApagado>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Debería inicializar el reactor con los valores correctos por defecto", () => {
    expect(reactor.getEstado()).toBeInstanceOf(RApagado);
    expect(reactor.getTemperatura()).toBe(0);
    expect(reactor.getBarrasDeControl()).toEqual([]);
  });

  it("Debería encender el reactor y verificar que esté encendido y no apagado", () => {
    reactor.encender();
    expect(reactor.getEstado().toBeInstanceOf(REncendido));
    expect(reactor.estaEncendido()).toBeTruthy();
    expect(reactor.estaApagado()).toBeFalsy();
  });

  it("Debería settear y obetener el estado del reactor correctamente", () => {
    MockCritico = new RCritico(reactor) as jest.Mocked<RCritico>;
    reactor.setEstado(MockCritico);
    expect(reactor.getEstado()).toBe(MockCritico);
  });

  it("Debería setear y obtener la temperatura correctamente", () => {
    reactor.setTemperatura(100);
    expect(reactor.getTemperatura()).toBe(100);
  });

  it("Debería setteear y obtener las barras de control correctamente", () => {
    MockBarrasControl = new BarraControl(reactor) as jest.Mocked<BarraControl>;
    reactor.setBarrasDeControl(MockBarrasControl);
    expect(reactor.getBarrasDeControl()).toEqual(MockBarrasControl);
  });

  it("Debería agregar y eliminar mecanismos de control correctamente", () => {
    MockMecanismosControl = new BarraControl(reactor) as jest.Mocked<IMecanismoDeControl>;

    reactor.agregarMecanismoDeControl(MockMecanismosControl);
    expect(reactor["_mecanimosDeControl"]).toContain(MockMecanismosControl);

    reactor.eliminarMecanismoDeControl(MockMecanismosControl);
    expect(reactor["_mecanimosDeControl"]).not.toContain(MockMecanismosControl);
  });

  it("Debería agregar y eliminar sensores correctamente", () => {
    MockSensor = new SensorTemperatura(reactor) as jest.Mocked<ISensor>;

    reactor.agregarSensor(MockSensor);
    expect(reactor["_sensores"]).toContain(MockSensor);

    reactor.eliminarSensor(MockSensor);
    expect(reactor["_sensores"]).not.toContain(MockSensor);
  });
});
