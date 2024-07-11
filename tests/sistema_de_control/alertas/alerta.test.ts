import Alerta from "../../../src/sistema_de_control/alertas/alerta";
import AlertaApagado from "../../../src/sistema_de_control/alertas/alerta_apagado";
import AlertaCritica from "../../../src/sistema_de_control/alertas/alerta_critica";
import AlertaEstandar from "../../../src/sistema_de_control/alertas/alerta_estandar";
import { TipoAlerta } from "../../../src/sistema_de_control/alertas/tipo_alerta";

describe("Alerta", () => {
  let instance: Alerta;
  let tipo: TipoAlerta;

  beforeEach(() => {
    instance = AlertaEstandar.getInstance();
    tipo = TipoAlerta.ESTANDAR;
  });

  it("el constructor debería inicializar correctamente", () => {
    expect(instance.getTipoAlerta()).toBe(TipoAlerta.ESTANDAR);
  });

  it("setTipoAlerta y getTipoAlerta deberían settear el tipo de alerta y obtenerlo, respectivamente", () => {
    instance.setTipoAlerta(TipoAlerta.CRITICA);
    expect(instance.getTipoAlerta()).toBe(TipoAlerta.CRITICA);

    instance.setTipoAlerta(TipoAlerta.APAGADO);
    expect(instance.getTipoAlerta()).toBe(TipoAlerta.APAGADO);

    instance.setTipoAlerta(TipoAlerta.ESTANDAR);
    expect(instance.getTipoAlerta()).toBe(TipoAlerta.ESTANDAR);
  });

  it("setDate y getDate deberían settear la fecha y obtenerla, respectivamente", () => {
    const fecha = new Date("2024-06-01T08:00:00");
    instance.setDate(fecha);
    expect(instance.getDate()).toEqual(fecha);
  });
});
