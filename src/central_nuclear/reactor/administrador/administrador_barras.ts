import Reactor from "../reactor";
import BarraControl from "../../barras_control/barra_control";
import FabricaBarra from "../../barras_control/fabrica/fabrica_barra";
import SelectorFabricaBarra from "../../barras_control/fabrica/selector_fabrica";

export default class AdministradorBarras {
  private _reactor!: Reactor;

  // Setters

  public set reactor(r: Reactor) {
    this._reactor = r;
  }

  // Getters

  private retreiveColeccionBarras(): BarraControl[] {
    return this.reactor.getBarrasDeControl();
  }

  public getBarrasInsertadas(): BarraControl[] {
    return this.reactor.getBarrasDeControl().filter((b) => {
      b.estaActivo();
    });
  }

  public getBarrasEnDesuso(): BarraControl[] {
    return this.reactor.getBarrasDeControl().filter((b) => {
      !b.estaActivo() && b.getVidaUtilRestante() > 0;
    });
  }

  public getBarrasVencidas(): BarraControl[] {
    return this.reactor.getBarrasDeControl().filter((b) => {
      b.getVidaUtilRestante() === 0;
    });
  }

  public removerBarras(barras: BarraControl[]): void {
    const coleccionBarras: BarraControl[] = this.retreiveColeccionBarras();
    let nuevaColeccion: BarraControl[] = [];
    barras.forEach((b) => {
      this.reactor.setBarrasDeControl(
        this.reactor.getBarrasDeControl().filter((r) => r !== b)
      );
    });
    this.reactor.setBarrasDeControl(nuevaColeccion);
  }

  private agregarBarras(barras: BarraControl[]): void {
    let coleccionModificada: BarraControl[] = this.retreiveColeccionBarras();
    barras.forEach((b) => {
      this.reactor.getBarrasDeControl().push(b);
    });

    this.reactor.setBarrasDeControl(coleccionModificada);
  }

  private crearBarra(material: string): BarraControl | null {
    const selectorDeFabrica: SelectorFabricaBarra =
      SelectorFabricaBarra.getInstancia();

    let fabricaBarra: FabricaBarra | null = null;

    try {
      fabricaBarra = selectorDeFabrica.getFabrica(material);
    } catch (error) {
      error.message;
    }
    return fabricaBarra ? fabricaBarra.crearBarra() : null;
  }

  public cargarBarras(cantBarras: number): void {
    for (let i = 0; i < cantBarras; i++) {
      let nuevasBarras: BarraControl[] = [];
      let nuevaBarra = this.crearBarra("cadmio");
      if (nuevaBarra !== null) {
        nuevasBarras.push(nuevaBarra);
        this.agregarBarras(nuevasBarras);
      }
    }
  }

  public subirBarras(cantidadInput: number = 0): void {
    const barrasRemovibles: BarraControl[] = this.getBarrasInsertadas();
    const numBarras: number = this._reactor.getBarrasDeControl().length;
    let cantidadASubir: number;

    if (cantidadInput > 0) {
      cantidadASubir = cantidadInput;
    } else {
      cantidadASubir = numBarras;
    }

    for (let i = 0; i < cantidadASubir; i++) {
      barrasRemovibles[i].desactivar();
    }
  }

  public insertarBarras(cantidadInput: number = 0): void {
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
