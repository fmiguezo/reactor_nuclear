import IMecanismoDeControl from "../Interfaces/IMecanismoDeControl";
import EstadoBarraControl from "./EstadosBarraControl/EstadoBarraControl";
import EnDesuso from "./EstadosBarraControl/EnDesuso";
import BarraControl from "./BarraControl";

export default class BarraControlCadmio
  extends BarraControl
  implements IMecanismoDeControl
{
  constructor(
    tiempoVidaUtilTotal: number = 3600,
    estado: EstadoBarraControl = new EnDesuso()
  ) {
    super();
  }
}
