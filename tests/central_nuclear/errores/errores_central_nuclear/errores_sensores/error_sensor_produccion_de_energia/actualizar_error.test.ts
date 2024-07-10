import { Constantes } from "../../../../../../src/central_nuclear/sensores/constantes";
import ActualizarError from "../../../../../../src/errores/errores_central_nuclear/errores_sensores/error_sensor_produccion_energia/actualizar_error";

describe('ActualizarError', () => {
    it('debería crear una instancia de ActualizarError con el mensaje predeterminado', () => {
        const error = new ActualizarError();
        expect(error instanceof ActualizarError).toBeTruthy();
        expect(error.message).toBe(Constantes.MENSAJE_SENSOR_INACTIVO);
    });

    it('debería crear una instancia de ActualizarError con un mensaje personalizado', () => {
        const mensajePersonalizado = 'Error al actualizar el sensor';
        const error = new ActualizarError(mensajePersonalizado);
        expect(error instanceof ActualizarError).toBeTruthy();
        expect(error.message).toBe(mensajePersonalizado);
    });

    it('debería tener el nombre de "ActualizarError"', () => {
        const error = new ActualizarError();
        expect(error.name).toBe('ActualizarError');
    });
});