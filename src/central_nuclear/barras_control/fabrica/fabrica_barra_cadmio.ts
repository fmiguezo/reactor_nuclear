import BarraControl from "../barra_control";
import BarraControlCadmio from "../barra_control_cadmio";
import FabricaBarra from "./fabrica_barra";

export default class FabricaBarraCadmio extends FabricaBarra {
  override crearBarra(): BarraControl {
    return new BarraControlCadmio();
  }
}
