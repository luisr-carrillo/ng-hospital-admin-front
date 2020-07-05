import {Routes, RouterModule} from '@angular/router';
import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProgressComponent} from './progress/progress.component';
import {Graphics1Component} from './graphics1/graphics1.component';
import {NgModule} from '@angular/core';
import {AccountSettingsComponent} from './account-settings/account-settings.component';
import {PromesasComponent} from './promesas/promesas.component';
import {RxjsComponent} from './rxjs/rxjs.component';
import {LoginGuardGuard} from '../services/guards/login-guard.guard';
import {ProfileComponent} from './profile/profile.component';
import {UsuariosComponent} from './usuarios/usuarios.component';
import {HospitalesComponent} from './hospitales/hospitales.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
                data: {titulo: 'Dashboard'},
            },
            {
                path: 'progress',
                component: ProgressComponent,
                data: {titulo: 'Progress'},
            },
            {
                path: 'graphics1',
                component: Graphics1Component,
                data: {titulo: 'Graficas'},
            },
            {
                path: 'promesas',
                component: PromesasComponent,
                data: {titulo: 'Promesas'},
            },
            {
                path: 'rxjs',
                component: RxjsComponent,
                data: {titulo: 'RxJS'},
            },
            {
                path: 'account-settings',
                component: AccountSettingsComponent,
                data: {titulo: 'Configuración'},
            },
            {
                path: 'profile',
                component: ProfileComponent,
                data: {titulo: 'Perfil de Usuario'},
            },

            // Mantenimientos
            {
                path: 'usuarios',
                component: UsuariosComponent,
                data: {titulo: 'Mantenimiento de Usuarios'},
            },
            {
                path: 'hospitales',
                component: HospitalesComponent,
                data: {titulo: 'Mantenimiento de Hospitales'},
            },

            // Redirect
            {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(pagesRoutes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {
}
