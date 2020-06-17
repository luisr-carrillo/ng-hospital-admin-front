import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class UsuarioService {
    usuario: Usuario;
    token: string;

    constructor(private http: HttpClient, private router: Router) {
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
