import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ModalUploadService {
    tipo: string;
    id: string;
    notificacion = new EventEmitter<any>();
    imagenUsuario = new EventEmitter<any>();

    constructor() {}

    limpiarDatos() {
        this.tipo = null;
        this.id = null;
    }

    mostrarModal(tipo: string, id: string) {
        this.tipo = tipo;
        this.id = id;
    }
}
