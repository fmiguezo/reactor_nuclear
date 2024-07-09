import ApagarError from "../../../../../../src/errores/errores_central_nuclear/errores_de_los_estados_del_reactor/error_estado_apagado/apagar_error"
import { Constantes } from "../../../../../../src/central_nuclear/reactor/constantes";

describe('ApagarError', () => {
    it('debería crear una instancia de ApagarError con el mensaje predeterminado', () => {
        const error = new ApagarError();
        expect(error instanceof ApagarError).toBeTruthy();
        expect(error.message).toBe(Constantes.MENSAJE_APAGADO);
    });

    it('debería crear una instancia de ApagarError con un mensaje personalizado', () => {
        const mensajePersonalizado = 'No se puede apagar el reactor en este estado';
        const error = new ApagarError(mensajePersonalizado);
        expect(error instanceof ApagarError).toBeTruthy();
        expect(error.message).toBe(mensajePersonalizado);
    });

    it('debería tener el nombre de "ApagarError"', () => {
        const error = new ApagarError();
        expect(error.name).toBe('ApagarError');
    });
});