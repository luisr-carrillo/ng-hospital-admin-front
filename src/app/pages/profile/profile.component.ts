import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styles: [],
})
export class ProfileComponent implements OnInit {
    usuario: Usuario;

    constructor(private usuarioService: UsuarioService) {
        this.usuario = this.usuarioService.usuario;
    }

    ngOnInit(): void {}

    guardarDatos(forma: NgForm) {
        this.usuario.nombre = forma.value.nombre;
        if (!this.usuario.google) {
            this.usuario.email = forma.value.email;
        }

        this.usuarioService
            .actualizarUsuario(this.usuario)
            .subscribe();
    }
}
