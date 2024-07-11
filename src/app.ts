import PlantaNuclear from "./planta_nuclear";
import Sistema from "./sistema_de_control/sistema";
import DirectorBuildReactor from "./central_nuclear/reactor/builder/director_build_reactor";
import IBuilder from "./central_nuclear/reactor/builder/ibuilder";
import BuilderReactorNormal from "./central_nuclear/reactor/builder/builder_reactor_normal";
import RApagado from "./central_nuclear/reactor/estados_reactor/apagado";
import Chernobyl from "./central_nuclear/reactor/estados_reactor/chernobyl";
import modEmergencIA from "./sistema_de_control/emergencIA/modEmergencIA";
import REmergencia from "./central_nuclear/reactor/estados_reactor/emergencia";

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

// //  TESTING

// nuevoReactor.encender();

// // console.log(nuevoReactor.getTemperatura());
// nuevoReactor.setTemperatura(370);
// nuevoReactor.getEstado().verificarEstado();
// nuevoReactor.getEstado().verificarEstado();
// nuevoReactor.getEstado().verificarEstado();

// // console.log(nuevoReactor.getAdministradorBarras().getBarrasTotales().length);
// // console.log(nuevoReactor.getAdministradorBarras().getBarrasEnDesuso().length);

// nuevoReactor.getAdministradorBarras().insertarBarras(10);

// console.log(
//   `INSERTADAS: ${
//     nuevoReactor.getAdministradorBarras().getBarrasInsertadas().length
//   }`
// );

// console.log(nuevoReactor.getTemperatura());
// setTimeout(() => {
//   console.log(nuevoReactor.getTemperatura());
// }, 10000);

// // TESTING 2
// console.log(nuevoReactor.encender());
// console.log(nuevoReactor.getTemperatura());
// nuevoReactor.setTemperatura(470);
// nuevoReactor.cambiarEstado(new REmergencia(nuevoReactor));

// // console.log(nuevoReactor.getAdministradorBarras().getBarrasTotales().length);
// // console.log(nuevoReactor.getAdministradorBarras().getBarrasEnDesuso().length);

// console.log(nuevoReactor.getAdministradorBarras().getBarrasInsertadas().length);

// modEmergencIA.instancia.AZ5(nuevoReactor);
// console.log(nuevoReactor.getAdministradorBarras().getBarrasInsertadas().length);
// console.log(nuevoReactor.getTemperatura());
// setTimeout(() => {
//   console.log(nuevoReactor.getTemperatura());

//   if (nuevoReactor.getEstado() instanceof RApagado) {
//     console.log("Apagado");
//   } else if (nuevoReactor.getEstado() instanceof Chernobyl) {
//     console.log("EXPLOTO");
//   } else {
//     console.log("Ninguno");
//   }
// }, 100000);
