import BarraControl from "../BarraControl.ts";
import { EstadoBarraDeControl } from "../EstadoBarraDeControl";

describe("Test de Barra de Control", () => {
  let instance: BarraControl;

  beforeEach(() => {
    instance = new BarraControl("Uranio", 200, EstadoBarraDeControl.EN_DESUSO);
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
