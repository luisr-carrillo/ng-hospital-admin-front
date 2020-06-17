import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UsuarioService {
    constructor(private http: HttpClient) {
        console.log('UsuarioService Ready');
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
                    localStorage.setItem('ngHospitalId', res.id);
                    localStorage.setItem('ngHospitalToken', res.token);
                    localStorage.setItem(
                        'ngHospitalUsuario',
                        JSON.stringify(res.usuarioDB)
                    );

                    return true;
                })
            );
    }
}
