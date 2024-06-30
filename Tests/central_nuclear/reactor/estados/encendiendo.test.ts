import Reactor from "../../../../src/central_nuclear/reactor/reactor";
import { Constantes } from "../../../../src/central_nuclear/reactor/constantes";
import RApagado from "../../../../src/central_nuclear/reactor/estados_reactor/apagado";
import REncenciendo from "../../../../src/central_nuclear/reactor/estados_reactor/encendiendo";
import RNormal from "../../../../src/central_nuclear/reactor/estados_reactor/normal";
let instance: REncenciendo;
let instanceReactor: Reactor;

beforeEach(() => {
    instance = new REncenciendo(instanceReactor);
    instanceReactor = new Reactor();
    instanceReactor.setEstado(instance);
    instanceReactor.setTemperatura(0);
});

describe("Test del estado apagado", () => {
    
    it("verifica que la instancia sea de tipo RApagado", () => {
        expect(instance).toBeInstanceOf(REncenciendo);
    });

    it("Verifica que verificarEstado cambie al estado a normal", () => {
        instanceReactor.setTemperatura(300);
        instance.verificarEstado();
        expect(instanceReactor.getEstado()).toBeInstanceOf(RNormal);
    });

    it("Verifica que verificarEstado que continue en estado encendido", () => {
        instanceReactor.setTemperatura(350);
        instance.verificarEstado();
        expect(instanceReactor.getEstado()).toBeInstanceOf(REncenciendo);
    });

    it("Verifica que encender que tire el Error correcto", () => {
        expect(() => instance.encender()).toThrow(new Error(Constantes.MENSAJE_ENCENDIDO));
    });

    it("Verifica que apagar cambie de estado correctamente", () => {
        instance.apagar()
        expect(instanceReactor.getEstado()).toBeInstanceOf(RApagado);
    });

    it("Verifica que estaEncendido, tire true", () => {
        
        expect(instance.estaEncendido()).toBe(true);
    });

});