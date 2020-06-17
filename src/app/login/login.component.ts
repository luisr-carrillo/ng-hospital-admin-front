import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';

declare function init_plugins(): any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    email: string;
    recordar = false;
    constructor(
        private router: Router,
        private usuarioService: UsuarioService
    ) {}

    ngOnInit(): void {
        init_plugins();
        if (localStorage.getItem('ngHospitalEmail')) {
            this.email = localStorage.getItem('ngHospitalEmail');
            this.recordar = true;
        }
    }

    ingresar(forma: NgForm): void {
        const { email, password, recordar } = forma.value;
        const usuario = new Usuario(null, email, password);

        this.usuarioService
            .iniciarSesion(usuario, recordar)
            .subscribe((valid) => this.router.navigate(['/dashboard']));
    }
}
