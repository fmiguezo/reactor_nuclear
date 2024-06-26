import IMecanismoDeControl from "../Interfaces/IMecanismoDeControl";
import EstadoBarraControl from "./EstadosBarraControl/EstadoBarraControl";
import EnDesuso from "./EstadosBarraControl/EnDesuso";

export default class BarraControl implements IMecanismoDeControl {
  private _material: string;
  private _estado: EstadoBarraControl;
  private _tiempoVidaUtilTotal: number;

  constructor(
    material: string,
    tiempoVidaUtilTotal: number = 200,
    estado: EstadoBarraControl = new EnDesuso()
  ) {
    this._material = material;
    this._tiempoVidaUtilTotal = tiempoVidaUtilTotal;
    this._estado = estado;
  }

  // Getters
  estaActivo(): boolean {
    return this._estado.estaActivo();
  }

  getPctBarra(): number {
    return this.calcPctBarra();
  }

  // Métodos de control de estado
  public cambiarEstado(state: EstadoBarraControl): void {
    console.log("Cambiando estado");
    this._estado = state;
    this._estado.setBarraControl(this);
  }

  // Otros Metodos

  activar(): void {
    this._estado.activar();
  }
  desactivar(): void {
    this._estado.desactivar();
  }

  private calcPctBarra(): number {
    return (this._tiempoVidaUtilTotal / 3600) * 100;
  }
}
