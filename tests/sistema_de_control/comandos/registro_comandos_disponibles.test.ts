import RegistroComandosDisponibles from '../../../../reactor_nuclear/src/sistema_de_control/comandos/registro_comandos_disponibles';
import Command from '../../../../reactor_nuclear/src/sistema_de_control/comandos/command';

describe('RegistroComandosDisponibles', () => {
  let registro: RegistroComandosDisponibles;
  let commandMock: Command;

  beforeEach(() => {
    registro = RegistroComandosDisponibles.instancia;
    commandMock = {} as Command; // Mock básico para Command, ajustar según necesidades reales
    registro.obtenerCommands().clear(); // Limpiar mapa de comandos antes de cada prueba
  });

  it('Debería insertar un comando correctamente y obtenerlo después', () => {
    const nombreComando = 'comando1';
    registro.insertarCommand(nombreComando, commandMock);
    const comandos = registro.obtenerCommands();

    // Verificar inserción correcta
    expect(comandos.size).toBe(1);
    expect(comandos.get(nombreComando)).toBe(commandMock);

    // Verificar obtener el comando insertado
    const comandoObtenido = comandos.get(nombreComando);
    expect(comandoObtenido).toBeDefined();
    expect(comandoObtenido).toBe(commandMock);
  });

  it('Debería devolver todos los comandos insertados', () => {
    registro.insertarCommand('comando1', commandMock);
    registro.insertarCommand('comando2', commandMock);
    const comandos = registro.obtenerCommands();
    expect(comandos.size).toBe(2);
    expect(comandos.get('comando1')).toBe(commandMock);
    expect(comandos.get('comando2')).toBe(commandMock);
  });

  it('Debería devolver una instancia válida de Map<String, Command>', () => {
    const comandos = registro.obtenerCommands();
    expect(comandos).toBeInstanceOf(Map);
  });
});