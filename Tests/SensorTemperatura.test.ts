import SensorTemperatura from "../SensorTemperatura";

describe("SensorTemperatura getters y setters", () => {
    let instance: SensorTemperatura;
  
    beforeEach(() => {
      instance = new SensorTemperatura();
      instance.activo = true;
      instance.ultimaTemperatura = 0;
    })
  
    it("verifica que la instancia sea de tipo SensorTemperatura", () => {
        expect(instance).toBeInstanceOf(SensorTemperatura);
    })
  
    it("Verifica que la instancia este activa", () => {

      expect(instance.activo).toBe(true);
    })

    it("Verifica que la instancia no este activa", () => {
        expect(instance.activo).toBe(false);
    })
  
    it("Verifica que el valor de la temperatura inicial sea 0", () => {
        expect(instance.ultimaTemperatura).toBe(0);
    })
    
    it("Verifica que el valor de la temperatura inicial sea 0", () => {
        expect(instance.ultimaTemperatura).toBe(100);
    })
    
  
  
  })
