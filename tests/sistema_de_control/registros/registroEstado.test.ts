import EstadoReactor from "../../../src/central_nuclear/reactor/estados_reactor/estadoreactor";
import RegistroEstados from "../../../src/sistema_de_control/registros/registroEstados";
import Reactor from "../../../src/central_nuclear/reactor/reactor";
import RCritico from "../../../src/central_nuclear/reactor/estados_reactor/critico";
import RNormal from "../../../src/central_nuclear/reactor/estados_reactor/normal";
import RApagado from "../../../src/central_nuclear/reactor/estados_reactor/apagado";

describe("Singleton RegistroEstados", () => {
  it("_instancia debe ser undefined antes de obtener una instancia", () => {
    expect(RegistroEstados["_instancia"]).toBeUndefined();
  });

  it("_instancia no debe ser undefined luego de obtener una instancia", () => {
    const instanciaSingleton: RegistroEstados = RegistroEstados.instancia;
    expect(RegistroEstados["_instancia"]).not.toBeUndefined();
  });

  it("verifica que las instancias obtenidas sean iguales", () => {
    const instanciaSingletonA: RegistroEstados = RegistroEstados.instancia;
    const instanciaSingletonB: RegistroEstados = RegistroEstados.instancia;

    expect(instanciaSingletonA).toBe(instanciaSingletonB);
  });
});

describe("RegistroEstados", () => {
  let registroEstados: RegistroEstados;
  let estadoMock: EstadoReactor;

  beforeEach(() => {
    registroEstados = RegistroEstados.instancia;
    estadoMock = {} as EstadoReactor;
    registroEstados._contadorCambiosEstado = new Map<EstadoReactor, number>();
  });

  it("debería crear una instancia única de RegistroEstados", () => {
    const otraInstancia = RegistroEstados.instancia;
    expect(registroEstados).toBe(otraInstancia);
  });

  it("debería aumentar el conteo de cambios de estado", () => {
    registroEstados.aumentarRegistro(estadoMock);
    expect(registroEstados._contadorCambiosEstado.get(estadoMock)).toBe(1);

    registroEstados.aumentarRegistro(estadoMock);
    expect(registroEstados._contadorCambiosEstado.get(estadoMock)).toBe(2);
  });

  it("debería obtener y establecer el contador de cambios de estado", () => {
    const nuevoContador = new Map<EstadoReactor, number>();
    nuevoContador.set(estadoMock, 5);

    registroEstados._contadorCambiosEstado = nuevoContador;
    expect(registroEstados._contadorCambiosEstado).toBe(nuevoContador);
    expect(registroEstados._contadorCambiosEstado.get(estadoMock)).toBe(5);
  });
});
