import RegistroBarrasUsadas from "../../../src/sistema_de_control/registros/registro_barras_usadas";

describe("Singleton RegistroBarrasUsadas", () => {
  it("_instancia debe ser undefined antes de obtener una instancia", () => {
    expect(RegistroBarrasUsadas["_instancia"]).toBeUndefined();
  });

  it("_instancia no debe ser undefined luego de obtener una instancia", () => {
    const instanciaSingleton: RegistroBarrasUsadas = RegistroBarrasUsadas.instancia;
    expect(RegistroBarrasUsadas["_instancia"]).not.toBeUndefined();
  });

  it("verifica que las instancias obtenidas sean iguales", () => {
    const instanciaSingletonA: RegistroBarrasUsadas = RegistroBarrasUsadas.instancia;
    const instanciaSingletonB: RegistroBarrasUsadas = RegistroBarrasUsadas.instancia;

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

  it("debe crear una instancia solo una vez (patrón singleton)", () => {
    const anotherRegistro = RegistroBarrasUsadas.instancia;
    expect(registro).toBe(anotherRegistro);
  });

  it("debería inicializar mapaRegistros en el constructor", () => {
    expect(registro.obtenerRegistros()).toBeInstanceOf(Map);
  });

  it("debe insertar un nuevo registro en mapaRegistros", () => {
    const dateBefore = new Date();
    const barrasUsadas = 5;
    registro.insertarRegistro(barrasUsadas);
    const records = registro.obtenerRegistros();

    expect(records.size).toBe(1);
    const recordDate = Array.from(records.keys())[0];
    expect(recordDate.getTime()).toBeGreaterThanOrEqual(dateBefore.getTime());
    expect(records.get(recordDate)).toBe(barrasUsadas);
  });

  it("debe insertar varios registros con diferentes timestamps", () => {
    const barrasUsadas1 = 5;
    const barrasUsadas2 = 10;
    registro.insertarRegistro(barrasUsadas1);

    jest.advanceTimersByTime(1000);

    registro.insertarRegistro(barrasUsadas2);
    const records = registro.obtenerRegistros();

    expect(records.size).toBe(2);
    const recordValues = Array.from(records.values());
    expect(recordValues).toContain(barrasUsadas1);
    expect(recordValues).toContain(barrasUsadas2);
  });

  it("debería devolver los registros correctos de obtenerRegistros", () => {
    const barrasUsadas1 = 5;
    const barrasUsadas2 = 10;
    const barrasUsadas3 = 15;
    registro.insertarRegistro(barrasUsadas1);

    jest.advanceTimersByTime(1000);
    registro.insertarRegistro(barrasUsadas2);

    jest.advanceTimersByTime(1000);
    registro.insertarRegistro(barrasUsadas3);

    const records = registro.obtenerRegistros();

    expect(records.size).toBe(3);
    const recordValues = Array.from(records.values());
    expect(recordValues).toEqual([barrasUsadas1, barrasUsadas2, barrasUsadas3]);
  });
});
