import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';
import { environment } from 'src/environments/environment';

declare function init_plugins(): any;
declare const gapi: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    email: string;
    recordar = false;

    auth2: any;
    googleUser: any;

    constructor(
        private router: Router,
        private usuarioService: UsuarioService,
        private ngZone: NgZone
    ) {}

    ngOnInit(): void {
        init_plugins();
        this.googleInit();
        if (localStorage.getItem('ngHospitalEmail')) {
            this.email = localStorage.getItem('ngHospitalEmail');
            this.recordar = true;
        }
    }

    googleInit() {
        gapi.load('auth2', () => {
            this.auth2 = gapi.auth2.init({
                client_id: environment.GOOGLE_AUTH_API,
                cookiepolicy: 'single_host_origin',
                scope: 'profile email',
            });

            this.attachSignin(document.getElementById('btn-google'));
        });
    }

    attachSignin(element: any) {
        this.auth2.attachClickHandler(element, {}, (googleUser: any) => {
            // const profile = googleUser.getBasicProfile();
            const token = googleUser.getAuthResponse().id_token;

            this.usuarioService
                .googleAuth(token)
                .subscribe(() =>
                    this.ngZone.run(() => this.router.navigate(['/dashboard']))
                );
        });
    }

    ingresar(forma: NgForm): void {
        const { email, password, recordar } = forma.value;
        const usuario = new Usuario(null, email, password);

        this.usuarioService
            .iniciarSesion(usuario, recordar)
            .subscribe(() => this.router.navigate(['/dashboard']));
    }
}
