import IAlerta from "../../src/sistema_de_control/alertas/ialerta";
import IOperador from "../Interfaces/IOperador";

export default class homero_simpson implements IOperador {
    leerNotificacion(a: IAlerta): void {
        console.log(
            `Mensaje: ${a.obtenerMensajeDeAlerta()} 
            \nTipo de alerta: ${a.obtenerTipoDeAlerta()} 
            \nFecha: ${a.obtenerTimestampDeAlerta()}`
        );
    }
    
}