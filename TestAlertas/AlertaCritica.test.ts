import AlertaCritica from "../AlertaCritica";

describe("Test de la clase AlertaCritica", () => {

    let instance: AlertaCritica;
    let tipo: TipoAlerta = TipoAlerta.CRITICA;

    beforeEach(() => {
        instance = new AlertaCritica();
    })

    it("Verifica que la instancia sea de AlertaCritica", () => {
        expect(instance).toBeInstanceOf(AlertaCritica);
    });

    it("Verifica que la propiedad tipoAlerta sea CRITICA", () => {
        expect(instance.obtenerTipoDeAlerta()).toBe(tipo);
    });

    it("Verifica que el mensaje de alerta sea el correcto", () => {
        expect(instance.obtenerMensajeDeAlerta()).toBe("ALERTA CRITICA, EL REACTOR SE APAGARA");
    });

    it("Verifica que la propiedad date sea una instancia de Date", () => {
        expect(instance.obtenerTimestampDeAlerta()).toBeInstanceOf(Date);
    });

})