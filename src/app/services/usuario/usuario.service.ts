import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
    providedIn: 'root',
})
export class UsuarioService {
    usuario: Usuario;
    token: string;

    constructor(
        private http: HttpClient,
        private router: Router,
        private archivoService: SubirArchivoService
    ) {
        this.cargarLocalStorage();
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
                })
            );
    }

    actualizarUsuario(usuario: Usuario) {
        let params = new HttpParams();
        params = params.set('token', this.token);

        return this.http
            .put(
                `${environment.URL_SERVICIOS}/usuario/${this.usuario._id}`,
                usuario,
                { params }
            )
            .pipe(
                map((res: any) => {
                    this.guardarLocalStorage(
                        res.usuario._id,
                        this.token,
                        res.usuario
                    );
                    Swal.fire(
                        'Usuario actualizado',
                        `El usuario con email: "${res.usuario.email}" ha sido actualizado exitosamente.`,
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
                    this.usuario
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
                    this.guardarLocalStorage(res.id, res.token, res.usuario);
                    return true;
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
                    this.guardarLocalStorage(res.id, res.token, res.usuario);
                    return true;
                })
            );
    }

    logout() {
        this.token = '';
        this.usuario = null;
        localStorage.removeItem('ngHospitalId');
        localStorage.removeItem('ngHospitalToken');
        localStorage.removeItem('ngHospitalUsuario');

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
        } else {
            this.token = '';
            this.usuario = null;
        }
    }
    private guardarLocalStorage(id: string, token: string, usuario: Usuario) {
        localStorage.setItem('ngHospitalId', id);
        localStorage.setItem('ngHospitalToken', token);
        localStorage.setItem('ngHospitalUsuario', JSON.stringify(usuario));

        this.usuario = usuario;
        this.token = token;
    }
}
