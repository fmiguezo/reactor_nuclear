import Command from "../../src/sistema_de_control/comandos/command"
import Reactor from "../../src/central_nuclear/reactor/reactor";
import RCritico from "../../src/central_nuclear/reactor/estados_reactor/critico";
import ReportarEstado from "../../src/sistema_de_control/comandos/reportar_estado"


describe("Test del comando para reportar estado del reactor", () => {
    let reactor: Reactor;
    let reportarEstado: ReportarEstado;
    let MockCritico: RCritico;

  
    beforeEach(() => {
        reactor = new Reactor();
        reportarEstado = new ReportarEstado();
        MockCritico = new RCritico(reactor) as jest.mocked<RCritico>;
    });
    
    afterEach(() => {
        jest.clearAllMocks();
    });
    
  
    it("Verifica el estado", () => {
        let estado : String;
        estado = reactor.getEstado().toString();
        expect(reactor.getEstado()).toBeInstanceOf(RCritico);
        // Falta desarrollar verificacion
    });

    it("se testea que el mensaje sea el correcto", () => {
        // A REALIZAR
    });
  });