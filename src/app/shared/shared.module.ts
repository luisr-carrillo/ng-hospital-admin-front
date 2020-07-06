import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NopagefoundComponent } from '../shared/nopagefound/nopagefound.component';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { BreadcrumbsComponent } from '../shared/breadcrumbs/breadcrumbs.component';
import { PipesModule } from '../pipes/pipes.module';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';

@NgModule({
    declarations: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        NopagefoundComponent,
        ModalUploadComponent,
    ],
    imports: [CommonModule, RouterModule, PipesModule],
    exports: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        NopagefoundComponent,
        ModalUploadComponent,
    ],
})
export class SharedModule {}
