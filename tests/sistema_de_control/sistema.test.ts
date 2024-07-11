import EstadoReactor from "../../src/central_nuclear/reactor/estados_reactor/estadoreactor";
import Reactor from "../../src/central_nuclear/reactor/reactor";
import PlantaNuclear from "../../src/planta_nuclear";
import Alerta from "../../src/sistema_de_control/alertas/alerta";
import Cli from "../../src/sistema_de_control/cli/cli";
import Sistema from "../../src/sistema_de_control/sistema";

describe("Test de la clase Sistema", () => {
  let plantaNuclear: PlantaNuclear;
  let sistema: Sistema;
  let reactor: Reactor;
  let estadoReactor: EstadoReactor;
  let alerta: Alerta;

  beforeEach(() => {
    plantaNuclear = new PlantaNuclear();
    sistema = new Sistema(plantaNuclear);
    reactor = new Reactor();
    estadoReactor = {
      generarAlerta: jest.fn().mockReturnValue({
        notificar: jest.fn(),
      }),
    } as unknown as EstadoReactor;
    alerta = estadoReactor.generarAlerta() as Alerta;
    reactor.getEstado = jest.fn().mockReturnValue(estadoReactor);
    plantaNuclear.getReactores = jest.fn().mockReturnValue([reactor]);
  });

  it("debería cargar una nueva planta", () => {
    const nuevaPlanta = new PlantaNuclear();
    sistema.cargarPlanta(nuevaPlanta);
    expect(sistema.obtenerPlanta()).toBe(nuevaPlanta);
  });

  it("debería obtener la planta actual", () => {
    expect(sistema.obtenerPlanta()).toBe(plantaNuclear);
  });

  it("debería actualizar un reactor y notificar la alerta generada", () => {
    sistema.actualizar(reactor);
    expect(estadoReactor.generarAlerta).toHaveBeenCalled();
    expect(alerta.notificar).toHaveBeenCalled();
  });

  it("debería actualizar todos los reactores y notificar las alertas generadas", () => {
    sistema.actualizarTodo();
    expect(estadoReactor.generarAlerta).toHaveBeenCalled();
    expect(alerta.notificar).toHaveBeenCalled();
  });

  it("debería iniciar una nueva sesión en CLI", () => {
    const cliMock = jest.spyOn(Cli.prototype, "nuevaSesion");
    sistema.init();
    expect(cliMock).toHaveBeenCalledWith(sistema);
    cliMock.mockRestore();
  });
});
