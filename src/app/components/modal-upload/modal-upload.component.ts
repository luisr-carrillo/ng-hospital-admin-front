import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
} from '@angular/core';
import Swal from 'sweetalert2';
import { SubirArchivoService } from 'src/app/services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

declare const $: any;

@Component({
    selector: 'app-modal-upload',
    templateUrl: './modal-upload.component.html',
})
export class ModalUploadComponent implements OnInit {
    @ViewChild('input') inputElement: ElementRef;
    imagenSubir: File;
    imagenTemp: string | ArrayBuffer;
    imagenPreviewUrl: string;

    constructor(
        private subirArchivoService: SubirArchivoService,
        public modalUploadService: ModalUploadService
    ) {}
    ngOnInit(): void {
        this.modalUploadService.imagenPreview.subscribe((res: any) => {
            this.imagenPreviewUrl = res;
        });
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

    cerrarModal() {
        this.imagenSubir = null;
        this.imagenTemp = null;
        this.inputElement.nativeElement.value = null;
        this.modalUploadService.limpiarDatos();
        $('#modalUpload').modal('hide');
    }

    subirImagen() {
        this.subirArchivoService
            .subirArchivos(
                this.imagenSubir,
                this.modalUploadService.tipo,
                this.modalUploadService.id
            )
            .then((res: any) => {
                this.modalUploadService.notificacion.emit(res);
                this.cerrarModal();
            })
            .catch((error: any) => {
                console.error('ModalUploadComponent|subirImagen():', error);
            });
    }
}
