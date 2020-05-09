import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { RegisterComponent } from './login/register.component';
import { PagesModule } from './pages/pages.module';

@NgModule({
    declarations: [AppComponent, LoginComponent, RegisterComponent],
    imports: [BrowserModule, PagesModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
