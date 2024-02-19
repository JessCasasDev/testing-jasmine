import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PruebasBasicasComponent } from './pruebas-basicas/pruebas-basicas.component';
import { PadreComponent } from './prueba-padre-hijo/padre/padre.component';
import { HijoComponent } from './prueba-padre-hijo/hijo/hijo.component';
import { PruebaObservablesComponent } from './prueba-observables/prueba-observables.component';
import { PruebaDirectivaDirective } from './prueba-directiva/prueba-directiva.directive';

@NgModule({
  declarations: [
    AppComponent,
    PruebasBasicasComponent,
    PadreComponent,
    HijoComponent,
    PruebaObservablesComponent,
    PruebaDirectivaDirective,
  ],
  imports: [BrowserModule, ReactiveFormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
