import * as readline from "readline";
import Cli from "../../../src/sistema_de_control/cli/cli";
import { Constantes } from "../../../src/sistema_de_control/cli/constantes";
import Sistema from "../../../src/sistema_de_control/sistema";
import PlantaNuclear from "../../../src/planta_nuclear";
import ReactorNoEncontradoError from "../../../src/errores/errores_sistema_de_control/error_reactor_no_encontrado";
import RegistroComandosDisponibles from "../../../src/sistema_de_control/comandos/registro_comandos_disponibles";

jest.mock("readline");
jest.mock("../../../src/sistema_de_control/comandos/registro_comandos_disponibles");

describe("CLI", () => {
  let instancia: Cli;
  let sistema: Sistema;
  let mockReadlineInterface: {
    write: jest.Mock;
    on: jest.Mock;
    close: jest.Mock;
    pause: jest.Mock;
    question: jest.Mock;
    resume: jest.Mock;
    setPrompt: jest.Mock;
    prompt: jest.Mock;
    removeAllListeners: jest.Mock;
  };

  beforeEach(() => {
    jest.useFakeTimers();
    instancia = new Cli();
    sistema = new Sistema(new PlantaNuclear());

    mockReadlineInterface = {
      write: jest.fn(),
      on: jest.fn(),
      close: jest.fn(),
      pause: jest.fn(),
      question: jest.fn(),
      resume: jest.fn(),
      setPrompt: jest.fn(),
      prompt: jest.fn(),
      removeAllListeners: jest.fn(),
    };

    (readline.createInterface as jest.Mock).mockReturnValue(mockReadlineInterface as unknown as readline.Interface);
  });

  afterAll(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("Debería crear una readline.Interface en nuevaSesion()", () => {
    const lanzarCliSpy = jest.spyOn(instancia as any, "lanzarCli");

    instancia.nuevaSesion(sistema);

    expect(readline.createInterface).toHaveBeenCalledWith({
      input: process.stdin,
      output: process.stdout,
    });

    expect(lanzarCliSpy).toHaveBeenCalledWith(sistema, mockReadlineInterface);
  });

  it("Debería retornar una readline.Interface al llamar creaInterfazRL()", () => {
    const rl: readline.Interface = instancia.creaInterfazRL();

    expect(typeof rl.write).toBe("function");
    expect(typeof rl.on).toBe("function");
    expect(typeof rl.close).toBe("function");
    expect(typeof rl.pause).toBe("function");
    expect(typeof rl.question).toBe("function");
    expect(typeof rl.resume).toBe("function");
    expect(typeof rl.setPrompt).toBe("function");
    expect(typeof rl.prompt).toBe("function");
    expect(typeof rl.removeAllListeners).toBe("function");
  });

  it("Debería escribir el mensaje de bienvenida y llamar a promptUser en lanzarCli()", () => {
    const promptUserSpy = jest.spyOn(instancia as any, "promptUser").mockImplementation(() => {});

    instancia["lanzarCli"](sistema, mockReadlineInterface as unknown as readline.Interface);

    expect(mockReadlineInterface.write).toHaveBeenCalled();
    expect(mockReadlineInterface.write.mock.calls[0][0]).toMatch(
      /Bienvenido al Sistema de Control de Plantas Nucleares/
    );
    expect(promptUserSpy).toHaveBeenCalledWith(sistema, mockReadlineInterface);
  });

  it("Debería manejar la lógica de entrada del usuario en promptUser()", () => {
    const obtenerPlantaMock = jest.fn().mockReturnValue({
      getReactores: jest.fn().mockReturnValue(new Map([[1, "reactor"]])),
    });

    sistema.obtenerPlanta = obtenerPlantaMock;

    mockReadlineInterface.question
      .mockImplementationOnce((query, callback) => callback("1"))
      .mockImplementationOnce((query, callback) => callback("comando"));

    const ejecutarMock = jest.fn();
    const instanciaRegistroComandosDisponibles = {
      obtenerCommands: jest.fn().mockReturnValue(new Map([["comando", { ejecutar: ejecutarMock }]])),
    };

    (RegistroComandosDisponibles as any).instancia = instanciaRegistroComandosDisponibles;

    instancia["promptUser"](sistema, mockReadlineInterface as unknown as readline.Interface);

    expect(mockReadlineInterface.question).toHaveBeenCalledWith(Constantes.MENSAJE_ID_REACTOR, expect.any(Function));
    expect(mockReadlineInterface.question).toHaveBeenCalledWith(
      Constantes.MENSAJE_COMMAND_ELEGIDO,
      expect.any(Function)
    );
    expect(ejecutarMock).toHaveBeenCalledWith("reactor");
  });

  it("Debería lanzar ReactorNoEncontradoError si el reactor no se encuentra en promptUser()", () => {
    const obtenerPlantaMock = jest.fn().mockReturnValue({
      getReactores: jest.fn().mockReturnValue(new Map()),
    });

    sistema.obtenerPlanta = obtenerPlantaMock;

    mockReadlineInterface.question
      .mockImplementationOnce((query, callback) => callback("1"))
      .mockImplementationOnce((query, callback) => callback("comando"));

    expect(() => instancia["promptUser"](sistema, mockReadlineInterface as unknown as readline.Interface)).toThrow(
      ReactorNoEncontradoError
    );
  });
});
