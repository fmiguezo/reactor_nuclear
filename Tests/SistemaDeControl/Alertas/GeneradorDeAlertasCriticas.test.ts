import AlertaCritica from "../AlertaCritica";
import GeneradorDeAlertasCriticas from "../GeneradorDeAlertasCriticas";

describe("Test de la clase GeneradorDeAlertasCriticas", () => {

    let instance: GeneradorDeAlertasCriticas;

    beforeEach(() => {
        instance = new GeneradorDeAlertasCriticas();
    })

    it("Verifica que la instancia sea de GeneradorDeAlertasCriticas", () => {
        expect(instance).toBeInstanceOf(GeneradorDeAlertasCriticas);
    });

    it("Verifica que el objeto retornado sea de tipo AlertaCritica", () => {
        expect(instance.generarAlerta()).toBeInstanceOf(AlertaCritica);
    });

})