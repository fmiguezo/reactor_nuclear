import BarraControl from "../../../CentralNuclear/BarrasDeControl/BarraControl";
import EstadoBarraControl from "../../../CentralNuclear/BarrasDeControl/EstadosBarraControl/EstadoBarraControl";
import EnDesuso from "../../../CentralNuclear/BarrasDeControl/EstadosBarraControl/EnDesuso";
import Insertada from "../../../CentralNuclear/BarrasDeControl/EstadosBarraControl/Insertada";
import Eliminada from "../../../CentralNuclear/BarrasDeControl/EstadosBarraControl/Eliminada";
import BarraControlCadmio from "../../../CentralNuclear/BarrasDeControl/BarraControlCadmio";

describe("Test de Barra de Control: Activar/Desactivar", () => {
  let instance: BarraControl;

  beforeEach(() => {
    let defaultState: EstadoBarraControl = new EnDesuso();
    instance = new BarraControlCadmio(200, defaultState);
  });

  it("Verifica que no esté activa", () => {
    let estado: boolean = instance.estaActivo();
    expect(estado).toBe(false);
  });

  it("Verifica que pueda activarse", () => {
    instance.activar();
    let estado: boolean = instance.estaActivo();
    expect(estado).toBe(true);
  });

  it("Verifica que pueda activarse y desactivarse", () => {
    instance.activar();
    instance.desactivar();
    let estado: boolean = instance.estaActivo();
    expect(estado).toBe(false);
  });
});

describe("Test de Barra de Control: Calculo porcentaje reduccion temp", () => {
  let instance: BarraControl;

  beforeEach(() => {
    instance = new BarraControlCadmio(3600);
  });

  describe("Con barra insertada:", () => {
    beforeEach(() => {
      jest.useFakeTimers();
      const estadoInsertada: EstadoBarraControl = new Insertada();
      instance.cambiarEstado(estadoInsertada);
      jest.clearAllTimers();
    });

    it("Verifica que el calculo funcione adecuadamente", () => {
      const porcentajeObtenido: number = instance.getPctBarra();
      expect(porcentajeObtenido).toBe(100);
    });

    afterEach(() => {
      jest.clearAllTimers();
      jest.useRealTimers();
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
      expect(instance.estado).toBeInstanceOf(Eliminada);
      expect(porcentajeObtenido).toBe(0);
    });

    afterEach(() => {
      jest.clearAllTimers();
      jest.useRealTimers();
    });
  });
});
