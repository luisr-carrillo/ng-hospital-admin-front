import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Medico } from '../../models/medico.model';
import { environment } from '../../../environments/environment';
import { UsuarioService } from '../usuario/usuario.service';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { kStringMaxLength } from 'buffer';

@Injectable({
    providedIn: 'root',
})
export class MedicoService {
    constructor(
        private http: HttpClient,
        private usuarioService: UsuarioService,
        private archivoService: SubirArchivoService
    ) {}

    cargarMedicos(desde: number = 0) {
        return this.http.get(
            `${environment.URL_SERVICIOS}/medico?desde=${desde}`
        );
    }

    buscarMedicos(termino: string) {
        return this.http
            .get(
                `${environment.URL_SERVICIOS}/busqueda/coleccion/medicos/${termino}`
            )
            .pipe(map((res: any) => res.medicos));
    }

    crearMedico(medico: Medico) {
        let params = new HttpParams();
        params = params.set('token', this.usuarioService.token);

        return this.http
            .post(`${environment.URL_SERVICIOS}/medico`, medico, { params })
            .pipe(
                map((res: any) => {
                    console.log(res);

                    Swal.fire(
                        'Medico creado',
                        `El medico: "${res.medico.nombre}" ha sido creado exitosamente.`,
                        'success'
                    );

                    return res.medico;
                })
            );
    }

    borrarMedico(id: string) {
        let params = new HttpParams();
        params = params.set('token', this.usuarioService.token);

        return this.http
            .delete(`${environment.URL_SERVICIOS}/medico/${id}`, { params })
            .pipe(
                map((res: any) => {
                    Swal.fire(
                        'Medico eliminado',
                        `El medico: "${res.medico.nombre}" ha sido eliminado exitosamente.`,
                        'success'
                    );

                    return true;
                })
            );
    }

    actualizarMedico(medico: Medico) {
        let params = new HttpParams();
        params = params.set('token', this.usuarioService.token);

        return this.http
            .put(`${environment.URL_SERVICIOS}/medico/${medico._id}`, medico, {
                params,
            })
            .pipe(
                map((res: any) => {
                    Swal.fire(
                        'Medico actualizado',
                        `El medico con ID: "${res.medico._id}" ha sido actualizado exitosamente.`,
                        'success'
                    );

                    return true;
                })
            );
    }

    obtenerMedico(id: string) {
        return this.http
            .get(`${environment.URL_SERVICIOS}/medico/${id}`)
            .pipe(map((res: any) => res.medico));
    }

    actualizarImagen(archivos: File, id: string) {
        return this.archivoService
            .subirArchivos(archivos, 'medicos', id)
            .then((res: any) => {
                console.log(res);

                Swal.fire(
                    'Imagen actualizada',
                    `La imagen del medico: "${res.medico.nombre}" ha sido actualizada exitosamente.`,
                    'success'
                );
            })
            .catch((err: any) =>
                console.error('UsuarioService | actualizarImagen():', err)
            );
    }
}
