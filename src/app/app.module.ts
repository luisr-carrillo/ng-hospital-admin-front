import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app.routes';
// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

// Modulos
import { PagesModule } from './pages/pages.module';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';
@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        PagesComponent,
    ],
    imports: [
        BrowserModule,
        // PagesModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        SharedModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
