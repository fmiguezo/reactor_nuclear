import EstadoReactor from "../../src/central_nuclear/reactor/estados_reactor/estadoreactor";
import Reactor from "../../src/central_nuclear/reactor/reactor";
import PlantaNuclear from "../../src/planta_nuclear";
import Alerta from "../../src/sistema_de_control/alertas/alerta";
import AlertaEstandar from "../../src/sistema_de_control/alertas/alerta_estandar";
import Cli from "../../src/sistema_de_control/cli/cli";
import Sistema from "../../src/sistema_de_control/sistema";


describe('Sistema', () => {
    let sistema: Sistema;
    let planta: PlantaNuclear;

    beforeEach(() => {
        planta = new PlantaNuclear();
        sistema = new Sistema(planta);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('debería inicializar una nueva sesión CLI', () => {
        const cliSpy = jest.spyOn(Cli.prototype, 'nuevaSesion');

        sistema.init();

        expect(cliSpy).toHaveBeenCalledWith(sistema);
    });
});