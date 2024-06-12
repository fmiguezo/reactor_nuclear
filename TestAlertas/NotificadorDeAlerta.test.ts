import NotificadorDeAlerta from "../NotificadorDeAlerta";

describe("Test de la clase Locomotora", () => {

    let instance: NotificadorDeAlerta;

    beforeEach(() => {
        instance = new NotificadorDeAlerta();
    })

    it("Verifica que la instancia sea de NotificadorDeAlerta", () => {
        expect(instance).toBeInstanceOf(NotificadorDeAlerta);
    });

    

})