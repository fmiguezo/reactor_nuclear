export default class Energia {
  private calcEnergiaTermal(temp: number): number {
    const pendiente = 8;
    const b = -139.82;
    return pendiente * temp + b;
  }

  private calcEnergiaNeta(EnergiaTermal: number): number {
    if (EnergiaTermal < 2100) {
      return 0;
    } else if (EnergiaTermal < 2166.67) {
      return 100;
    }

    const pendiente = 1.75;
    const b = -3675.035;

    return pendiente * EnergiaTermal + b;
  }

  public getEnergiaTermal(temp: number): number {
    return this.calcEnergiaTermal(temp);
  }

  public getEnergiaNeta(temp: number): number {
    let energiaTermal = this.calcEnergiaTermal(temp);
    return this.calcEnergiaNeta(energiaTermal);
  }
}
