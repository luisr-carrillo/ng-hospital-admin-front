import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
    name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
    transform(img: string, tipo: string = 'usuario'): unknown {
        const url = `${environment.URL_SERVICIOS}/img`;

        if (!img) {
            return `${url}/no-img/404`;
        }

        if (img.indexOf('https') >= 0) {
            return img;
        }

        switch (tipo) {
            case 'usuario':
                return `${url}/usuarios/${img}`;

            case 'medico':
                return `${url}/medicos/${img}`;

            case 'hospitales':
                return `${url}/hospitales/${img}`;

            default:
                return `${url}/no-img/404`;
        }
    }
}
