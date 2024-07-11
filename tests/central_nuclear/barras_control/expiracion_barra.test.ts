import BarraControl from "../../../src/central_nuclear/barras_control/barra_control";
import Eliminada from "../../../src/central_nuclear/barras_control/estados/eliminada";
import EnDesuso from "../../../src/central_nuclear/barras_control/estados/en_desuso";
import Insertada from "../../../src/central_nuclear/barras_control/estados/insertada";
import BarraControlCadmio from "../../../src/central_nuclear/barras_control/barra_control_cadmio";
import FabricaBarraCadmio from "../../../src/central_nuclear/barras_control/fabrica/fabrica_barra_cadmio";
import FabricaBarra from "../../../src/central_nuclear/barras_control/fabrica/fabrica_barra";

describe("Test de Barra de Control: expiracion", () => {
  let barraControl: BarraControl;

  beforeEach(() => {
    jest.useFakeTimers();
    const fabricaBarra: FabricaBarra = new FabricaBarraCadmio();
    barraControl = fabricaBarra.crearBarra();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("Recién creada debe estar en estado EnDesuso", () => {
    expect(barraControl.getEstado()).toBeInstanceOf(EnDesuso);
  });

  it("Recién creada debe tener una vida útil de 120000", () => {
    expect(barraControl.getEstado()).toBeInstanceOf(EnDesuso);
    barraControl.activar();
    expect(barraControl.getEstado()).toBeInstanceOf(Insertada);
    jest.advanceTimersByTime(120000);
    expect(barraControl.getEstado()).toBeInstanceOf(Eliminada);
    expect(barraControl.estaActivo()).toBeFalsy();
  });

  it("Testea que la barra cambie de estado a Eliminada despues de expirar", () => {
    jest.useFakeTimers();
    barraControl.activar();
    let estaActiva = barraControl.estaActivo();
    expect(estaActiva).toBeTruthy();

    jest.advanceTimersByTime(64000);
    estaActiva = barraControl.estaActivo();
    expect(estaActiva).toBeTruthy();
    expect(barraControl.getEstado()).toBeInstanceOf(Insertada);

    jest.advanceTimersByTime(64000);
    estaActiva = barraControl.estaActivo();
    expect(estaActiva).toBeFalsy();
    expect(barraControl.getEstado()).toBeInstanceOf(Eliminada);
  });

  it("Verifica que la barra mantenga el tiempo restante adecuado despues de cambiar de estado", () => {
    jest.useFakeTimers();

    barraControl.cambiarEstado(new Insertada());

    let estaActiva = barraControl.estaActivo();
    expect(estaActiva).toBeTruthy();

    jest.advanceTimersByTime(1000);
    expect(barraControl.getEstado()).toBeInstanceOf(Insertada);

    barraControl.desactivar();
    expect(barraControl.getEstado()).toBeInstanceOf(EnDesuso);

    estaActiva = barraControl.estaActivo();
    expect(estaActiva).toBeFalsy();

    jest.advanceTimersByTime(500); // Estos 50ms no cuentan, transcurren con la barra retirada.

    barraControl.cambiarEstado(new Insertada());

    jest.advanceTimersByTime(500);
    expect(barraControl.getEstado()).toBeInstanceOf(Insertada);

    jest.advanceTimersByTime(500);
    expect(barraControl.getEstado()).toBeInstanceOf(Eliminada);
  });
});
