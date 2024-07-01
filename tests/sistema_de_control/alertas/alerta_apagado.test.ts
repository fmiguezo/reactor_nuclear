import AlertaApagado from "../../../src/sistema_de_control/alertas/alerta_apagado";
import { Constantes } from "../../../src/sistema_de_control/constantes";
import { TipoAlerta } from "../../../src/sistema_de_control/alertas/tipo_alerta";

describe("Test de la clase AlertaEstandar", () => {
  let instance: AlertaApagado;


  beforeEach(() => {
    instance = AlertaApagado.getInstance();
    instance.setTipoAlerta(TipoAlerta.ESTANDAR);
  });

  it("Verifica que la instancia sea de AlertaEstandar", () => {
    expect(instance).toBeInstanceOf(AlertaApagado);
  });

  it("Verifica que la propiedad tipoAlerta sea Estandar", () => {
    expect(instance.getTipoAlerta()).toBe(TipoAlerta.ESTANDAR);
  });

  it("Verifica que el mensaje de alerta sea el correcto", () => {
    expect(instance.obtenerMensajeDeAlerta()).toBe(Constantes.MENSAJE_ALERTA_APAGADO);
  });

  it("Verifica que la propiedad date sea una instancia de Date", () => {
    expect(instance.getDate()).toBeInstanceOf(Date);
  });

  it("Verifica que el setTipoAlerta funcione", () => {
    instance.setTipoAlerta(TipoAlerta.CRITICA);
    expect(instance.getTipoAlerta()).toBe(TipoAlerta.CRITICA);
  });

  it("Verifica que el setDate funcione", () => {
    instance.setDate(new Date("2024-06-08T12:00:00"));
    let anotherDate = new Date();
    anotherDate = instance.getDate();
    expect(instance.getDate()).toBe(anotherDate);
  });
});
