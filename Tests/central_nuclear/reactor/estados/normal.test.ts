import Reactor from "../../../../src/central_nuclear/reactor/reactor";
import { Constantes } from "../../../../src/central_nuclear/reactor/constantes";
import RApagado from "../../../../src/central_nuclear/reactor/estados_reactor/apagado";
import REncenciendo from "../../../../src/central_nuclear/reactor/estados_reactor/encendiendo";
import RNormal from "../../../../src/central_nuclear/reactor/estados_reactor/normal";
import RCritico from "../../../../src/central_nuclear/reactor/estados_reactor/critico";
import Energia from "../../../../src/central_nuclear/reactor/reaccion/energia";
import RegistroEnergiaGenerada from "../../../../src/sistema_de_control/registros/registro_energia_generada";
let instance: RNormal;
let instanceReactor: Reactor;

beforeEach(() => {
    instance = new RNormal(instanceReactor);
    instanceReactor = new Reactor();
    instanceReactor.setEstado(instance);
    instanceReactor.setTemperatura(0);
});

describe("Test del estado apagado", () => {
    
    it("verifica que la instancia sea de tipo normal", () => {
        expect(instance).toBeInstanceOf(RNormal);
    });

    it("Verifica que calcularEnergia sea 0", () => {
        expect(instance.calcularEnergia()).toBeInstanceOf(0);
    });

    it("Verifica que verificarEstado que estado pase a apagado", () => {
        instanceReactor.setTemperatura(270);
        instance.verificarEstado();
        expect(instanceReactor.getEstado()).toBeInstanceOf(RApagado);
    });

    it("Verifica que verificarEstado que estado pase a apagado", () => {
        instanceReactor.setTemperatura(350);
        instance.verificarEstado();
        expect(instanceReactor.getEstado()).toBeInstanceOf(RCritico);
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

    //Hay que revisarlo y los que anote en el pr, por que no se como probar esa logica.
    it("Verifica que liberarEnergia devuelva lo esperado", () => {
        Energia.calcularEnergiaNeta(Energia.calcularEnergiaTermal(280));
        RegistroEnergiaGenerada.instancia.insertarRegistro(instanceReactor.obtenerEnergiaNeta());
        expect(instanceReactor.obtenerEnergiaNeta()).toBe(100);
    });

    it("Verifica que to string devuelva el mensaje esperado", () => {
        expect(instance.toString()).toBeInstanceOf(Constantes.MENSAJE_ESTADO_NORMAL);
    });

});