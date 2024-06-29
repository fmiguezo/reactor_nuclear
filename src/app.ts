import PlantaNuclear from "./planta_nuclear";
import Sistema from "./sistema_de_control/sistema";
import Reactor from "./central_nuclear/reactor/reactor";

const plantaNuclear: PlantaNuclear = new PlantaNuclear();
const reactor: Reactor[] = [];

reactor.push(new Reactor(plantaNuclear));

// Falta crear estas clases
const directorBuildReactor: DirectorReactor = new DirectorReactor();
const builderReactor: BuilderReactor = new BuilderReactor();

// El reactor construido se incorpora a la planta nuclear
plantaNuclear.agregarReactores(reactor);

// Instancia el Sistema
const sistema: Sistema = new Sistema(plantaNuclear);

plantaNuclear.cargarSistema(sistema);

// Cede el control a los comandos
sistema.init();
