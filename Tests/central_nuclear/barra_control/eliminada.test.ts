import BarraControl from "../../../src/central_nuclear/barras_control/barra_control";
import EstadoBarraControl from "../../../src/central_nuclear/barras_control/estados/estado_barra_control";
import Eliminada from "../../../src/central_nuclear/barras_control/estados/eliminada";
import BarraControlCadmio from "../../../src/central_nuclear/barras_control/barra_control_cadmio";

describe("Test de Estado Barra de Control: Eliminada", () => {
  let rodInstance: BarraControl;
  let stateInstance: EstadoBarraControl;

  beforeEach(() => {
    stateInstance = new Eliminada();
    rodInstance = new BarraControlCadmio(200, stateInstance);
  });

  it("Verifica que NO esté activo", () => {
    let estado: boolean = stateInstance.estaActivo();
    expect(estado).toBe(false);
  });

  it("Verifica que NO pueda activarse", () => {
    rodInstance.activar();
    let estado: boolean = rodInstance.estaActivo();
    expect(estado).toBe(false);
  });

  it("Verifica que NO pueda activarse y desactivarse", () => {
    let estado: boolean = rodInstance.estaActivo();
    expect(estado).toBe(false);

    rodInstance.activar();
    estado = rodInstance.estaActivo();
    expect(estado).toBe(false);

    rodInstance.desactivar();
    estado = rodInstance.estaActivo();
    expect(estado).toBe(false);
  });
});
