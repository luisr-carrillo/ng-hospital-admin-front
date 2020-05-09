import { NgModule } from '@angular/core';

import { PagesRoutingModule } from './pages.routes';
import { SharedModule } from '../shared/shared.module';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { ProgressComponent } from '../pages/progress/progress.component';
import { Graphics1Component } from '../pages/graphics1/graphics1.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graphics1Component,
    ],
    imports: [SharedModule, PagesRoutingModule],
    exports: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graphics1Component,
    ],
})
export class PagesModule {}
