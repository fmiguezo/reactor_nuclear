import Reactor from "../../../../src/central_nuclear/reactor/reactor";
import RApagado from "../../../../src/central_nuclear/reactor/estados_reactor/apagado";
import REncenciendo from "../../../../src/central_nuclear/reactor/estados_reactor/encendiendo";
import { Constantes } from "../../../../src/central_nuclear/reactor/constantes";
import Alerta from "../../../../src/sistema_de_control/alertas/alerta";
let instance: RApagado;
let instanceReactor: Reactor;
beforeEach(() => {
    instance = new RApagado(instanceReactor);
    instanceReactor = new Reactor();
    instanceReactor.setEstado(instance);
    instanceReactor.setTemperatura(100);
});

describe("Test del estado apagado", () => {
    
    it("verifica que la instancia sea de tipo RApagado", () => {
        expect(instance).toBeInstanceOf(RApagado);
    });

    it("Verifica que calcularEnergia de el valor esperado", () => {
        expect(instance.calcularEnergia()).toBe(0);
    });
    
    it("Verifica que verificarEstado funcione, si la temperatura del reactor es mayor a 0, lo encienda", () => {
        instanceReactor.setTemperatura(100);
        instance.verificarEstado();
        expect(instanceReactor.estaEncendido()).toBe(true);
    });

    it("Verifica que verificarEstado, si la temperatura del reactor es igual a 0, se mantenga apagado", () => {
        instanceReactor.setTemperatura(0);
        instance.verificarEstado();
        expect(instanceReactor.estaEncendido()).toBe(false);
    });

    it("Verifica que encender al encenderse se cambie el estado correctamente", () => {
        instance.encender();
        expect(instanceReactor.getEstado()).toBeInstanceOf(REncenciendo);
      });

    it("Verifica que apagar siempre tire el mensaje de error correspondiente", () => {
        expect(() => instance.apagar()).toThrow(new Error(Constantes.MENSAJE_APAGADO));
    });

    it("Verifica que esta encendido devuelva siempre false", () => {
        expect(instance.estaEncendido()).toBe(false);
    });

    it("Verifica que al realizar el incremento de temperatura, no se modifique la misma", () => {
        let valorTemperatura = instanceReactor.getTemperatura();
        instance.incrementarTemperatura();
        expect(valorTemperatura).toBe(instanceReactor.getTemperatura());
    });

    it("Verifica que generar alerta genere la alerta esperada", () => {
        expect(instance.generarAlerta()).toBeInstanceOf(Alerta);
    });

    it("Verifica que to string devuelva el mensaje esperado", () => {
        expect(instance.toString()).toBe(Constantes.MENSAJE_ESTADO_APAGADO);
    });
});
