import IMecanismoDeControl from "../Interfaces/IMecanismoDeControl";
import EstadoBarraControl from "./EstadosBarraControl/EstadoBarraControl";
import EnDesuso from "./EstadosBarraControl/EnDesuso";
export default abstract class BarraControl implements IMecanismoDeControl {
  protected _estado!: EstadoBarraControl;
  protected _vidaUtilRestante: number;

  constructor(
    tiempoVidaUtilTotal: number = 0,
    estado: EstadoBarraControl = new EnDesuso()
  ) {
    this._vidaUtilRestante = tiempoVidaUtilTotal;
    this.cambiarEstado(estado);
  }

  // Getters

  estaActivo(): boolean {
    return this._estado.estaActivo();
  }

  getPctBarra(): number {
    return this._estado.calcPctBarra();
  }

  public get estado(): EstadoBarraControl {
    return this._estado;
  }

  public get VidaUtilRestante(): number {
    return this._vidaUtilRestante;
  }

  // Setters
  public set VidaUtilRestante(valor: number) {
    this._vidaUtilRestante = valor;
  }

  // Métodos de control de estado
  public cambiarEstado(state: EstadoBarraControl): void {
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
}
