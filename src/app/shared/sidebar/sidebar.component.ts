import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styles: [],
})
export class SidebarComponent implements OnInit {
    constructor(
        public sidebarService: SidebarService,
        private usuarioService: UsuarioService
    ) {}

    ngOnInit(): void {}

    logout() {
        this.usuarioService.logout();
    }
}
