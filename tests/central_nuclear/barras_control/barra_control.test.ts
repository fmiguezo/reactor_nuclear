import BarraControl from "../../../src/central_nuclear/barras_control/barra_control";
import EstadoBarraControl from "../../../src/central_nuclear/barras_control/estados/estado_barra_control";
import EnDesuso from "../../../src/central_nuclear/barras_control/estados/en_desuso";
import Insertada from "../../../src/central_nuclear/barras_control/estados/insertada";
import Eliminada from "../../../src/central_nuclear/barras_control/estados/eliminada";
import BarraControlCadmio from "../../../src/central_nuclear/barras_control/barra_control_cadmio";
import FabricaBarraCadmio from "../../../src/central_nuclear/barras_control/fabrica/fabrica_barra_cadmio";
import FabricaBarra from "../../../src/central_nuclear/barras_control/fabrica/fabrica_barra";

describe("Test de Barra de Control: Activar/Desactivar", () => {
  let instance: BarraControl;

  beforeEach(() => {
    jest.useFakeTimers();
    const fabricaBarras: FabricaBarra = new FabricaBarraCadmio();
    instance = fabricaBarras.crearBarra();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("Verifica que esté en el estado correspondiente por defecto", () => {
    expect(instance.getEstado()).toBeInstanceOf(EnDesuso);
  });

  it("Verifica que no esté activa", () => {
    let estado: boolean = instance.estaActivo();
    expect(estado).toBeFalsy();
  });

  it("Verifica que pueda activarse", () => {
    instance.activar();
    let estado: boolean = instance.estaActivo();
    expect(estado).toBeTruthy();
  });

  it("Verifica que pueda activarse y desactivarse", () => {
    instance.activar();
    instance.desactivar();
    let estado: boolean = instance.estaActivo();
    expect(estado).toBeFalsy();
  });
});

describe("Test de Barra de Control: Calculo porcentaje reduccion temp", () => {
  let instance: BarraControl;

  beforeEach(() => {
    jest.useFakeTimers();
    instance = new BarraControlCadmio(3600);
  });

  describe("Con barra insertada:", () => {
    beforeEach(() => {
      jest.useFakeTimers();
      const estadoInsertada: EstadoBarraControl = new Insertada();
      instance.cambiarEstado(estadoInsertada);
    });

    it("Verifica que el calculo funcione adecuadamente", () => {
      const porcentajeObtenido: number = instance.getPctBarra();
      expect(porcentajeObtenido).toBe(100);
    });

    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
      jest.clearAllMocks();
      jest.clearAllTimers();
    });
  });

  describe("Con barra EnDesuso:", () => {
    beforeEach(() => {
      const estadoInsertada: EstadoBarraControl = new EnDesuso();
      instance.cambiarEstado(estadoInsertada);
    });

    it("Verifica que el calculo funcione adecuadamente", () => {
      const porcentajeObtenido: number = instance.getPctBarra();
      expect(porcentajeObtenido).toBe(100);
    });
  });

  describe("Con barra Eliminada:", () => {
    beforeEach(() => {
      jest.useFakeTimers();
      const estadoInsertada: EstadoBarraControl = new Insertada();
      instance.cambiarEstado(estadoInsertada);
      jest.advanceTimersByTime(3600);
    });

    it("Verifica que el calculo funcione adecuadamente", () => {
      const porcentajeObtenido: number = instance.getPctBarra();
      expect(instance.getEstado()).toBeInstanceOf(Eliminada);
      expect(porcentajeObtenido).toBe(0);
    });

    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
      jest.clearAllMocks();
      jest.clearAllTimers();
    });
  });
});
