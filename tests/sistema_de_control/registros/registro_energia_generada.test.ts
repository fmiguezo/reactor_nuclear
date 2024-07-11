import RegistroEnergiaGenerada from "../../../src/sistema_de_control/registros/registro_energia_generada";

describe("Singleton RegistroEnergiaGenerada", () => {
  it("_instancia debe ser undefined antes de obtener una instancia", () => {
    expect(RegistroEnergiaGenerada["_instancia"]).toBeUndefined();
  });

  it("_instancia no debe ser undefined luego de obtener una instancia", () => {
    const instanciaSingleton: RegistroEnergiaGenerada =
      RegistroEnergiaGenerada.instancia;
    expect(RegistroEnergiaGenerada["_instancia"]).not.toBeUndefined();
  });

  it("verifica que las instancias obtenidas sean iguales", () => {
    const instanciaSingletonA: RegistroEnergiaGenerada =
      RegistroEnergiaGenerada.instancia;
    const instanciaSingletonB: RegistroEnergiaGenerada =
      RegistroEnergiaGenerada.instancia;

    expect(instanciaSingletonA).toBe(instanciaSingletonB);
  });
});

describe("Test de la clase registro_energia_generada.ts", () => {
  let registro: RegistroEnergiaGenerada;

  beforeEach(() => {
    // Restablecer la instancia singleton antes de cada prueba
    (RegistroEnergiaGenerada as any)._instancia = null;
    registro = RegistroEnergiaGenerada.instancia;
  });

  it("Verifica que el registro sea de la instancia RegistroEnergiaGenerada", () => {
    expect(registro).toBeInstanceOf(RegistroEnergiaGenerada);
  });

  it("Verifica que al tener dos instancias de RegistroEnergiaGenerada, sean la misma", () => {
    const instance1 = RegistroEnergiaGenerada.instancia;
    const instance2 = RegistroEnergiaGenerada.instancia;

    expect(instance1).toBe(instance2);
  });

  it("Verifica que debería crear una instancia si no fue creada con anterioridad", () => {
    const instance = RegistroEnergiaGenerada.instancia;

    expect(instance).not.toBeNull();
    expect(RegistroEnergiaGenerada.instancia).toBe(instance);
  });

  it("Debería insertar un registro correctamente", () => {
    const energiaProducida = 5;

    registro.insertarRegistro(energiaProducida);

    const registros = registro.obtenerRegistros();
    const [fecha, valor] = Array.from(registros.entries())[0];

    expect(registros.size).toBe(1);
    expect(valor).toBe(energiaProducida);
    expect(fecha).toBeInstanceOf(Date);
  });

  it("Debería obtener los registros correctamente", () => {
    const energiaProducida1 = 5;
    const energiaProducida2 = 10;

    registro.insertarRegistro(energiaProducida1);
    registro.insertarRegistro(energiaProducida2);

    const registros = registro.obtenerRegistros();

    expect(registros.size).toBe(2);

    const valores = Array.from(registros.values());
    expect(valores).toContain(energiaProducida1);
    expect(valores).toContain(energiaProducida2);
  });
});
