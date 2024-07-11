import RegistroComandosDisponibles from '../../../../reactor_nuclear/src/sistema_de_control/comandos/registro_comandos_disponibles';
import Command from '../../../../reactor_nuclear/src/sistema_de_control/comandos/command';

describe('RegistroComandosDisponibles', () => {
    let registro: RegistroComandosDisponibles;
    let commandMock: Command;
  
    beforeEach(() => {
      registro = RegistroComandosDisponibles.instancia;
      commandMock = {} as Command; // Mock básico para Command, ajustar según necesidades reales
    });
  
    afterEach(() => {
      // Limpiar mapa de comandos después de cada test
      registro = RegistroComandosDisponibles.instancia;
      registro.obtenerCommands().clear();
    });

    it('Debería tener un atributo estático _instancia del tipo RegistroComandosDisponibles', () => {
        expect(registro).toBeInstanceOf(RegistroComandosDisponibles);
      });
    
      it('Debería tener un atributo mapaRegistros del tipo Map<String, Command>', () => {
        const comandos = registro.obtenerCommands();
        expect(comandos).toBeInstanceOf(Map);
        expect(comandos.size).toBe(0); // Verificamos que el mapa esté inicialmente vacío
      });
    
      it('El constructor debería inicializar correctamente mapaRegistros', () => {
        const registroNuevo = RegistroComandosDisponibles.instancia; // Accedemos a través del getter estático
        const comandos = registroNuevo.obtenerCommands();
        expect(comandos).toBeInstanceOf(Map);
        expect(comandos.size).toBe(0); // Verificamos que el mapa esté inicialmente vacío al acceder mediante el getter estático
      });
  
    it('Debería crear una única instancia singleton', () => {
      const instancia1 = RegistroComandosDisponibles.instancia;
      const instancia2 = RegistroComandosDisponibles.instancia;
      expect(instancia1).toBe(instancia2);
    });
  
    it('Debería insertar un comando correctamente', () => {
      registro.insertarCommand('comando1', commandMock);
      const comandos = registro.obtenerCommands();
      expect(comandos.size).toBe(1);
      expect(comandos.get('comando1')).toBe(commandMock);
    });
  
    it('Debería devolver todos los comandos insertados', () => {
      registro.insertarCommand('comando1', commandMock);
      registro.insertarCommand('comando2', commandMock);
      const comandos = registro.obtenerCommands();
      expect(comandos.size).toBe(2);
      expect(comandos.get('comando1')).toBe(commandMock);
      expect(comandos.get('comando2')).toBe(commandMock);
    });
  
    it('Debería inicializar el mapa de comandos en el constructor', () => {
      expect(registro.obtenerCommands().size).toBe(0);
    });
  
    it('Debería devolver una copia del mapa de comandos', () => {
      const comandosOriginal = registro.obtenerCommands();
      comandosOriginal.set('comando1', commandMock);
      const comandosCopia = registro.obtenerCommands();
      expect(comandosCopia.size).toBe(1);
      expect(comandosCopia.get('comando1')).toBe(commandMock);
    });
  });
