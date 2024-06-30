import EstadoReactor from "../../central_nuclear/reactor/estados_reactor/estadoreactor";

export default class RegistroEstados {
    private static _instancia: RegistroEstados;
    private contadorCambiosEstado: Map<EstadoReactor, number>;

    private constructor() {
        this.contadorCambiosEstado = new Map<EstadoReactor, number>();
    }

    public static get instancia(): RegistroEstados {
        if (RegistroEstados._instancia == null) {
            RegistroEstados._instancia = new RegistroEstados();
        }
        return RegistroEstados._instancia;
    }

    public aumentarRegistro(estado: EstadoReactor): void {
        const conteoActual = this.contadorCambiosEstado.get(estado) || 0;
        this.contadorCambiosEstado.set(estado, conteoActual + 1);
    }
}
