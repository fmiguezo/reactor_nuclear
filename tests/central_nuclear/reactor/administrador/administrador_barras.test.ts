import RCritico from "../../../../src/central_nuclear/reactor/estados_reactor/critico";
import RApagado from "../../../../src/central_nuclear/reactor/estados_reactor/apagado";
import BuilderReactorNormal from "../../../../src/central_nuclear/reactor/builder/builder_reactor_normal";
import PlantaNuclear from "../../../../src/planta_nuclear";
import DirectorBuildReactor from "../../../../src/central_nuclear/reactor/builder/director_build_reactor";
import Sistema from "../../../../src/sistema_de_control/sistema";
import BarraControl from "../../../../src/central_nuclear/barras_control/barra_control";
import IMecanismoDeControl from "../../../../src/central_nuclear/interfaces/imecanismo_control";
import ISensor from "../../../../src/central_nuclear/interfaces/isensor";
import AdministradorBarras from "../../../../src/central_nuclear/reactor/administrador/administrador_barras";
import Eliminada from "../../../../src/central_nuclear/barras_control/estados/eliminada";
import { Constantes } from "../../../../src/central_nuclear/reactor/constantes";
import InsertarBarrasError from "../../../../src/errores/errores_central_nuclear/errores_del_administrador_de_barras/insertar_barras_error";
import EstadoReactor from "../../../../src/central_nuclear/reactor/estados_reactor/estadoreactor";
import Reactor from "../../../../src/central_nuclear/reactor/reactor";
import EstadoBarraControl from "../../../../src/central_nuclear/barras_control/estados/estado_barra_control";

describe("Test del administrador de barras", () => {
  let plantaNuclear = new PlantaNuclear();
  let sistema: Sistema = new Sistema(plantaNuclear);
  let MockDirector: jest.Mocked<DirectorBuildReactor> =
    new DirectorBuildReactor(
      new BuilderReactorNormal()
    ) as jest.Mocked<DirectorBuildReactor>;
  MockDirector.cargarPlantaNuclear(plantaNuclear);
  let reactor: Reactor;
  let MockApagado: jest.Mocked<RApagado>;
  let MockCritico: jest.Mocked<RCritico>;
  let MockBarrasControl: jest.Mocked<BarraControl>;
  let MockMecanismosControl: jest.Mocked<IMecanismoDeControl>;
  let MockSensor: jest.Mocked<ISensor>;

  beforeEach(() => {
    jest.useFakeTimers();
    reactor = MockDirector.buildReactorNormal();
    MockApagado = new RApagado(reactor) as jest.Mocked<RApagado>;
    reactor.setEstado(MockApagado);
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("deberia obtener las barras insertadas", () => {
    reactor.encender();
    // Obtiene directamente del reactor las barras, y se fija cuáles están insertadas
    let barrasTotalesFromReactor: BarraControl[] = reactor.getBarrasDeControl();
    let barrasInsertadasFromReactor: BarraControl[] =
      barrasTotalesFromReactor.filter((b) => b.estaActivo());
    // Obtiene las barras insertadas preguntándole al administrador de barras
    let barrasInsertadasFromADMIN: BarraControl[] = reactor
      .getAdministradorBarras()
      .getBarrasInsertadas();

    // Verifica que el número de barras insertadas coincida
    expect(barrasInsertadasFromADMIN.length).toBe(
      barrasInsertadasFromReactor.length
    );

    // Verifica que los objetos de cada colección coincidan
    expect(barrasInsertadasFromADMIN).toEqual(barrasInsertadasFromReactor);
  });

  it("deberia poder agregar barras", () => {
    reactor.encender();
    let refAdministrador: AdministradorBarras =
      reactor.getAdministradorBarras();
    const coleccionOriginal: BarraControl[] =
      refAdministrador.getBarrasTotales();

    // Guardo el número de barras inicial en esta constante para evitar cambios
    const cantidadBarrasInicial: number = coleccionOriginal.length;

    refAdministrador.cargarBarras(10);
    // también puede pasarse el material por parámetro: refAdministrador.cargarBarras(10, "cadmio");

    let coleccionConNuevaBarras: BarraControl[] =
      refAdministrador.getBarrasTotales();

    expect(coleccionConNuevaBarras.length).toBe(cantidadBarrasInicial + 10);
  });

  it("Verifica que getBarrasEnDesuso() funcione bien", () => {
    let barrasTotalesFromReactor: BarraControl[] = reactor.getBarrasDeControl();
    let barrasEnDesusoFromReactor: BarraControl[] =
      barrasTotalesFromReactor.filter((b) => !b.estaActivo());

    expect(barrasEnDesusoFromReactor.length).toBeGreaterThan(0);

    let barrasEnDesusoFromAdmin: BarraControl[] = reactor
      .getAdministradorBarras()
      .getBarrasEnDesuso();

    // Verifica que la cantidad sea la misma
    expect(barrasEnDesusoFromAdmin.length).toBe(
      barrasEnDesusoFromReactor.length
    );

    // Verifica que los objetos sean iguales
    expect(barrasEnDesusoFromAdmin).toEqual(barrasEnDesusoFromReactor);
  });

  it("Verifica que getBarrasVencidas() funcione bien", () => {
    let barrasTotalesFromReactor: BarraControl[] = reactor.getBarrasDeControl();
    let barrasVencidasFromReactor: BarraControl[] =
      barrasTotalesFromReactor.filter(
        (b) => !b.estaActivo() && b.getVidaUtilRestante() === 0
      );

    let barrasVencidasFromAdmin: BarraControl[] = reactor
      .getAdministradorBarras()
      .getBarrasVencidas();

    // Verifica que la cantidad sea la misma
    expect(barrasVencidasFromAdmin.length).toBe(
      barrasVencidasFromReactor.length
    );

    // Verifica que los objetos sean iguales
    expect(barrasVencidasFromAdmin).toEqual(barrasVencidasFromReactor);

    // Pasa todas las barras a estado vencido
    barrasTotalesFromReactor.forEach((b) => {
      b.cambiarEstado(new Eliminada());
    });

    // Refresca los valores
    barrasTotalesFromReactor = reactor.getBarrasDeControl();
    barrasVencidasFromReactor = barrasTotalesFromReactor.filter(
      (b) => !b.estaActivo() && b.getVidaUtilRestante() === 0
    );

    barrasVencidasFromAdmin = reactor
      .getAdministradorBarras()
      .getBarrasVencidas();

    // Verifica que la cantidad sea la misma
    expect(barrasVencidasFromAdmin.length).toBe(
      barrasVencidasFromReactor.length
    );

    // Verifica que los objetos sean iguales
    expect(barrasVencidasFromAdmin).toEqual(barrasVencidasFromReactor);
  });

  it("No deberia poder insertar barras en estado normal", () => {
    let aliasAdmin: AdministradorBarras = reactor.getAdministradorBarras();
    const numInsertadasOriginales: number =
      aliasAdmin.getBarrasInsertadas().length;

    const estadoReactor: EstadoReactor = reactor.getEstado();
    expect(estadoReactor.puedeInsertarBarras()).toBeFalsy();

    expect(() => aliasAdmin.insertarBarras()).toThrow(
      new InsertarBarrasError(Constantes.NO_PUEDE_INSERTAR_BARRA)
    );

    // Verifica que no haya cambiado el número de barras insertadas
    expect(aliasAdmin.getBarrasInsertadas().length).toBe(
      numInsertadasOriginales
    );
  });

  it("Debería poder insertar barras en estado crítico", () => {
    reactor.encender();

    // Pasa el reactor a estado crítico y lo verifica
    reactor.setEstado(new RCritico(reactor));
    expect(reactor.getEstado()).toBeInstanceOf(RCritico);

    // Revisa que las barras no estén insertadas
    const aliasAdmin: AdministradorBarras = reactor.getAdministradorBarras();
    let cantbarrasTotales: number = aliasAdmin.getBarrasTotales().length;
    let cantBarrasInsertadas: number = aliasAdmin.getBarrasInsertadas().length;
    expect(cantBarrasInsertadas).toBe(0);

    // Revisa que las barras puedan insertarse
    expect(reactor.puedeInsertarBarras()).toBeTruthy();

    // Inserta todas las barras
    aliasAdmin.insertarBarras();
    cantbarrasTotales = aliasAdmin.getBarrasTotales().length;
    cantBarrasInsertadas = aliasAdmin.getBarrasInsertadas().length;
    expect(cantbarrasTotales).toBe(cantBarrasInsertadas);
  });

  it("debería reemplazar las barras vencidas", () => {
    const aliasAdmin: AdministradorBarras = reactor.getAdministradorBarras();
    reactor.encender();
    reactor.setTemperatura(Constantes.TEMP_MINIMA_CRITICA + 20);

    reactor.getEstado().verificarEstado();
    reactor.getEstado().verificarEstado();
    expect(reactor.getEstado()).toBeInstanceOf(RCritico);

    // Inserta las barras
    aliasAdmin.insertarBarras();

    // Valores iniciales
    const cantInicialBarrasTotales: number =
      aliasAdmin.getBarrasTotales().length;
    const cantInicialBarrasVencidas: number =
      aliasAdmin.getBarrasVencidas().length;

    // Pasa las barras a estado Eliminado
    const barrasTotalesColeccion: BarraControl[] =
      aliasAdmin.getBarrasTotales();

    // Elimina los timers para evitar que el reactor explote
    jest.clearAllTimers();

    barrasTotalesColeccion.forEach((b) => {
      const nuevoEstado: EstadoBarraControl = new Eliminada();
      b.setVidaUtilRestante(0);
      b.cambiarEstado(nuevoEstado);
      nuevoEstado.setBarraControl(b);
    });

    const cantFinalBarrasVencidas: number =
      aliasAdmin.getBarrasVencidas().length;

    expect(cantFinalBarrasVencidas).toBe(cantInicialBarrasTotales);

    // Reemplaza las barras vencidas
    aliasAdmin.reemplazarBarrasVencidas();

    const cantBarrasTotalesDespReemp: number =
      aliasAdmin.getBarrasTotales().length;

    const cantBarrasVencidasDespReemp: number =
      aliasAdmin.getBarrasVencidas().length;

    expect(cantBarrasVencidasDespReemp).toBe(0);

    // Verifica que el número de barras totales sea el mismo
    expect(cantBarrasTotalesDespReemp).toBe(cantInicialBarrasTotales);
  });
});
