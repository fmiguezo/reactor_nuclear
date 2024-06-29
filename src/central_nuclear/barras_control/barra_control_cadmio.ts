import EstadoBarraControl from "./estados/estado_barra_control";
import EnDesuso from "./estados/en_desuso";
import BarraControl from "./barra_control";

export default class BarraControlCadmio extends BarraControl {
  constructor(tiempoVidaUtilTotal: number = VIDA_UTIL_BARRA, estado: EstadoBarraControl = new EnDesuso()) {
    super(tiempoVidaUtilTotal, estado);
  }
}
