import VerificarEstadoError from "../../../../../../src/errores/errores_central_nuclear/errores_de_los_estados_del_reactor/error_estado_chernobyl/verificar_estado_error";
import { Constantes } from "../../../../../../src/central_nuclear/reactor/constantes_reactor";

describe("VerificarEstadoError", () => {
  it("debería crear una instancia de VerificarEstadoError con el mensaje predeterminado", () => {
    const error = new VerificarEstadoError();
    expect(error instanceof VerificarEstadoError).toBeTruthy();
    expect(error.message).toBe(Constantes.MENSAJE_ESTADO_CHERNOBYL_EXPLOTO);
  });

  it("debería crear una instancia de VerificarEstadoError con un mensaje personalizado", () => {
    const mensajePersonalizado = "Error al verificar el estado del reactor";
    const error = new VerificarEstadoError(mensajePersonalizado);
    expect(error instanceof VerificarEstadoError).toBeTruthy();
    expect(error.message).toBe(mensajePersonalizado);
  });

  it('debería tener el nombre de "VerificarEstadoError"', () => {
    const error = new VerificarEstadoError();
    expect(error.name).toBe("VerificarEstadoError");
  });
});
