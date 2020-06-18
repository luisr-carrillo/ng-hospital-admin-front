import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class SubirArchivoService {
    constructor(private http: HttpClient) {}

    subirArchivos(archivo: File, tipo: string, id: string) {
        const formData = new FormData();
        const xhr = new XMLHttpRequest();

        formData.append('imagen', archivo, archivo.name);

        return new Promise((resolve, reject) => {
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(JSON.parse(xhr.response));
                    }
                }
            };

            const url = `${environment.URL_SERVICIOS}/upload/${tipo}/${id}`;
            xhr.open('PUT', url, true);
            xhr.send(formData);
        });
    }

    fileUpload(fileItem: File, tipo: string, id: string) {
        const url = `${environment.URL_SERVICIOS}/upload/${tipo}/${id}`;
        const formData: FormData = new FormData();
        formData.append('imagen', fileItem, fileItem.name);
        return this.http.put(url, formData, { reportProgress: true });
    }
}
