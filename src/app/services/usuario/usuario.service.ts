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
    url = `${environment.URL_SERVICIOS}/usuario`;

    constructor(private http: HttpClient) {
        console.log('UsuarioService Ready');
    }

    crearUsuario(usuario: Usuario) {
        return this.http.post(this.url, usuario).pipe(
            map((res: any) => {
                Swal.fire(
                    'Usuario creado',
                    `El usuario con email: "${res.usuario.email}" ha sido creado exitosamente.`,
                    'success'
                );
            })
        );
    }
}
