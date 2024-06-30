import RegistroBarrasUsadas from "../../../../src/sistema_de_control/registros/registro_barras_usadas";

describe("Test de la clase registro_barras_usadas.ts", () => {

    let registro: RegistroBarrasUsadas;

    beforeEach(() => {
        // Restablecer la instancia singleton antes de cada prueba
        (RegistroBarrasUsadas as any)._instancia = null;
        registro = RegistroBarrasUsadas.instancia;
    });

    it("Verifica que el registro sea de la instancia RegistroBarrasUsadas", () => {
        expect(registro).toBeInstanceOf(RegistroBarrasUsadas);
    });

    it("Verifica que al tener dos instancias de RegistroBarrasUsadas, sean la misma", () => {
        const instance1 = RegistroBarrasUsadas.instancia;
        const instance2 = RegistroBarrasUsadas.instancia;

        expect(instance1).toBe(instance2);
    });

    it("Verifica que debería crear una instancia si no fue creada con anterioridad", () => {
        const instance = RegistroBarrasUsadas.instancia;

        expect(instance).not.toBeNull();
        expect(RegistroBarrasUsadas.instancia).toBe(instance);
    });

    it("Debería insertar un registro correctamente", () => {
        const barrasUsadas = 5;
        
        registro.insertarRegistro(barrasUsadas);

        const registros = registro.obtenerRegistros();
        const [fecha, valor] = Array.from(registros.entries())[0];

        expect(registros.size).toBe(1);
        expect(valor).toBe(barrasUsadas);
        expect(fecha).toBeInstanceOf(Date);
    });

    it("Debería obtener los registros correctamente", () => {
        const barrasUsadas1 = 5;
        const barrasUsadas2 = 10;

        registro.insertarRegistro(barrasUsadas1);
        registro.insertarRegistro(barrasUsadas2);

        const registros = registro.obtenerRegistros();

        expect(registros.size).toBe(2);

        const valores = Array.from(registros.values());
        expect(valores).toContain(barrasUsadas1);
        expect(valores).toContain(barrasUsadas2);
    });
});