import IMecanismoDeControl from "../Interfaces/IMecanismoDeControl";
import EstadoBarraControl from "./EstadosBarraControl/EstadoBarraControl";
import EnDesuso from "./EstadosBarraControl/EnDesuso";

export default class BarraControl implements IMecanismoDeControl {
  private _material: string;
  private _estado!: EstadoBarraControl;
  private _vidaUtilRestante: number;

  constructor(
    material: string,
    tiempoVidaUtilTotal: number = 200,
    estado: EstadoBarraControl = new EnDesuso()
  ) {
    this._material = material;
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
