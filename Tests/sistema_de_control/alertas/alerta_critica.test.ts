import AlertaCritica from "../../../src/sistema_de_control/alertas/alerta_critica";


describe("Test de la clase AlertaCritica", () => {
  let instance: AlertaCritica;
  beforeEach(() => {
    instance = AlertaCritica.getInstance();
  });

  it("Verifica que la instancia sea de AlertaCritica", () => {
    expect(instance).toBeInstanceOf(AlertaCritica);
  });

  it("Verifica que la propiedad tipoAlerta sea CRITICA", () => {
    expect(instance.getTipoAlerta()).toBe(TipoAlerta.CRITICA);
  });

  it("Verifica que el mensaje de alerta sea el correcto", () => {
    expect(instance.obtenerMensajeDeAlerta()).toBe("ALERTA CRITICA, EL REACTOR SE APAGARA");
  });

  it("Verifica que la propiedad date sea una instancia de Date", () => {
    expect(instance.getDate()).toBeInstanceOf(Date);
  });

  it("Verifica que el setTipoAlerta funcione", () => {
    instance.setTipoAlerta(TipoAlerta.ESTANDAR);
    expect(instance.getTipoAlerta()).toBe(TipoAlerta.ESTANDAR);
  });

  it("Verifica que el setDate funcione", () => {
    instance.setDate(new Date("2024-06-08T12:00:00"));
    let anotherDate = new Date();
    anotherDate = instance.getDate();
    expect(instance.getDate()).toBe(anotherDate);
  });
});
