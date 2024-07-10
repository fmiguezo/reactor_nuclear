import { Constantes } from "../../../../../src/central_nuclear/reactor/constantes";
import RemplazarBarrasBencidasError from "../../../../../src/errores/errores_central_nuclear/errores_del_administrador_de_barras/remplazar_barras_vencidas_error";

describe("Test de RemplazarBarrasBencidasError", () => {
    it("Verifica que se cree correctamente con el mensaje predeterminado", () => {
        const error = new RemplazarBarrasBencidasError();
        expect(error.message).toBe(Constantes.NO_PUDE_REMPLAZAR_BARRA);
        expect(error.name).toBe("RemplazarBarrasBencidasError");
    });

    it("Verifica que se pueda crear con un mensaje personalizado", () => {
        const mensajePersonalizado = "Mensaje de error personalizado";
        const error = new RemplazarBarrasBencidasError(mensajePersonalizado);
        expect(error.message).toBe(mensajePersonalizado);
        expect(error.name).toBe("RemplazarBarrasBencidasError");
    });

    it('debería tener el nombre de "RemplazarBarrasBencidasError"', () => {
        const error = new RemplazarBarrasBencidasError();
        expect(error.name).toBe('RemplazarBarrasBencidasError');
    });
});