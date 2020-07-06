import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
    providedIn: 'root',
})
export class VerificaTokenGuard implements CanActivate {
    constructor(
        private usuarioService: UsuarioService,
        private router: Router
    ) {}
    canActivate(): Promise<boolean> | boolean {
        const token = this.usuarioService.token;
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expirado = this.tokenExpirado(payload.exp);

        if (expirado) {
            this.router.navigate(['/login']);
            return false;
        } else {
            return this.verificaRenuevaToken(payload.exp);
        }
    }

    tokenExpirado(fecha: number): boolean {
        const now = new Date().getTime() / 1000;

        return fecha < now;
    }

    verificaRenuevaToken(fecha: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const tokenExp = new Date(fecha * 1000);
            const now = new Date();

            now.setTime(now.getTime() + 4 * 60 * 60 * 1000);

            if (tokenExp.getTime() > now.getTime()) {
                resolve(true);
            } else {
                this.usuarioService.renuevaToken().subscribe(
                    (res: boolean) => resolve(true),
                    (err: any) => {
                        this.router.navigate(['/login']);
                        reject(false);
                    }
                );
            }
        });
    }
}
