import {Component, OnInit} from '@angular/core';
import {Usuario} from 'src/app/models/usuario.model';
import {UsuarioService} from 'src/app/services/usuario/usuario.service';
import Swal from 'sweetalert2';
import {ModalUploadService} from 'src/app/components/modal-upload/modal-upload.service';

declare const $: any;

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styles: [],
})
export class UsuariosComponent implements OnInit {
    usuarios: Usuario[] = [];
    desde = 0;
    totalRegistros = 0;
    cargando: boolean;

    constructor(
        private usuarioService: UsuarioService,
        private modalUploadService: ModalUploadService
    ) {
    }

    ngOnInit(): void {
        this.cargarUsuarios();
        this.modalUploadService.notificacion.subscribe((res: any) => {
            this.cargarUsuarios();
        });

    }

    cargarUsuarios(): void {
        this.cargando = true;

        this.usuarioService
            .obtenerUsuarios(this.desde)
            .subscribe((res: any) => {
                this.totalRegistros = res.total;
                this.usuarios = res.usuarios;
                this.cargando = false;
            });
    }

    cambiarDesde(valor: number) {
        const desde = this.desde + valor;
        if (desde >= this.totalRegistros) {
            return;
        }
        if (desde < 0) {
            return;
        }
        this.desde += valor;
        this.cargarUsuarios();
    }

    buscarUsuario(termino: string) {
        if (termino.length <= 0) {
            this.cargarUsuarios();
            return;
        }
        this.cargando = true;
        this.usuarioService
            .buscarUsuario(termino)
            .subscribe((usuarios: Usuario[]) => {
                this.usuarios = usuarios;
                this.cargando = false;
            });
    }

    cambiarImagen(usuario: Usuario) {
        this.modalUploadService.mostrarModal('usuarios', usuario._id);
        this.modalUploadService.imagenUsuario.emit(usuario.img);
        $('#modalUpload').modal('show');
    }

    guardarUsuario(usuario: Usuario) {
        this.usuarioService.actualizarUsuario(usuario).subscribe();
    }

    borrarUsuario(usuario: Usuario) {
        if (usuario._id === this.usuarioService.usuario._id) {
            Swal.fire(
                'No se pudo eliminar al usuario',
                `No se puedo eliminar a "${usuario.email}" porque es el usuario conectado actualmente al sistema`,
                'warning'
            );
        } else {
            Swal.fire({
                title: '¿Seguro que desea eliminar al usuario?',
                text: `Se va a eliminar al usuario "${usuario.email}", esta acción no se podrá revertir.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#398bf7',
                cancelButtonColor: '#ef5350',
                confirmButtonText: 'Sí, eliminar al usuario',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.value) {
                    this.usuarioService
                        .eliminarUsuario(usuario._id)
                        .subscribe((res: any) => {
                            this.desde = 0;
                            this.totalRegistros = 0;
                            this.cargarUsuarios();
                        });
                }
            });
        }
    }
}
