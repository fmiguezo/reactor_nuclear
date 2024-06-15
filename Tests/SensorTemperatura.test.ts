import SensorTemperatura from "../SensorTemperatura";
let instance: SensorTemperatura;

beforeEach(() => {
  instance = new SensorTemperatura();
  instance.activo = true;
  instance.ultimaTemperatura = 0;
})

describe("SensorTemperatura getters y setters", () => {


  it("verifica que la instancia sea de tipo SensorTemperatura", () => {
    expect(instance).toBeInstanceOf(SensorTemperatura);
  })

  it("Verifica que la instancia este activa", () => {

    expect(instance.activo).toBe(true);
  })

})

describe("Test de los metodos implementados de ISensor.ts", () => {

  it("Verifica que la instancia este activa", () => {

    expect(instance.activo).toBe(true);
  })

  it("Verfica el metodo activar", () => {
    instance.activo = false;
    instance.activar();
    expect(instance.activo).toBe(true);
  })

  it("verifica el metodo desactivar", () => {
    instance.activo = true;
    instance.desactivar();
    expect(instance.activo).toBe(false);
  })

  it("verifica que la instancia actualizar valor reciba correctamente la temperatura y la sette in ultimaTemperatura", () => {
    instance.actualizarValor(100);
    expect(instance.obtenerValor()).toBe(100);
  })

  it("Verifica que este activo devuelva el valor esperado", () => {
    instance.activo = true;
    expect(instance.estaActivo()).toBe(true);
  })

  it("Verifica el else se actualizarValor", () => {
    instance.activo = false;
    expect(() => instance.actualizarValor(100)).toThrow(Error);
  })


})