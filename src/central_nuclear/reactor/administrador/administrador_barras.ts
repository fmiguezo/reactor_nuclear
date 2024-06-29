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

  public getBarrasInsertadas(): BarraControl[] {
    return this.reactor.barrasDeControl.filter((b) => {
      b.estaActivo();
    });
  }

  public getBarrasEnDesuso(): BarraControl[] {
    return this.reactor.barrasDeControl.filter((b) => {
      !b.estaActivo() && b.VidaUtilRestante > 0;
    });
  }

  public getBarrasVencidas(): BarraControl[] {
    return this.reactor.barrasDeControl.filter((b) => {
      b.VidaUtilRestante === 0;
    });
  }

  private removerBarras(barras: BarraControl[]): void {
    barras.forEach((b) => {
      this.reactor.barrasDeControl = this.reactor.barrasDeControl.filter(
        (r) => r !== b
      );
    });
  }

  private agregarBarras(barras: BarraControl[]): void {
    barras.forEach((b) => {
      this.reactor.barrasDeControl.push(b);
    });
  }

  private crearBarra(material: string): BarraControl | null {
    const selectorDeFabrica: SelectorFabricaBarra =
      SelectorFabricaBarra.getInstancia();

    let fabricaBarra: FabricaBarra | null = null;

    try {
      fabricaBarra = selectorDeFabrica.getFabrica(material);
    } catch (error) {
      console.log("No existe el tipo de barra elegido");
    }
    return fabricaBarra ? fabricaBarra.crearBarra() : null;
  }

  public subirBarras(cantidadInput: number = 0): void {
    const barrasRemovibles: BarraControl[] = this.getBarrasInsertadas();
    const numBarras: number = this._reactor.barrasDeControl.length;
    let cantidadASubir: number;

    if (cantidadInput > 0) {
      cantidadASubir = cantidadInput;
    } else {
      cantidadASubir = numBarras;
    }

    // Pendiente: agregar validación para los casos donde se reciba un valor mayor a la cantidad de barras existentes. También, agregar excepciones (todo respetando SOLID).

    for (let i = 0; i < cantidadASubir; i++) {
      barrasRemovibles[i].desactivar();
    }
  }

  public insertarBarras(cantidadInput: number = 0): void {
    const barrasActivables: BarraControl[] = this.getBarrasEnDesuso();
    const numBarras: number = this._reactor.barrasDeControl.length;
    let cantidadAInsertar: number;

    if (cantidadInput > 0) {
      cantidadAInsertar = cantidadInput;
    } else {
      cantidadAInsertar = numBarras;
    }

    // Pendiente: agregar validación para los casos donde se reciba un valor mayor a la cantidad de barras existentes. También, agregar excepciones (todo respetando SOLID).

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
