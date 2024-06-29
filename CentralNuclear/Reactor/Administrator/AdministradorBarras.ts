import Reactor from "../Reactor";
import BarraControl from "../../BarrasDeControl/BarraControl";

export default class AdministradorBarras {
  private _reactor!: Reactor;

  // Setters

  public set reactor(r: Reactor) {
    this._reactor = r;
  }

  // Getters

  public getBarrasInsertadas(): BarraControl[] {
    return this.reactor.barrasDeControl.filter((b) => {
      b.estaActivo() == true;
    });
  }

  public getBarrasVencidas(): BarraControl[] {
    return this.reactor.barrasDeControl.filter((b) => {
      b.VidaUtilRestante == 0;
    });
  }

  // Otros metodos

  public removerBarras(barras: BarraControl[]): void {
    barras.forEach((b) => {
      this.reactor.barrasDeControl = this.reactor.barrasDeControl.filter(
        (r) => r !== b
      );
    });
  }

  public agregarBarras(barras: BarraControl[]): void {
    barras.forEach((b) => {
      this.reactor.barrasDeControl.push(b);
    });
  }
}
