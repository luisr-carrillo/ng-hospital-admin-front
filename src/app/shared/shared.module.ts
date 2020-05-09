import { NgModule } from '@angular/core';

import { NopagefoundComponent } from '../shared/nopagefound/nopagefound.component';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { BreadcrumbsComponent } from '../shared/breadcrumbs/breadcrumbs.component';

@NgModule({
    declarations: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        NopagefoundComponent,
    ],
    exports: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        NopagefoundComponent,
    ],
})
export class SharedModule {}
