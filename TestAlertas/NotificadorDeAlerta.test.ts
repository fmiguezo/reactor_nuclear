import AlertaEstandar from "../AlertaEstandar";
import NotificadorDeAlerta from "../NotificadorDeAlerta";

describe("Test de la clase NotificadorDeAlerta", () => {

    let instance: NotificadorDeAlerta;
    let alertaEstandar: AlertaEstandar;

    beforeEach(() => {
        instance = new NotificadorDeAlerta();
        alertaEstandar = new AlertaEstandar();
        alertaEstandar.date = new Date("2024-06-08T12:00:00");
        alertaEstandar.tipoAlerta = TipoAlerta.ESTANDAR;
    })

    it("Verifica que la instancia sea de NotificadorDeAlerta", () => {
        expect(instance).toBeInstanceOf(NotificadorDeAlerta);
    });

    it("Verifica que la notificación se realice de forma correcta", () => {
        expect(instance.notificarAlerta(alertaEstandar)).toBe(`Mensaje: ${alertaEstandar.obtenerMensajeDeAlerta()} 
        \nTipo de alerta: ${alertaEstandar.obtenerTipoDeAlerta()} 
        \nFecha: ${alertaEstandar.obtenerTimestampDeAlerta()}`);
    });

})