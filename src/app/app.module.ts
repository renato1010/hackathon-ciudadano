import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule
} from '@angular/material';
import { AmplifyAngularModule, AmplifyModules, AmplifyService } from 'aws-amplify-angular';
import { Auth } from 'aws-amplify';
import { PaginaNoEncontradaComponent } from './pagina-no-encontrada/pagina-no-encontrada.component';
import { InicioComponent } from './inicio/inicio.component';
import { AutenticacionComponent } from './autenticacion/autenticacion.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PaginaNoEncontradaComponent,
    InicioComponent,
    AutenticacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    AmplifyAngularModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ],
  providers: [
    {
      provide: AmplifyService,
      useFactory: () => {
        return AmplifyModules({ Auth });
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
