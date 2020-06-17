import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class SettingsService {
    ajustes: Ajustes = {
        temaUrl: 'assets/css/colors/default.css',
        tema: 'default',
    };

    constructor(@Inject(DOCUMENT) private document: any) {
        this.cargarAjustes();
    }

    guardarAjustes(): void {
        localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
    }

    cargarAjustes(): void {
        if (localStorage.getItem('ajustes')) {
            this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
        }
        this.aplicarTema(this.ajustes.tema);
    }

    aplicarTema(tema: string): void {
        const temaUrl = `assets/css/colors/${tema}.css`;
        this.document.getElementById('theme').setAttribute('href', temaUrl);
        this.ajustes = { temaUrl, tema };
        this.guardarAjustes();
    }
}

interface Ajustes {
    temaUrl: string;
    tema: string;
}
