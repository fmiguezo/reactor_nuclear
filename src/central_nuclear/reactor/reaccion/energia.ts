export default class Energia {
  public static calcularEnergiaTermal(temp: number): number {
    return M_TERMAL * temp + B_TERMAL;
  }

  public static calcularEnergiaNeta(energiaTermal: number): number {
    if (energiaTermal == PRODUCCCION_MINIMA_ENERGIA_TERMAL) {
      return 100;
    } else {
      return M_NETA * energiaTermal + B_NETA;
    }
  }
}
