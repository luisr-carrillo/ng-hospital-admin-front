import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
    selector: 'app-account-settings',
    templateUrl: './account-settings.component.html',
    styles: [],
})
export class AccountSettingsComponent implements OnInit {
    constructor(private settings: SettingsService) {}

    ngOnInit(): void {
        this.colocarCheck();
    }

    cambiarTema(tema: string, link: any): void {
        this.aplicarCheck(link);
        this.settings.aplicarTema(tema);
    }

    aplicarCheck(link: any): void {
        const selectores: any = document.getElementsByClassName('selector');
        for (const ref of selectores) {
            ref.classList.remove('working');
        }
        link.classList.add('working');
    }

    colocarCheck() {
        const tema = this.settings.ajustes.tema;
        const selectores: any = document.getElementsByClassName('selector');
        for (const ref of selectores) {
            if (ref.getAttribute('data-theme') === tema) {
                ref.classList.add('working');
                break;
            }
        }
    }
}
