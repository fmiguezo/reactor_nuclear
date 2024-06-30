import RegistroBarrasUsadas from "../../../../src/sistema_de_control/registros/registro_barras_usadas";



describe("Test de la clase AlertaCritica", () => {

    beforeEach(() => {

    });

    it("Verifica que al tener dos instancias de RegistroBarrasUsadas, sean la misma", () => {
        const instance1 = RegistroBarrasUsadas.instancia;
        const instance2 = RegistroBarrasUsadas.instancia;

        expect(instance1).toBe(instance2);
    });

    it("Verifica que deberia crear una instancia si no fue creada con anterioridad", () => {
        expect(RegistroBarrasUsadas.instancia).toBeNull();

        const instance = RegistroBarrasUsadas.instancia;

        expect(instance).not.toBeNull();
        expect(RegistroBarrasUsadas.instancia).toBe(instance);
    });


});