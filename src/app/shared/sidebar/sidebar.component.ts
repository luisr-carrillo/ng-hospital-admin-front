import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styles: [],
})
export class SidebarComponent implements OnInit {
    usuario: Usuario;

    constructor(
        public sidebarService: SidebarService,
        private usuarioService: UsuarioService
    ) {
        this.usuario = this.usuarioService.usuario;
    }

    ngOnInit(): void {}

    logout() {
        this.usuarioService.logout();
    }
}
