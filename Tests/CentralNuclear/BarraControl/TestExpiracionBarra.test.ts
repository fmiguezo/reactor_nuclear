import BarraControl from "../../../CentralNuclear/BarrasDeControl/BarraControl";
import Eliminada from "../../../CentralNuclear/BarrasDeControl/EstadosBarraControl/Eliminada";
import EnDesuso from "../../../CentralNuclear/BarrasDeControl/EstadosBarraControl/EnDesuso";
import Insertada from "../../../CentralNuclear/BarrasDeControl/EstadosBarraControl/Insertada";
import BarraControlCadmio from "../../../CentralNuclear/BarrasDeControl/BarraControlCadmio";

describe("Test de Barra de Control: expiracion", () => {
  let barraControl: BarraControl;

  beforeEach(() => {
    barraControl = new BarraControlCadmio(new EnDesuso());
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
    expect(barraControl.estado).toBeInstanceOf(Insertada);

    jest.advanceTimersByTime(100);
    estaActiva = barraControl.estaActivo();
    expect(estaActiva).toBeFalsy();
    expect(barraControl.estado).toBeInstanceOf(Eliminada);
  });

  it("Verifica que la barra mantenga el tiempo restante adecuado despues de cambiar de estado", () => {
    jest.useFakeTimers();

    barraControl.cambiarEstado(new Insertada());

    let estaActiva = barraControl.estaActivo();
    expect(estaActiva).toBeTruthy();

    jest.advanceTimersByTime(100);
    expect(barraControl.estado).toBeInstanceOf(Insertada);

    barraControl.desactivar();
    expect(barraControl.estado).toBeInstanceOf(EnDesuso);

    estaActiva = barraControl.estaActivo();
    expect(estaActiva).toBeFalsy();

    jest.advanceTimersByTime(50); // Estos 50ms no cuentan, transcurren con la barra retirada.

    barraControl.cambiarEstado(new Insertada());

    jest.advanceTimersByTime(50);
    expect(barraControl.estado).toBeInstanceOf(Insertada);

    jest.advanceTimersByTime(50);
    expect(barraControl.estado).toBeInstanceOf(Eliminada);
  });
});
