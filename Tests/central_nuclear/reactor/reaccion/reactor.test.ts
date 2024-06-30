import Reactor from "../../../../src/central_nuclear/reactor/reactor";
import RApagado from "../../../../src/central_nuclear/reactor/estados_reactor/apagado";
import RCritico from "../../../../src/central_nuclear/reactor/estados_reactor/critico";
import IMecanismoDeControl from "../../../../src/central_nuclear/interfaces/imecanismo_control";
import ISensor from "../../../../src/central_nuclear/interfaces/isensor";
import SensorTemperatura from "../../../../src/central_nuclear/sensores/sensor_temperatura";
import BarraControl from "../../../../src/central_nuclear/barras_control/barra_control";
import RNormal from "../../../../src/central_nuclear/reactor/estados_reactor/normal";
import BarraControlCadmio from "../../../../src/central_nuclear/barras_control/barra_control_cadmio";

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

  it("Debería encender el reactor y verificar que esté encendido y su estado sea normal", () => {
    reactor.encender();
    expect(reactor.getEstado()).toBeInstanceOf(RNormal);
    expect(reactor.estaEncendido()).toBeTruthy();
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
    let BarrasDeControl = new Array<BarraControlCadmio>();
    MockBarrasControl = new BarraControlCadmio() as jest.Mocked<BarraControlCadmio>;
    BarrasDeControl.push(MockBarrasControl);
    reactor.setBarrasDeControl(BarrasDeControl);
    expect(reactor.getBarrasDeControl()).toEqual(BarrasDeControl);
  });

  it("Debería agregar y eliminar mecanismos de control correctamente", () => {
    MockMecanismosControl = new BarraControlCadmio() as jest.Mocked<BarraControlCadmio>;

    reactor.agregarMecanismoDeControl(MockMecanismosControl);
    expect(reactor["_mecanimosDeControl"]).toContain(MockMecanismosControl);

    reactor.eliminarMecanismoDeControl(MockMecanismosControl);
    expect(reactor["_mecanimosDeControl"]).not.toContain(MockMecanismosControl);
  });

  it("Debería agregar y eliminar sensores correctamente", () => {
    MockSensor = new SensorTemperatura() as jest.Mocked<SensorTemperatura>;

    reactor.agregarSensor(MockSensor);
    expect(reactor["_sensores"]).toContain(MockSensor);

    reactor.eliminarSensor(MockSensor);
    expect(reactor["_sensores"]).not.toContain(MockSensor);
  });
});
