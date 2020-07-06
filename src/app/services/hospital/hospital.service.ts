import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Hospital } from '../../models/hospital.model';
import { environment } from '../../../environments/environment';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
    providedIn: 'root',
})
export class HospitalService {
    constructor(
        private http: HttpClient,
        private usuarioService: UsuarioService
    ) {}

    cargarHospitales(desde: number = 0) {
        return this.http.get(
            `${environment.URL_SERVICIOS}/hospital?desde=${desde}`
        );
    }

    obtenerHospital(id: string) {
        return this.http.get(`${environment.URL_SERVICIOS}/hospital/${id}`);
    }

    borrarHospital(id: string) {
        let params = new HttpParams();
        params = params.set('token', this.usuarioService.token);
        return this.http
            .delete(`${environment.URL_SERVICIOS}/hospital/${id}`, { params })
            .pipe(
                map((res: any) => {
                    Swal.fire(
                        'Hospital eliminado',
                        `El hospital: "${res.hospital.nombre}" ha sido eliminado exitosamente.`,
                        'success'
                    );

                    return true;
                })
            );
    }

    crearHospital(nombre: string) {
        let params = new HttpParams();
        params = params.set('token', this.usuarioService.token);

        return this.http
            .post(
                `${environment.URL_SERVICIOS}/hospital`,
                { nombre },
                { params }
            )
            .pipe(
                map((res: any) => {
                    Swal.fire(
                        'Hospital creado',
                        `El hospital: "${res.hospital.nombre}" ha sido creado exitosamente.`,
                        'success'
                    );

                    return true;
                })
            );
    }

    actualizarHospital(hospital: Hospital) {
        let params = new HttpParams();
        params = params.set('token', this.usuarioService.token);
        const nombre = hospital.nombre;

        return this.http
            .put(
                `${environment.URL_SERVICIOS}/hospital/${hospital._id}`,
                { nombre },
                { params }
            )
            .pipe(
                map((res: any) => {
                    Swal.fire(
                        'Hospital actualizado',
                        `El hospital con ID: "${res.hospital._id}" ha sido actualizado exitosamente.`,
                        'success'
                    );

                    return true;
                })
            );
    }

    buscarHospital(termino: string) {
        return this.http
            .get(
                `${environment.URL_SERVICIOS}/busqueda/coleccion/hospitales/${termino}`
            )
            .pipe(map((res: any) => res.hospitales));
    }
}
