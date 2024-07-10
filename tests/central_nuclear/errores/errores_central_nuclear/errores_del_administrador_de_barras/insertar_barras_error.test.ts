import { Constantes } from "../../../../../src/central_nuclear/reactor/constantes";
import InsertarBarrasError from "../../../../../src/errores/errores_central_nuclear/errores_del_administrador_de_barras/insertar_barras_error";


describe("Test de InsertarBarrasError", () => {
    it("Verifica que se cree correctamente con el mensaje predeterminado", () => {
        const error = new InsertarBarrasError();
        expect(error.message).toBe(Constantes.NO_PUEDE_INSERTAR_BARRA);
        expect(error.name).toBe("InsertarBarrasError");
    });

    it("Verifica que se pueda crear con un mensaje personalizado", () => {
        const mensajePersonalizado = "Mensaje de error personalizado";
        const error = new InsertarBarrasError(mensajePersonalizado);
        expect(error.message).toBe(mensajePersonalizado);
        expect(error.name).toBe("InsertarBarrasError");
    });

    it('debería tener el nombre de "RemplazarBarrasBencidasError"', () => {
        const error = new InsertarBarrasError();
        expect(error.name).toBe('InsertarBarrasError');
    });
});