import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Medico } from 'src/app/models/medico.model';
import { Hospital } from 'src/app/models/hospital.model';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
    selector: 'app-busqueda',
    templateUrl: './busqueda.component.html',
    styles: [],
})
export class BusquedaComponent implements OnInit {
    usuarios: Usuario[] = [];
    medicos: Medico[] = [];
    hospitales: Hospital[] = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        private http: HttpClient
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params: any) => {
            const { termino } = params;
            this.buscar(termino);
        });
    }

    buscar(termino: string) {
        const url = `${environment.URL_SERVICIOS}/busqueda/todo/${termino}`;

        this.http.get(url).subscribe((res: any) => {
            this.usuarios = res.data.usuarios;
            this.medicos = res.data.medicos;
            this.hospitales = res.data.hospitales;
        });
    }
}
