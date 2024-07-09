import * as readline from "readline";
import Cli from "../../../src/sistema_de_control/cli/cli";
import { Constantes } from "../../../src/sistema_de_control/cli/constantes";
import Sistema from "../../../src/sistema_de_control/sistema";
import PlantaNuclear from "../../../src/planta_nuclear";

jest.mock("readline");

describe("CLI", () => {
  let instancia: Cli;
  let sistema: Sistema;

  beforeEach(() => {
    instancia = new Cli();
    sistema = new Sistema(new PlantaNuclear());
  });

  it("Debería crear una readline.Interface en nuevaSesion()", () => {
    const mockReadlineInterface: readline.Interface = {
      write: jest.fn(),
      on: jest.fn(),
      close: jest.fn(),
      pause: jest.fn(),
      question: jest.fn(),
      resume: jest.fn(),
      setPrompt: jest.fn(),
      prompt: jest.fn(),
      removeAllListeners: jest.fn(),
    } as unknown as readline.Interface;

    (readline.createInterface as jest.Mock).mockReturnValue(
      mockReadlineInterface
    );

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
});
