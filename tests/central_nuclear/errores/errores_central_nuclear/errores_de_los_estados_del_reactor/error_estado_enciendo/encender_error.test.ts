import EncenderError from "../../../../../../src/errores/errores_central_nuclear/errores_de_los_estados_del_reactor/error_estado_enciendo/encender_error";
import { Constantes } from "../../../../../../src/central_nuclear/reactor/constantes_reactor";

describe("EncenderError", () => {
  it("debería crear una instancia de EncenderError con el mensaje predeterminado", () => {
    const error = new EncenderError();
    expect(error instanceof EncenderError).toBeTruthy();
    expect(error.message).toBe(Constantes.MENSAJE_ENCENDIDO);
  });

  it("debería crear una instancia de EncenderError con un mensaje personalizado", () => {
    const mensajePersonalizado = "Error al intentar encender el reactor";
    const error = new EncenderError(mensajePersonalizado);
    expect(error instanceof EncenderError).toBeTruthy();
    expect(error.message).toBe(mensajePersonalizado);
  });

  it('debería tener el nombre de "EncenderError"', () => {
    const error = new EncenderError();
    expect(error.name).toBe("EncenderError");
  });
});
