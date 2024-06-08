import IAlerta from "./IAlerta";

export default class NotificadorDeAlerta {

    notificarAlerta(alerta: IAlerta) {
        console.log(`Mensaje: ${alerta.obtenerMensajeDeAlerta} \nTipo de alerta: ${alerta.obtenerTipoDeAlerta} \nFecha: ${alerta.obtenerTimestampDeAlerta}`);
    }

}