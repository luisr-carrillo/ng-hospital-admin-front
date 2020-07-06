// Librerias
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ChartsModule } from 'ng2-charts';

// Componentes
import { PagesComponent } from './pages.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { ProgressComponent } from '../pages/progress/progress.component';
import { Graphics1Component } from '../pages/graphics1/graphics1.component';

import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';

// Modulos
import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../pipes/pipes.module';

// Otros
import { PagesRoutingModule } from './pages.routes';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

@NgModule({
    declarations: [
        // PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graphics1Component,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsuariosComponent,
        // ModalUploadComponent,
        HospitalesComponent,
        MedicosComponent,
        MedicoComponent,
        BusquedaComponent,
    ],
    imports: [
        CommonModule,
        PipesModule,
        SharedModule,
        FormsModule,
        ChartsModule,
        PagesRoutingModule,
    ],
    exports: [
        // PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graphics1Component,
    ],
})
export class PagesModule {}
