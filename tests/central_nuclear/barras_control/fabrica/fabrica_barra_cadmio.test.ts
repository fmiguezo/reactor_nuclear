import FabricaBarraCadmio from "../../../../src/central_nuclear/barras_control/fabrica/fabrica_barra_cadmio";
import BarraControlCadmio from "../../../../src/central_nuclear/barras_control/barra_control_cadmio";

describe("Test para la fabrica de la barra de cadmio", ()=>{
    let instanciaFabrica: FabricaBarraCadmio;

    beforeEach(()=>{
        instanciaFabrica = new FabricaBarraCadmio();
    })

    it("Deberia retornar una barra de control de cadmio",()=> {
       let barraControlCadmio: BarraControlCadmio;
       barraControlCadmio = instanciaFabrica.crearBarra() 
       expect(barraControlCadmio).toBeInstanceOf(BarraControlCadmio);
    });
})