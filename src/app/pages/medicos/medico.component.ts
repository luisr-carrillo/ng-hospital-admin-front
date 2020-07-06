import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/medico/medico.service';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital/hospital.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-medico',
    templateUrl: './medico.component.html',
    styles: [],
})
export class MedicoComponent implements OnInit {
    medico: Medico = new Medico('', '', '', '', '');
    hospitales: Hospital[] = [];
    hospital: Hospital = new Hospital('');
    imagenSubir: File;
    imagenTemp: string | ArrayBuffer;
    actualizacionMedico: boolean;

    constructor(
        private medicoService: MedicoService,
        private hospitalService: HospitalService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params: any) => {
            const id = params?.id;
            if (id !== 'nuevo') {
                this.actualizacionMedico = true;
                this.cargarMedico(id);
            }
        });
        this.hospitalService
            .cargarHospitales()
            .subscribe((res: any) => (this.hospitales = res.hospitales));
    }

    cargarMedico(id: string) {
        this.medicoService.obtenerMedico(id).subscribe((res: Medico) => {
            this.medico = res;
            this.medico.hospital = res.hospital['_id'];
            this.cambioHospital(this.medico.hospital);
        });
    }

    guardarMedico(form: NgForm) {
        if (form.valid) {
            if (this.actualizacionMedico) {
                this.medicoService
                    .actualizarMedico(this.medico)
                    .subscribe();
            } else {
                this.medicoService
                    .crearMedico(this.medico)
                    .subscribe((res: Medico) => {
                        this.medico._id = res._id;
                        this.router.navigate(['/medico', res._id]);
                    });
            }
        }
    }

    seleccionImagen(archivo: File) {
        if (!archivo) {
            this.imagenSubir = null;
            return;
        }

        if (archivo.type.indexOf('image') < 0) {
            Swal.fire(
                'Tipo de imagen invalido',
                `Solamente se admiten archivos de tipo imagen: png, jpg y jpeg.`,
                'error'
            );
            this.imagenSubir = null;
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(archivo);
        reader.onloadend = () => (this.imagenTemp = reader.result);

        this.imagenSubir = archivo;
    }

    cambiarImagen() {
        this.medicoService.actualizarImagen(this.imagenSubir, this.medico._id);
    }

    cambioHospital(id: string) {
        this.hospitalService.obtenerHospital(id).subscribe((res: any) => {
            this.hospital = res.hospital;
        });
    }
}
