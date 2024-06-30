import BarraControl from "../../../src/central_nuclear/barras_control/barra_control";
import Eliminada from "../../../src/central_nuclear/barras_control/estados/eliminada";
import EnDesuso from "../../../src/central_nuclear/barras_control/estados/en_desuso";
import Insertada from "../../../src/central_nuclear/barras_control/estados/insertada";
import BarraControlCadmio from "../../../src/central_nuclear/barras_control/barra_control_cadmio";

describe("Test de Barra de Control: expiracion", () => {
  let barraControl: BarraControl;

  beforeEach(() => {
    barraControl = new BarraControlCadmio(200, new EnDesuso());
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("Testea que la barra cambie de estado a Eliminada despues de expirar", () => {
    jest.useFakeTimers();

    barraControl.cambiarEstado(new Insertada());

    let estaActiva = barraControl.estaActivo();
    expect(estaActiva).toBeTruthy();

    jest.advanceTimersByTime(100);
    estaActiva = barraControl.estaActivo();
    expect(estaActiva).toBeTruthy();
    expect(barraControl.getEstado()).toBeInstanceOf(Insertada);

    jest.advanceTimersByTime(100);
    estaActiva = barraControl.estaActivo();
    expect(estaActiva).toBeFalsy();
    expect(barraControl.getEstado()).toBeInstanceOf(Eliminada);
  });

  it("Verifica que la barra mantenga el tiempo restante adecuado despues de cambiar de estado", () => {
    jest.useFakeTimers();

    barraControl.cambiarEstado(new Insertada());

    let estaActiva = barraControl.estaActivo();
    expect(estaActiva).toBeTruthy();

    jest.advanceTimersByTime(100);
    expect(barraControl.getEstado()).toBeInstanceOf(Insertada);

    barraControl.desactivar();
    expect(barraControl.getEstado()).toBeInstanceOf(EnDesuso);

    estaActiva = barraControl.estaActivo();
    expect(estaActiva).toBeFalsy();

    jest.advanceTimersByTime(50); // Estos 50ms no cuentan, transcurren con la barra retirada.

    barraControl.cambiarEstado(new Insertada());

    jest.advanceTimersByTime(50);
    expect(barraControl.getEstado()).toBeInstanceOf(Insertada);

    jest.advanceTimersByTime(50);
    expect(barraControl.getEstado()).toBeInstanceOf(Eliminada);
  });
});
