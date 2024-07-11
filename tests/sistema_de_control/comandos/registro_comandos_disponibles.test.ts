import RegistroComandosDisponibles from "../../../../reactor_nuclear/src/sistema_de_control/comandos/registro_comandos_disponibles";
import Command from "../../../../reactor_nuclear/src/sistema_de_control/comandos/command";

class MockCommand implements Command {
  ejecutar() {
    // Mock implementation
  }
}

describe("Singleton RegistroComandosDisponibles", () => {
  it("_instancia debe ser undefined antes de obtener una instancia", () => {
    expect(RegistroComandosDisponibles["_instancia"]).toBeUndefined();
  });

  it("_instancia no debe ser undefined luego de obtener una instancia", () => {
    const instanciaSingleton: RegistroComandosDisponibles = RegistroComandosDisponibles.instancia;
    expect(RegistroComandosDisponibles["_instancia"]).not.toBeUndefined();
  });

  it("verifica que las instancias obtenidas sean iguales", () => {
    const instanciaSingletonA: RegistroComandosDisponibles = RegistroComandosDisponibles.instancia;
    const instanciaSingletonB: RegistroComandosDisponibles = RegistroComandosDisponibles.instancia;

    expect(instanciaSingletonA).toBe(instanciaSingletonB);
  });
});

describe("RegistroComandosDisponibles", () => {
  let registro: RegistroComandosDisponibles;
  let commandMock: Command;

  beforeEach(() => {
    // Reset the singleton instance
    (RegistroComandosDisponibles as any)._instancia = undefined;
    registro = RegistroComandosDisponibles.instancia;
    commandMock = new MockCommand();
    registro.obtenerCommands().clear(); // Clear the command map before each test
  });

  it("MapaRegistros debe contener un Map", () => {
    expect(registro["mapaRegistros"]).not.toBeUndefined();
  });

  it("Debería insertar un comando correctamente y obtenerlo después", () => {
    const nombreComando = "comando1";
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

  it("Debería devolver todos los comandos insertados", () => {
    registro.insertarCommand("comando1", commandMock);
    registro.insertarCommand("comando2", commandMock);
    const comandos = registro.obtenerCommands();
    expect(comandos.size).toBe(2);
    expect(comandos.get("comando1")).toBe(commandMock);
    expect(comandos.get("comando2")).toBe(commandMock);
  });

  it("Debería devolver una instancia válida de Map<String, Command>", () => {
    const comandos = registro.obtenerCommands();
    expect(comandos).toBeInstanceOf(Map);
  });

  it("should create an instance only once (singleton pattern)", () => {
    const anotherRegistro = RegistroComandosDisponibles.instancia;
    expect(registro).toBe(anotherRegistro);
  });

  it("should initialize mapaRegistros in the constructor", () => {
    expect(registro.obtenerCommands()).toBeInstanceOf(Map);
  });

  it("should insert a new command into mapaRegistros", () => {
    const commandName = "testCommand";
    registro.insertarCommand(commandName, commandMock);
    const commands = registro.obtenerCommands();

    expect(commands.size).toBe(1);
    expect(commands.get(commandName)).toBe(commandMock);
  });

  it("should insert multiple commands with different names", () => {
    const commandName1 = "testCommand1";
    const commandName2 = "testCommand2";
    const command2 = new MockCommand();

    registro.insertarCommand(commandName1, commandMock);
    registro.insertarCommand(commandName2, command2);

    const commands = registro.obtenerCommands();

    expect(commands.size).toBe(2);
    expect(commands.get(commandName1)).toBe(commandMock);
    expect(commands.get(commandName2)).toBe(command2);
  });

  it("should update an existing command with the same name", () => {
    const commandName = "testCommand";
    const command2 = new MockCommand();

    registro.insertarCommand(commandName, commandMock);
    registro.insertarCommand(commandName, command2);

    const commands = registro.obtenerCommands();

    expect(commands.size).toBe(1);
    expect(commands.get(commandName)).toBe(command2);
  });

  it("should return the correct commands from obtenerCommands", () => {
    const commandName1 = "testCommand1";
    const commandName2 = "testCommand2";
    const commandName3 = "testCommand3";
    const command2 = new MockCommand();
    const command3 = new MockCommand();

    registro.insertarCommand(commandName1, commandMock);
    registro.insertarCommand(commandName2, command2);
    registro.insertarCommand(commandName3, command3);

    const commands = registro.obtenerCommands();

    expect(commands.size).toBe(3);
    expect(commands.get(commandName1)).toBe(commandMock);
    expect(commands.get(commandName2)).toBe(command2);
    expect(commands.get(commandName3)).toBe(command3);
  });
});
