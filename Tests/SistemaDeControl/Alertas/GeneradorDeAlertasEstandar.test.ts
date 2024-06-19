import AlertaEstandar from "../AlertaEstandar";
import GeneradorDeAlertasEstandar from "../GeneradorDeAlertasEstandar";

describe("Test de la clase GeneradorDeAlertasEstandar", () => {

    let instance: GeneradorDeAlertasEstandar;

    beforeEach(() => {
        instance = new GeneradorDeAlertasEstandar();
    })

    it("Verifica que la instancia sea de GeneradorDeAlertasEstandar", () => {
        expect(instance).toBeInstanceOf(GeneradorDeAlertasEstandar);
    });

    it("Verifica que el objeto retornado sea de tipo AlertaEstandar", () => {
        expect(instance.generarAlerta()).toBeInstanceOf(AlertaEstandar);
    });

})