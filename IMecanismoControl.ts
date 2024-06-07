// ' Mecanismos de control
// interface IMecanismoDeControl implements Activable {
//     + estaActivo(): boolean;
//     + activar();
//     + desactivar();
//     + enfriarReactor();
// }

export default interface IMecanismoControl {
  estaActivo(): boolean;
  activar(): void;
  desactivar(): void;
}
