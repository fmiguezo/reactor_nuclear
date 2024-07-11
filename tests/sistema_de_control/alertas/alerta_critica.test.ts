import AlertaCritica from "../../../src/sistema_de_control/alertas/alerta_critica";
import { Constantes } from "../../../src/sistema_de_control/alertas/constantes";
import { TipoAlerta } from "../../../src/sistema_de_control/alertas/tipo_alerta";

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
    expect(instance.obtenerMensajeDeAlerta()).toBe(Constantes.MENSAJE_ALERTA_CRITICA);
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

  describe("Tests de suscripción a alertas y notificación a suscriptores", () => {
    const empleadoMock = { notificar: jest.fn() };

    it("agregarSuscriptor y removerSuscriptor debberían agregar y eliminar suscriptores respectivamente", () => {
      instance.agregarSuscriptor(empleadoMock);
      expect(instance["_suscriptores"]).toContain(empleadoMock);

      instance.removerSuscriptor(empleadoMock);
      expect(instance["_suscriptores"]).not.toContain(empleadoMock);
    });

    it("notificar debe llamar al método notificar de los suscriptores", () => {
      instance.agregarSuscriptor(empleadoMock);
      instance.notificar();
      expect(empleadoMock.notificar).toHaveBeenCalledWith(instance);
    });
  });
});
