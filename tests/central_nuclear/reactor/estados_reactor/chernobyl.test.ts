import Reactor from "../../../../src/central_nuclear/reactor/reactor";
import Chernobyl from "../../../../src/central_nuclear/reactor/estados_reactor/chernobyl";
import VerificarEstadoError from "../../../../src/errores/errores_central_nuclear/errores_de_los_estados_del_reactor/error_estado_chernobyl/verificar_estado_error";
import EncenderError from "../../../../src/errores/errores_central_nuclear/errores_de_los_estados_del_reactor/error_estado_chernobyl/encender_error";
import ApagarError from "../../../../src/errores/errores_central_nuclear/errores_de_los_estados_del_reactor/error_estado_chernobyl/apagar_error";
import { Constantes } from "../../../../src/central_nuclear/reactor/constantes";
let instance: Chernobyl;
let instanceReactor: Reactor;

describe("Test del estado Chernobyl", () => {
  let reactor: Reactor;
  let estado: Chernobyl;

  beforeEach(() => {
    reactor = new Reactor();
    estado = new Chernobyl(reactor);
  });

  it("verifica que la instancia sea de tipo Chernobyl", () => {
    expect(estado).toBeInstanceOf(Chernobyl);
  });

  it("debería retornar 0 en obtenerEnergiaNeta", () => {
    expect(estado.obtenerEnergiaNeta()).toBe(0);
  });

  it("debería lanzar VerificarEstadoError al verificar el estado", () => {
    expect(() => estado.verificarEstado()).toThrow(VerificarEstadoError);
    expect(() => estado.verificarEstado()).toThrow(
      Constantes.MENSAJE_ESTADO_CHERNOBYL_EXPLOTO
    );
  });

  it("debería lanzar EncenderError al intentar encender", () => {
    expect(() => estado.encender()).toThrow(EncenderError);
    expect(() => estado.encender()).toThrow(
      Constantes.MENSAJE_ESTADO_CHERNOBYL_NO_ENCENDIO
    );
  });

  it("debería lanzar ApagarError al intentar apagar", () => {
    expect(() => estado.apagar()).toThrow(ApagarError);
    expect(() => estado.apagar()).toThrow(
      Constantes.MENSAJE_ESTADO_CHERNOBYL_NO_APAGO
    );
  });

  it("debería retornar false en estaEncendido", () => {
    expect(estado.estaEncendido()).toBe(false);
  });

  it("debería retornar el mensaje correcto en toString", () => {
    expect(estado.toString()).toBe(Constantes.MENSAJE_ESTADO_CHERNOBYL_EXPLOTO);
  });
});
