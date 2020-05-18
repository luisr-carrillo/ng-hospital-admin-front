import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-promesas',
    templateUrl: './promesas.component.html',
    styles: [],
})
export class PromesasComponent implements OnInit {
    constructor() {
        const promesa = new Promise((resolve, reject) => {
            let contador = 0;
            const interval = setInterval(() => {
                contador += 1;
                console.log(contador);
                if (contador === 3) {
                    resolve();
                    clearInterval(interval);
                }
            }, 1000);
        });

        promesa
            .then(() => console.log('Termino la promesa'))
            .catch((error) => console.error('Error de promesa:', error));
    }

    ngOnInit(): void {}
}
