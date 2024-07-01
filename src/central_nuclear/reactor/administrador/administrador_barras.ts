import Reactor from "../reactor";
import BarraControl from "../../barras_control/barra_control";
import FabricaBarra from "../../barras_control/fabrica/fabrica_barra";
import SelectorFabricaBarra from "../../barras_control/fabrica/selector_fabrica";
import { Constantes } from "../constantes";

export default class AdministradorBarras {
  private _reactor!: Reactor;

  // Setters

  public setReactor(r: Reactor) {
    this._reactor = r;
  }

  // Getters

  public getReactor(): Reactor {
    return this._reactor;
  }

  private retreiveColeccionBarras(): BarraControl[] {
    return this.getReactor().getBarrasDeControl();
  }

  public getBarrasInsertadas(): BarraControl[] {
    return this.getReactor()
      .getBarrasDeControl()
      .filter((b) => {
        b.estaActivo();
      });
  }

  public getBarrasEnDesuso(): BarraControl[] {
    return this.getReactor()
      .getBarrasDeControl()
      .filter((b) => {
        !b.estaActivo() && b.getVidaUtilRestante() > 0;
      });
  }

  public getBarrasVencidas(): BarraControl[] {
    return this.getReactor()
      .getBarrasDeControl()
      .filter((b) => {
        b.getVidaUtilRestante() === 0;
      });
  }

  private removerBarras(barras: BarraControl[]): void {
    const coleccionBarras: BarraControl[] = this.retreiveColeccionBarras();
    let nuevaColeccion: BarraControl[] = [];
    barras.forEach((b) => {
      this.getReactor().setBarrasDeControl(
        this.getReactor()
          .getBarrasDeControl()
          .filter((r) => r !== b)
      );
    });
    this.getReactor().setBarrasDeControl(nuevaColeccion);
  }

  private crearBarras(num: number, tipo: string): BarraControl[] {
    let barras = new Array<BarraControl>();
    for (let i = 0; i < num; i++) {
      const barra = this.crearBarra(tipo);
      if (barra != null) {
        barras.push(barra);
      }
    }
    return barras;
  }

  private agregarBarras(barras: BarraControl[]): void {
    let coleccionModificada: BarraControl[] = this.retreiveColeccionBarras();
    barras.forEach((b) => {
      this.getReactor().getBarrasDeControl().push(b);
    });

    this.getReactor().setBarrasDeControl(coleccionModificada);
  }

  private crearBarra(material: string): BarraControl | null {
    const selectorDeFabrica: SelectorFabricaBarra = SelectorFabricaBarra.getInstancia();
    try {
      let fabricaBarra: FabricaBarra;
      fabricaBarra = selectorDeFabrica.getFabrica(material);
      let barra = fabricaBarra.crearBarra();
      return barra;
    } catch (error) {
      console.log(error.message);
    }
    return null;
  }

  public cargarBarras(cantBarras: number, tipo: string): void {
    try {
      let nuevasBarras = this.crearBarras(cantBarras, tipo);
      nuevasBarras.forEach((b) => this._reactor.agregarBarra(b));
    } catch (error) {
      console.log(error.message);
    }
  }

  public subirBarras(cantidadInput: number = 0): void {
    const barrasRemovibles: BarraControl[] = this.getBarrasInsertadas();
    const numBarras: number = this._reactor.getBarrasDeControl().length;
    let cantidadASubir: number;
    let cantidadBarrasInsertadas: number = barrasRemovibles.length;

    if (cantidadBarrasInsertadas > 0) {
      if (cantidadInput > 0) {
        cantidadASubir = cantidadInput;
      } else {
        cantidadASubir = numBarras;
      }

      for (let i = 0; i < cantidadASubir; i++) {
        barrasRemovibles[i].desactivar();
      }
    } else {
      throw new Error("No hay barras insertadas.");
    }
  }

  public insertarBarras(cantidadInput: number = 0): void {
    if (this._reactor.puedeInsertarBarras()) {
      const barrasActivables: BarraControl[] = this.getBarrasEnDesuso();
      const numBarras: number = this._reactor.getBarrasDeControl().length;
      let cantidadAInsertar: number;

      if (cantidadInput > 0) {
        cantidadAInsertar = cantidadInput;
      } else {
        cantidadAInsertar = numBarras;
      }

      for (let i = 0; i < cantidadAInsertar; i++) {
        barrasActivables[i].activar();
      }
    } else {
      throw new Error(Constantes.NO_PUEDE_INSERTAR_BARRA);
    }
  }

  public reemplazarBarrasVencidas(material: string = "cadmio") {
    const barrasVencidas: BarraControl[] = this.getBarrasVencidas();
    const cantBarrasReemplazar: number = barrasVencidas.length;
    let nuevasBarras: BarraControl[] = [];

    for (let i = 0; i < cantBarrasReemplazar; i++) {
      const nuevaBarra: BarraControl | null = this.crearBarra(material);
      if (nuevaBarra) {
        nuevasBarras.push(nuevaBarra);
      } else {
        console.log(`No se pudo crear una nueva barra de tipo: ${material}`);
      }
    }

    this.removerBarras(barrasVencidas);

    this.agregarBarras(nuevasBarras);
  }
}
