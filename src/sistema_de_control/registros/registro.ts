export default interface Registro {
  insertarRegistro(registro: number): void;
  obtenerRegistros(): Map<Date, number>;
}
