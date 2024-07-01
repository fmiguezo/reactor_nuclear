import Command from "../../src/sistema_de_control/comandos/command";
import Reactor from "../../src/central_nuclear/reactor/reactor";
import SacarBarrasDeControl from "../../src/sistema_de_control/comandos/sacar_barra_control";
import BarraControl from "../../src/central_nuclear/barras_control/barra_control";


describe("Test del comando sacar barras de control del reactor", () => {
    
    let reactor: Reactor;
    let sacarBarras : SacarBarrasDeControl;

    beforeEach(() => {
      reactor = new Reactor();
      sacarBarras = new SacarBarrasDeControl();
    });


    it("Se verifica primero que haya barras activadas", () => {
      let barrasActivas : number = reactor.getAdministradorBarras().getBarrasInsertadas().length;
      expect(barrasActivas).toBeGreatherThan(0);
    });
  
    it("Deberia verificar que haya sacado desactivado las barras de control", () => {
        sacarBarras.ejecutar(reactor);
        let barrasActivas : number = reactor.getAdministradorBarras().getBarrasInsertadas().length;
        expect(barrasActivas).toBeEquals(0);
    });
  });