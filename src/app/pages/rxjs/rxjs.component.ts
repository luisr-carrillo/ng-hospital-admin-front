import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
    selector: 'app-rxjs',
    templateUrl: './rxjs.component.html',
    styles: [],
})
export class RxjsComponent implements OnInit, OnDestroy {
    subscription: Subscription;

    constructor() {
        this.subscription = this.returnObs()
            .pipe()
            .subscribe(
                (numero: number) => console.log('Subscribe:', numero), // observer.next()
                (error) => console.error('Subs error:', error), // observer.error()
                () => console.log('Observador terminado')
            );
    }

    ngOnInit(): void {}

    ngOnDestroy(): void {
        console.log('RxjsComponent fue cerrado');
        this.subscription.unsubscribe();
    }

    returnObs(): Observable<any> {
        return new Observable((observer) => {
            let contador = 0;

            const interval = setInterval(() => {
                contador++;

                const salida = {
                    valor: contador,
                };

                observer.next(salida);
                /* if (contador === 3) {
                    clearInterval(interval);
                    observer.complete();
                } */
            }, 1000);
        }).pipe(
            map((res: { valor: number }) => res.valor),
            filter((valor: number) => valor % 2 === 1)
        );
    }
}
