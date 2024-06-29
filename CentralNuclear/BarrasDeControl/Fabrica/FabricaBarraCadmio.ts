import BarraControl from "../BarraControl";
import BarraControlCadmio from "../BarraControlCadmio";
import FabricaBarra from "./FabricaBarra";

export default class FabricaBarraCadmio extends FabricaBarra {
  override crearBarra(): BarraControl {
    return new BarraControlCadmio();
  }
}
