import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UsuarioService {
    usuario: Usuario;
    token: string;
    menu: any[] = [];

    constructor(
        private http: HttpClient,
        private router: Router,
        private archivoService: SubirArchivoService
    ) {
        this.cargarLocalStorage();
    }

    obtenerUsuarios(desde: number = 0) {
        return this.http.get(
            `${environment.URL_SERVICIOS}/usuario?desde=${desde}`
        );
    }
    buscarUsuario(termino: string) {
        return this.http
            .get(
                `${environment.URL_SERVICIOS}/busqueda/coleccion/usuarios/${termino}`
            )
            .pipe(map((res: any) => res.usuarios));
    }

    crearUsuario(usuario: Usuario) {
        return this.http
            .post(`${environment.URL_SERVICIOS}/usuario`, usuario)
            .pipe(
                map((res: any) => {
                    Swal.fire(
                        'Usuario creado',
                        `El usuario con email: "${res.usuario.email}" ha sido creado exitosamente.`,
                        'success'
                    );
                }),
                catchError((err: any) => {
                    Swal.fire(
                        `Oops... Error ${err.status}`,
                        err.error.errores.message,
                        'error'
                    );
                    return throwError(err.message);
                })
            );
    }

    actualizarUsuario(usuario: Usuario) {
        let params = new HttpParams();
        params = params.set('token', this.token);

        return this.http
            .put(
                `${environment.URL_SERVICIOS}/usuario/${usuario._id}`,
                usuario,
                { params }
            )
            .pipe(
                map((res: any) => {
                    if (usuario._id === this.usuario._id) {
                        this.guardarLocalStorage(
                            res.usuario._id,
                            this.token,
                            res.usuario,
                            this.menu
                        );
                    }

                    Swal.fire(
                        'Usuario actualizado',
                        `El usuario con email: "${res.usuario.email}" ha sido actualizado exitosamente.`,
                        'success'
                    );

                    return true;
                }),
                catchError((err: any) => {
                    console.log('actualizarUsuario()', err);

                    Swal.fire(
                        `Oops... Error ${err.status}`,
                        'Hubo un error al actualizar el usuario',
                        'error'
                    );
                    return throwError(err.message);
                })
            );
    }

    eliminarUsuario(id: string) {
        let params = new HttpParams();
        params = params.set('token', this.token);

        return this.http
            .delete(`${environment.URL_SERVICIOS}/usuario/${id}`, {
                params,
            })
            .pipe(
                map((res: any) => {
                    Swal.fire(
                        'Usuario eliminado',
                        `El usuario "${res.usuario.email}" ha sido eliminado exitosamente.`,
                        'success'
                    );
                    return true;
                })
            );
    }

    actualizarImagen(archivos: File, id: string) {
        return this.archivoService
            .subirArchivos(archivos, 'usuarios', id)
            .then((res: any) => {
                this.usuario.img = res.usuario.img;
                this.guardarLocalStorage(
                    res.usuario._id,
                    this.token,
                    this.usuario,
                    this.menu
                );
                Swal.fire(
                    'Imagen actualizada',
                    `La iamgen del usuario con email: "${res.usuario.email}" ha sido actualizada exitosamente.`,
                    'success'
                );
            })
            .catch((err: any) =>
                console.error('UsuarioService | actualizarImagen():', err)
            );
    }

    iniciarSesion(usuario: Usuario, recordar = false) {
        if (recordar) {
            localStorage.setItem('ngHospitalEmail', usuario.email);
        } else {
            localStorage.removeItem('ngHospitalEmail');
        }

        return this.http
            .post(`${environment.URL_SERVICIOS}/login`, usuario)
            .pipe(
                map((res: any) => {
                    this.guardarLocalStorage(
                        res.id,
                        res.token,
                        res.usuario,
                        res.menu
                    );
                    return true;
                }),
                catchError((err: any) => {
                    Swal.fire(
                        `Oops... Error ${err.status}`,
                        err.error.mensaje,
                        'error'
                    );
                    return throwError(err.message);
                })
            );
    }

    googleAuth(token: string) {
        return this.http
            .post(`${environment.URL_SERVICIOS}/login/google`, {
                idToken: token,
            })
            .pipe(
                map((res: any) => {
                    this.guardarLocalStorage(
                        res.id,
                        res.token,
                        res.usuario,
                        res.menu
                    );
                    return true;
                })
            );
    }

    logout() {
        this.token = '';
        this.usuario = null;
        this.menu = [];
        localStorage.removeItem('ngHospitalId');
        localStorage.removeItem('ngHospitalToken');
        localStorage.removeItem('ngHospitalUsuario');
        localStorage.removeItem('ngHospitalMenu');

        this.router.navigate(['/login']);
    }

    isLogin() {
        return this.token ? true : false;
    }

    private cargarLocalStorage() {
        if (localStorage.getItem('ngHospitalToken')) {
            this.token = localStorage.getItem('ngHospitalToken');
            this.usuario = JSON.parse(
                localStorage.getItem('ngHospitalUsuario')
            );
            this.menu = JSON.parse(localStorage.getItem('ngHospitalMenu'));
        } else {
            this.token = '';
            this.usuario = null;
            this.menu = [];
        }
    }
    private guardarLocalStorage(
        id: string,
        token: string,
        usuario: Usuario,
        menu: any
    ) {
        localStorage.setItem('ngHospitalId', id);
        localStorage.setItem('ngHospitalToken', token);
        localStorage.setItem('ngHospitalUsuario', JSON.stringify(usuario));
        localStorage.setItem('ngHospitalMenu', JSON.stringify(menu));

        this.usuario = usuario;
        this.token = token;
        this.menu = menu;
    }
}
