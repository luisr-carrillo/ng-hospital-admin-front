import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    ElementRef,
} from '@angular/core';

@Component({
    selector: 'app-incrementador',
    templateUrl: './incrementador.component.html',
    styles: [],
})
export class IncrementadorComponent implements OnInit {
    @ViewChild('txtProgress') txtProgreso: ElementRef;

    @Input() leyenda: string = 'Leyenda';
    @Input() progreso: number = 50;

    @Output() cambiaValorProgreso: EventEmitter<number> = new EventEmitter();

    constructor() {}

    ngOnInit(): void {}

    inputOnChange(newValue: number) {
        if (!Number.isInteger(newValue) || newValue <= 0) {
            this.progreso = 0;
        } else if (newValue >= 100) {
            this.progreso = 100;
        } else {
            this.progreso = newValue;
        }

        this.txtProgreso.nativeElement.value = Number(this.progreso);
        this.cambiaValorProgreso.emit(this.progreso);
    }

    cambiarValor(valor: number): void {
        if (
            (this.progreso >= 100 && valor > 0) ||
            (this.progreso <= 0 && valor < 0)
        ) {
            return;
        } else {
            this.progreso += valor;
            this.cambiaValorProgreso.emit(this.progreso);
        }

        this.txtProgreso.nativeElement.focus();
    }
}
