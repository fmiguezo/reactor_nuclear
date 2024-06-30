import Reactor from "../../../../src/central_nuclear/reactor/reactor";
import { Constantes } from "../../../../src/central_nuclear/reactor/constantes";
import REmergencia from "../../../../src/central_nuclear/reactor/estados_reactor/emergencia";
import RCritico from "../../../../src/central_nuclear/reactor/estados_reactor/critico";
import Chernobyl from "../../../../src/central_nuclear/reactor/estados_reactor/chernobyl";
import RApagado from "../../../../src/central_nuclear/reactor/estados_reactor/apagado";
import Alerta from "../../../../src/sistema_de_control/alertas/alerta";
let instance: REmergencia;
let instanceReactor: Reactor;

beforeEach(() => {
    instance = new REmergencia(instanceReactor);
    instanceReactor = new Reactor();
    instanceReactor.setEstado(instance);
    instanceReactor.setTemperatura(0);
});

describe("Test del estado apagado", () => {
    
    it("verifica que la instancia sea de tipo RApagado", () => {
        expect(instance).toBeInstanceOf(REmergencia);
    });

    it("Verifica que verificarEstado cambie al estado a critico", () => {
        instanceReactor.setTemperatura(390);
        instance.verificarEstado();
        expect(instanceReactor.getEstado()).toBeInstanceOf(RCritico);
    });

    it("Verifica que verificarEstado cambie al estado a critico", () => {
        instanceReactor.setTemperatura(420);
        instance.verificarEstado();
        expect(instanceReactor.getEstado()).toBeInstanceOf(Chernobyl);
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

    it("Verifica que generarAlerta, devuelva algo de tipo Alerta", () => {
        
        expect(instance.generarAlerta()).toBeInstanceOf(Alerta);
    });

});