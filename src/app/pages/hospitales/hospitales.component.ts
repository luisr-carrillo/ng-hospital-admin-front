import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { HospitalService } from 'src/app/services/hospital/hospital.service';
import Swal from 'sweetalert2';
import { Usuario } from '../../models/usuario.model';

declare const $: any;

@Component({
    selector: 'app-hospitales',
    templateUrl: './hospitales.component.html',
    styleUrls: ['./hospitales.component.css'],
})
export class HospitalesComponent implements OnInit {
    hospitales: Hospital[] = [];
    cargando: boolean;
    desde = 0;
    totalRegistros = 0;

    constructor(
        private hospitalService: HospitalService,
        private modalUploadService: ModalUploadService
    ) {}

    ngOnInit(): void {
        this.cargarHospitales();
        this.modalUploadService.notificacion.subscribe((res: any) => {
            this.cargarHospitales();
        });
    }

    cargarHospitales(): void {
        this.cargando = true;

        this.hospitalService
            .cargarHospitales(this.desde)
            .subscribe((res: any) => {
                this.totalRegistros = res.total;
                this.hospitales = res.hospitales;
                this.cargando = false;
            });
    }

    agregarHospital() {
        Swal.fire({
            title: 'Crear nuevo hospital',
            text: `Ingrese el nombre del nuevo hospital:`,
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off',
            },
            showCancelButton: true,
            confirmButtonColor: '#398bf7',
            cancelButtonColor: '#ef5350',
            confirmButtonText: 'Crear hospital',
            cancelButtonText: 'Cancelar',
        }).then((result: any) => {
            if (result.value) {
                this.hospitalService
                    .crearHospital(result.value)
                    .subscribe((res: any) => {
                        this.desde = 0;
                        this.totalRegistros = 0;
                        this.cargarHospitales();
                    });
            }
        });
    }

    borrarHospital(hospital: Hospital) {
        Swal.fire({
            title: '¿Seguro que desea eliminar el hospital?',
            text: `Se va a eliminar el hospital "${hospital.nombre}", esta acción no se podrá revertir.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#398bf7',
            cancelButtonColor: '#ef5350',
            confirmButtonText: 'Sí, eliminar el hospital',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.value) {
                this.hospitalService
                    .borrarHospital(hospital._id)
                    .subscribe((res: any) => {
                        this.desde = 0;
                        this.totalRegistros = 0;
                        this.cargarHospitales();
                    });
            }
        });
    }

    guardarHospital(hospital: Hospital, nuevoNombre: string) {
        if (hospital.nombre === nuevoNombre) {
            return;
        }
        const nuevoHospital = { ...hospital, nombre: nuevoNombre };

        this.hospitalService
            .actualizarHospital(nuevoHospital)
            .subscribe((res: any) => {
                this.cargarHospitales();
            });
    }

    buscarHospital(termino: string) {
        if (termino.length <= 0) {
            this.cargarHospitales();
            return;
        }
        this.cargando = true;
        this.hospitalService
            .buscarHospital(termino)
            .subscribe((hospitales: Hospital[]) => {
                this.hospitales = hospitales;
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
        this.cargarHospitales();
    }

    cambiarImagen(hospital: Hospital) {
        this.modalUploadService.mostrarModal('hospitales', hospital._id);
        this.modalUploadService.imagenUsuario.emit(hospital.img);
        $('#modalUpload').modal('show');
    }
}
