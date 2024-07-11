import Reactor from "../../central_nuclear/reactor/reactor";

export default class modEmergencIA {
  private static _instancia: modEmergencIA;

  public static get instancia(): modEmergencIA {
    if (!modEmergencIA._instancia) {
      modEmergencIA._instancia = new modEmergencIA();
    }
    return modEmergencIA._instancia;
  }

  public AZ5(reactor: Reactor): void {
    console.log("ME LLAMARON");
    const administradorBarras = reactor.getAdministradorBarras();

    administradorBarras.reemplazarBarrasVencidas();
    administradorBarras.cargarBarras(100);
    administradorBarras.insertarBarras(0);
  }
}
