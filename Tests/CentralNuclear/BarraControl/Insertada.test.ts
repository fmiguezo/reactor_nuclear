import BarraControl from "../../../CentralNuclear/BarrasDeControl/BarraControl";
import EstadoBarraControl from "../../../CentralNuclear/BarrasDeControl/EstadosBarraControl/EstadoBarraControl";
import Insertada from "../../../CentralNuclear/BarrasDeControl/EstadosBarraControl/Insertada";
import BarraControlCadmio from "../../../CentralNuclear/BarrasDeControl/BarraControlCadmio";

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
    rodInstance.activar();
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
