import BarraControl from "../../../CentralNuclear/BarrasDeControl/BarraControl";
import EstadoBarraControl from "../../../CentralNuclear/BarrasDeControl/EstadosBarraControl/EstadoBarraControl";
import EnDesuso from "../../../CentralNuclear/BarrasDeControl/EstadosBarraControl/EnDesuso";
import Insertada from "../../../CentralNuclear/BarrasDeControl/EstadosBarraControl/Insertada";
import Eliminada from "../../../CentralNuclear/BarrasDeControl/EstadosBarraControl/Eliminada";

describe("Test de Barra de Control", () => {
  let instance: BarraControl;

  beforeEach(() => {
    let defaultState: EstadoBarraControl = new EnDesuso();
    instance = new BarraControl("Uranio", 200, defaultState);
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
