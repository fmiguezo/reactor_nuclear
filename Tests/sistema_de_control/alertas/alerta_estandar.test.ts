import AlertaEstandar from "../../../src/sistema_de_control/alertas/alerta_estandar";
import { Constantes } from "../../../src/sistema_de_control/constantes";
import { TipoAlerta } from "../../../src/sistema_de_control/alertas/tipo_alerta";

describe("Test de la clase AlertaEstandar", () => {
  let instance: AlertaEstandar;
  let tipo: TipoAlerta = TipoAlerta.ESTANDAR;

  beforeEach(() => {
    instance = AlertaEstandar.getInstance();
  });

  it("Verifica que la instancia sea de AlertaEstandar", () => {
    expect(instance).toBeInstanceOf(AlertaEstandar);
  });

  it("Verifica que la propiedad tipoAlerta sea Estandar", () => {
    expect(instance.getTipoAlerta()).toBe(tipo);
  });

  it("Verifica que el mensaje de alerta sea el correcto", () => {
    expect(instance.obtenerMensajeDeAlerta()).toBe(Constantes.MENSAJE_ALERTA_CRITICA);
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
