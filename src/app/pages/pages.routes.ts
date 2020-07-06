import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphics1Component } from './graphics1/graphics1.component';
import { NgModule } from '@angular/core';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuard } from '../services/guards/login-guard.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../services/guards/admin.guard';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';

const pagesRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [VerificaTokenGuard],
        data: { titulo: 'Dashboard' },
    },
    {
        path: 'progress',
        component: ProgressComponent,
        data: { titulo: 'Progress' },
    },
    {
        path: 'graphics',
        component: Graphics1Component,
        data: { titulo: 'Graficas' },
    },
    {
        path: 'promesas',
        component: PromesasComponent,
        data: { titulo: 'Promesas' },
    },
    {
        path: 'rxjs',
        component: RxjsComponent,
        data: { titulo: 'RxJS' },
    },
    {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: { titulo: 'Configuración' },
    },
    {
        path: 'profile',
        component: ProfileComponent,
        data: { titulo: 'Perfil de Usuario' },
    },
    {
        path: 'busqueda/:termino',
        component: BusquedaComponent,
        data: { titulo: 'Buscador' },
    },

    // Mantenimientos
    {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [AdminGuard],
        data: { titulo: 'Mantenimiento de Usuarios' },
    },
    {
        path: 'hospitales',
        component: HospitalesComponent,
        data: { titulo: 'Mantenimiento de Hospitales' },
    },
    {
        path: 'medicos',
        component: MedicosComponent,
        data: { titulo: 'Mantenimiento de Medicos' },
    },
    {
        path: 'medico/:id',
        component: MedicoComponent,
        data: { titulo: 'Administración de Medico' },
    },

    // Redirect
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(pagesRoutes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {}
