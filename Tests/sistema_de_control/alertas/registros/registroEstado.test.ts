import EstadoReactor from "../../../../src/central_nuclear/reactor/estados_reactor/estadoreactor";
import RegistroEstados from "../../../../src/sistema_de_control/registros/registroEstados";
import Reactor from "../../../../src/central_nuclear/reactor/reactor";
import RCritico from "../../../../src/central_nuclear/reactor/estados_reactor/critico";
import RNormal from "../../../../src/central_nuclear/reactor/estados_reactor/normal";
import RApagado from "../../../../src/central_nuclear/reactor/estados_reactor/apagado";

describe('RegistroEstados', () => {
    let registro: RegistroEstados;
    let estado: EstadoReactor;
    let reactor: Reactor;

    beforeEach(() => {
        // Reiniciamos la instancia entre tests para asegurar que cada test es independiente
        (RegistroEstados as any)._instancia = null;
        registro = RegistroEstados.instancia;
        reactor = new Reactor();
        estado = new RApagado(reactor);
        reactor.setEstado(estado);
        
    });

    test('debería retornar la misma instancia', () => {
        const instancia1 = RegistroEstados.instancia;
        const instancia2 = RegistroEstados.instancia;
        expect(instancia1).toBe(instancia2);
    });

    test('debería aumentar el registro de un estado dado', () => {
        registro.aumentarRegistro(estado);
        expect(registro._contadorCambiosEstado.get(estado)).toBe(1);

        registro.aumentarRegistro(estado);
        expect(registro._contadorCambiosEstado.get(estado)).toBe(2);
    });

    test('debería manejar múltiples estados', () => {
        const estado1 = new RCritico(reactor);
        const estado2 = new RNormal(reactor);

        registro.aumentarRegistro(estado1);
        expect(registro._contadorCambiosEstado.get(estado1)).toBe(1);

        registro.aumentarRegistro(estado2);
        expect(registro._contadorCambiosEstado.get(estado2)).toBe(1);

        registro.aumentarRegistro(estado1);
        expect(registro._contadorCambiosEstado.get(estado1)).toBe(2);
    });
});
