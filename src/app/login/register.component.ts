import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';

declare function init_plugins(): any;

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./login.component.css'],
})
export class RegisterComponent implements OnInit {
    forma: FormGroup;
    tycError = false;

    constructor(
        private usuarioService: UsuarioService,
        private router: Router
    ) {}

    ngOnInit(): void {
        init_plugins();

        this.forma = new FormGroup(
            {
                nombre: new FormControl(null, Validators.required),
                email: new FormControl(null, [
                    Validators.required,
                    Validators.email,
                ]),
                password: new FormControl(null, Validators.required),
                passwordValid: new FormControl(null, Validators.required),
                tyc: new FormControl(false),
            },
            {
                validators: this.valoresIguales('password', 'passwordValid'),
            }
        );
    }

    valoresIguales(campo1: string, campo2: string) {
        return (group: FormGroup) => {
            const pass1 = group.controls[campo1].value;
            const pass2 = group.controls[campo2].value;

            return pass1 === pass2 ? null : { valoresIguales: true };
        };
    }

    registrarUsuario(): void {
        if (this.forma.invalid) {
            return;
        }

        if (!this.forma.value.tyc) {
            this.tycError = true;
            return;
        }

        const { nombre, email, password } = this.forma.value;
        const usuario = new Usuario(nombre, email, password);

        this.usuarioService
            .crearUsuario(usuario)
            .subscribe((res) => this.router.navigate(['/login']));
    }
}
