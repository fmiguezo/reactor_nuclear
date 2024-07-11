import BarraControl from "../barra_control";
import BarraControlCadmio from "../barra_control_cadmio";
import EnDesuso from "../estados/en_desuso";
import EstadoBarraControl from "../estados/estado_barra_control";
import FabricaBarra from "./fabrica_barra";

export default class FabricaBarraCadmio extends FabricaBarra {
  override crearBarra(): BarraControl {
    const nuevoEstado: EstadoBarraControl = new EnDesuso();
    const nuevaBarra: BarraControl = new BarraControlCadmio(
      120000,
      nuevoEstado
    );
    nuevoEstado.setBarraControl(nuevaBarra);
    nuevaBarra.cambiarEstado(nuevoEstado);
    return nuevaBarra;
  }
}
