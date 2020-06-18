import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styles: [],
})
export class ProfileComponent implements OnInit {
    usuario: Usuario;
    imagenSubir: File;
    imagenTemp: string | ArrayBuffer;

    constructor(private usuarioService: UsuarioService) {
        this.usuario = this.usuarioService.usuario;
    }

    ngOnInit(): void {}

    guardarDatos(forma: NgForm) {
        this.usuario.nombre = forma.value.nombre;
        if (!this.usuario.google) {
            this.usuario.email = forma.value.email;
        }

        this.usuarioService.actualizarUsuario(this.usuario).subscribe();
    }

    seleccionImagen(archivo: File) {
        if (!archivo) {
            this.imagenSubir = null;
            return;
        }

        if (archivo.type.indexOf('image') < 0) {
            Swal.fire(
                'Tipo de imagen invalido',
                `Solamente se admiten archivos de tipo imagen: png, jpg y jpeg.`,
                'error'
            );
            this.imagenSubir = null;
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(archivo);
        reader.onloadend = () => (this.imagenTemp = reader.result);
        
        this.imagenSubir = archivo;
    }

    cambiarImagen() {
        this.usuarioService.actualizarImagen(
            this.imagenSubir,
            this.usuario._id
        );
    }
}
