import EstadoReactor from "./central_nuclear/reactor/estados_reactor/estadoreactor";
import Reactor from "./central_nuclear/reactor/reactor";

export default class ComprobadorSaludReactor {
  private estaEncendido(reactor: Reactor): boolean {
    return reactor.estaEncendido();
  }

  private tieneTemperaturaSegura(reactor: Reactor): boolean {
    if (reactor.getTemperatura() > 280 && reactor.getTemperatura() < 330) {
      return true;
    } else {
      return false;
    }
  }
  // Esta puesto de modo temporal, Agregar el metodo produccion de energia que va
  private produceEnergiaEnRango(reactor: Reactor): boolean {
    if (reactor.obtenerEnergiaNeta() > 280 && reactor.getTemperatura() < 330) {
      return true;
    } else {
      return false;
    }
  }
}
