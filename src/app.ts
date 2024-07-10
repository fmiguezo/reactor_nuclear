import PlantaNuclear from "./planta_nuclear";
import Sistema from "./sistema_de_control/sistema";
import DirectorBuildReactor from "./central_nuclear/reactor/builder/director_build_reactor";
import IBuilder from "./central_nuclear/reactor/builder/ibuilder";
import BuilderReactorNormal from "./central_nuclear/reactor/builder/builder_reactor_normal";

const plantaNuclear: PlantaNuclear = new PlantaNuclear();

const builderReactor: IBuilder = new BuilderReactorNormal();
const directorBuildReactor: DirectorBuildReactor = new DirectorBuildReactor(
  builderReactor
);

directorBuildReactor.cargarPlantaNuclear(plantaNuclear);

const nuevoReactor = directorBuildReactor.buildReactorNormal();

// El reactor construido se incorpora a el mapa de reactores de la planta nuclear
plantaNuclear.agregarReactores(nuevoReactor);

// Instancia el Sistema
const sistema: Sistema = new Sistema(plantaNuclear);

plantaNuclear.cargarSistema(sistema);

// Cede el control a los comandos
sistema.init();

//  TESTING

nuevoReactor.encender();
