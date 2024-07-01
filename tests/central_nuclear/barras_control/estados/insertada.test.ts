import BarraControl from "../../../../src/central_nuclear/barras_control/barra_control";
import EstadoBarraControl from "../../../../src/central_nuclear/barras_control/estados/estado_barra_control";
import Insertada from "../../../../src/central_nuclear/barras_control/estados/insertada";
import BarraControlCadmio from "../../../../src/central_nuclear/barras_control/barra_control_cadmio";

describe("Test de Estado Barra de Control: Insertada", () => {
  let rodInstance: BarraControl;
  let stateInstance: EstadoBarraControl;

  beforeEach(() => {
    stateInstance = new Insertada();
    rodInstance = new BarraControlCadmio(200, stateInstance);
  });

  it("Verifica que esté activo", () => {
    let estado: boolean = stateInstance.estaActivo();
    expect(estado).toBe(true);
  });

  it("Verifica que siga activa", () => {
    let estado: boolean = rodInstance.estaActivo();
    expect(estado).toBe(true);
  });

  it("Verifica que pueda activarse y desactivarse", () => {
    let estado: boolean = rodInstance.estaActivo();
    expect(estado).toBe(true);

    rodInstance.desactivar();
    estado = rodInstance.estaActivo();
    expect(estado).toBe(false);

    rodInstance.activar();
    estado = rodInstance.estaActivo();
    expect(estado).toBe(true);
  });
});
