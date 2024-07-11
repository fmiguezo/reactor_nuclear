import RegistroBarrasUsadas from "../../../src/sistema_de_control/registros/registro_barras_usadas";

describe("Singleton RegistroBarrasUsadas", () => {
  it("_instancia debe ser undefined antes de obtener una instancia", () => {
    expect(RegistroBarrasUsadas["_instancia"]).toBeUndefined();
  });

  it("_instancia no debe ser undefined luego de obtener una instancia", () => {
    const instanciaSingleton: RegistroBarrasUsadas =
      RegistroBarrasUsadas.instancia;
    expect(RegistroBarrasUsadas["_instancia"]).not.toBeUndefined();
  });

  it("verifica que las instancias obtenidas sean iguales", () => {
    const instanciaSingletonA: RegistroBarrasUsadas =
      RegistroBarrasUsadas.instancia;
    const instanciaSingletonB: RegistroBarrasUsadas =
      RegistroBarrasUsadas.instancia;

    expect(instanciaSingletonA).toBe(instanciaSingletonB);
  });
});

describe("RegistroBarrasUsadas", () => {
  let registro: RegistroBarrasUsadas;

  beforeEach(() => {
    registro = RegistroBarrasUsadas.instancia;
    registro.obtenerRegistros().clear(); // Limpiar mapa de registros antes de cada prueba
  });

  it("Verifica que la instancia sea de tipo RegistroBarrasUsadas", () => {
    expect(registro).toBeInstanceOf(RegistroBarrasUsadas);
  });

  it("Verifica que la instancia singleton sea siempre la misma", () => {
    const instancia1 = RegistroBarrasUsadas.instancia;
    const instancia2 = RegistroBarrasUsadas.instancia;
    expect(instancia1).toBe(instancia2);
  });

  it("Verifica que el constructor inicialice correctamente mapaRegistros", () => {
    const registros = registro.obtenerRegistros();
    expect(registros.size).toBe(0);
  });

  it("Debería insertar y obtener un registro correctamente", () => {
    const barrasUsadas = 5;
    registro.insertarRegistro(barrasUsadas);
    const registros = registro.obtenerRegistros();
    const [fecha, valor] = Array.from(registros.entries())[0];

    expect(registros.size).toBe(1);
    expect(valor).toBe(barrasUsadas);
    expect(fecha).toBeInstanceOf(Date);
  });

  it("Debería obtener todos los registros insertados", () => {
    const barrasUsadas1 = 5;
    const barrasUsadas2 = 10;

    registro.insertarRegistro(barrasUsadas1);
    registro.insertarRegistro(barrasUsadas2);

    const registros = registro.obtenerRegistros();
    expect(registros.size).toBe(2);
    expect(registros.get(Array.from(registros.keys())[0])).toBe(barrasUsadas1);
    expect(registros.get(Array.from(registros.keys())[1])).toBe(barrasUsadas2);
  });
});
