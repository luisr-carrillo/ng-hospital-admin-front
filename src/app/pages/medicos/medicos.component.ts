import { Component, OnInit } from '@angular/core';
import { MedicoService } from 'src/app/services/medico/medico.service';
import { Medico } from 'src/app/models/medico.model';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-medicos',
    templateUrl: './medicos.component.html',
    styles: [],
})
export class MedicosComponent implements OnInit {
    medicos: Medico[] = [];
    cargando: boolean;
    desde = 0;
    totalRegistros = 0;

    constructor(private medicosService: MedicoService) {}

    ngOnInit(): void {
        this.cargarMedicos();
    }

    cargarMedicos(): void {
        this.cargando = true;

        this.medicosService.cargarMedicos(this.desde).subscribe((res: any) => {
            this.totalRegistros = res.total;
            this.medicos = res.medicos;
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
        this.cargarMedicos();
    }

    buscarMedicos(termino: string) {
        if (termino.length <= 0) {
            this.cargarMedicos();
            return;
        }
        this.cargando = true;
        this.medicosService
            .buscarMedicos(termino)
            .subscribe((medicos: Medico[]) => {
                this.medicos = medicos;
                this.cargando = false;
            });
    }

    borrarMedico(medico: Medico) {
        Swal.fire({
            title: '¿Seguro que desea eliminar el medico?',
            text: `Se va a eliminar el medico "${medico.nombre}", esta acción no se podrá revertir.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#398bf7',
            cancelButtonColor: '#ef5350',
            confirmButtonText: 'Sí, eliminar el medico',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.value) {
                this.medicosService
                    .borrarMedico(medico._id)
                    .subscribe((res: any) => {
                        this.desde = 0;
                        this.totalRegistros = 0;
                        this.cargarMedicos();
                    });
            }
        });
    }
}
