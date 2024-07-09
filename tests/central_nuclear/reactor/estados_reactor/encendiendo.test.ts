import Reactor from '../../../../src/central_nuclear/reactor/reactor';
import RApagado from '../../../../src/central_nuclear/reactor/estados_reactor/apagado';
import REncenciendo from '../../../../src/central_nuclear/reactor/estados_reactor/encendiendo';
import RNormal from '../../../../src/central_nuclear/reactor/estados_reactor/normal';
import BuilderReactorNormal from '../../../../src/central_nuclear/reactor/builder/builder_reactor_normal';
import PlantaNuclear from '../../../../src/planta_nuclear';
import DirectorBuildReactor from '../../../../src/central_nuclear/reactor/builder/director_build_reactor';
import Sistema from '../../../../src/sistema_de_control/sistema';
import EncenderError from '../../../../src/errores/errores_central_nuclear/errores_de_los_estados_del_reactor/error_estado_enciendo/encender_error';
import { Constantes } from '../../../../src/central_nuclear/reactor/constantes';

describe('Test del estado REncenciendo', () => {
  let instance: REncenciendo;
  let mockPlanta: jest.Mocked<PlantaNuclear>;
  let mockSistema: jest.Mocked<Sistema>;
  let mockBuilderConcreto: jest.Mocked<BuilderReactorNormal>;
  let mockDirectorBuilder: jest.Mocked<DirectorBuildReactor>;
  let mockReactor: jest.Mocked<Reactor>;

  beforeEach(() => {
    mockPlanta = new PlantaNuclear() as jest.Mocked<PlantaNuclear>;
    mockSistema = new Sistema(mockPlanta) as jest.Mocked<Sistema>;
    mockBuilderConcreto = new BuilderReactorNormal() as jest.Mocked<BuilderReactorNormal>;
    mockDirectorBuilder = new DirectorBuildReactor(mockBuilderConcreto) as jest.Mocked<DirectorBuildReactor>;
    mockDirectorBuilder.cargarPlantaNuclear(mockPlanta);
    mockReactor = mockDirectorBuilder.buildReactorNormal() as jest.Mocked<Reactor>;

    jest.useFakeTimers();
    instance = new REncenciendo(mockReactor);
    mockReactor.setEstado(instance);
    mockReactor.setTemperatura(1);
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it('debería verificar que la instancia sea de tipo REncenciendo', () => {
    expect(instance).toBeInstanceOf(REncenciendo);
  });

  it('debería cambiar a estado RNormal si la temperatura alcanza o supera la temperatura mínima normal', () => {
    mockReactor.setTemperatura(Constantes.TEMP_MINIMA_NORMAL);
    instance.verificarEstado();
    expect(mockReactor.getEstado()).toBeInstanceOf(RNormal);
  });

  it('debería mantener la energía neta en 0', () => {
    expect(instance.obtenerEnergiaNeta()).toBe(0);
  });

  it('debería lanzar un error al intentar encender nuevamente', () => {
    expect(() => instance.encender()).toThrow(new EncenderError);
  });

  it('debería cambiar correctamente al estado RApagado al apagar', () => {
    instance.apagar();
    expect(mockReactor.getEstado()).toBeInstanceOf(RApagado);
  });

  it('debería devolver true al verificar si está encendido', () => {
    expect(instance.estaEncendido()).toBeTruthy();
  });

  it('debería devolver null al generar alertas', () => {
    expect(instance.generarAlerta()).toBeNull();
  });

  it('debería devolver false al verificar si puede insertar barras', () => {
    expect(instance.puedeInsertarBarras()).toBeFalsy();
  });
});
