import AlertaEstandar from "../AlertaEstandar";

describe("Test de la clase AlertaEstandar", () => {

    let instance: AlertaEstandar;
    let tipo: TipoAlerta = TipoAlerta.ESTANDAR;

    beforeEach(() => {
        instance = new AlertaEstandar();
    })

    it("Verifica que la instancia sea de AlertaEstandar", () => {
        expect(instance).toBeInstanceOf(AlertaEstandar);
    });

    it("Verifica que la propiedad tipoAlerta sea Estandar", () => {
        expect(instance.obtenerTipoDeAlerta()).toBe(tipo);
    });

    it("Verifica que el mensaje de alerta sea el correcto", () => {
        expect(instance.obtenerMensajeDeAlerta()).toBe("ALERTA ESTANDAR, SE ACTIVARAN MECANISMOS DE ENFRIAMIENTO");
    });

    it("Verifica que la propiedad date sea una instancia de Date", () => {
        expect(instance.obtenerTimestampDeAlerta()).toBeInstanceOf(Date);
    });

})