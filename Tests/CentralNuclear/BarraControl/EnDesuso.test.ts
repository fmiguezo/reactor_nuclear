import BarraControl from "../../../CentralNuclear/BarrasDeControl/BarraControl";
import EstadoBarraControl from "../../../CentralNuclear/BarrasDeControl/EstadosBarraControl/EstadoBarraControl";
import EnDesuso from "../../../CentralNuclear/BarrasDeControl/EstadosBarraControl/EnDesuso";

describe("Test de Estado Barra de Control: EnDesuso", () => {
  let rodInstance: BarraControl;
  let stateInstance: EstadoBarraControl;

  beforeEach(() => {
    stateInstance = new EnDesuso();
    rodInstance = new BarraControl("Uranio", 200, stateInstance);
  });

  it("Verifica que no esté activo", () => {
    let estado: boolean = stateInstance.estaActivo();
    expect(estado).toBe(false);
  });

  it("Verifica que pueda activarse", () => {
    rodInstance.activar();
    let estado: boolean = rodInstance.estaActivo();
    expect(estado).toBe(true);
  });

  it("Verifica que pueda activarse y desactivarse", () => {
    rodInstance.activar();
    rodInstance.desactivar();
    let estado: boolean = rodInstance.estaActivo();
    expect(estado).toBe(false);
  });
});
