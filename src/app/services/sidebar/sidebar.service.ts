import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
    providedIn: 'root',
})
export class SidebarService {
    menu: any[];

    constructor(private usuarioService: UsuarioService) {}

    cargarMenu() {
        this.menu = this.usuarioService.menu;
    }
}
