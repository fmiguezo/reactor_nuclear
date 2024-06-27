import BarraControl from "../../../CentralNuclear/BarrasDeControl/BarraControl";
import EstadoBarraControl from "../../../CentralNuclear/BarrasDeControl/EstadosBarraControl/EstadoBarraControl";
import Eliminada from "../../../CentralNuclear/BarrasDeControl/EstadosBarraControl/Eliminada";

describe("Test de Estado Barra de Control: Eliminada", () => {
  let rodInstance: BarraControl;
  let stateInstance: EstadoBarraControl;

  beforeEach(() => {
    stateInstance = new Eliminada();
    rodInstance = new BarraControl("Cesio", 200, stateInstance);
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
