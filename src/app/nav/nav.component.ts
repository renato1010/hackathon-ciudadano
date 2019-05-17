import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AmplifyService, AuthState } from 'aws-amplify-angular/dist/src/providers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  authState: Observable<AuthState>;
  estaLogeado: Observable<boolean>;
  usuario: Observable<any>;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));
  title = 'Ciudadano 2019';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private amplifyService: AmplifyService,
    private router: Router
  ) {
    this.authState = amplifyService.authStateChange$;
    this.estaLogeado = this.authState.pipe(map(authState => authState.state === 'signedIn'));
    this.usuario = this.authState.pipe(map(authState => authState.user || null));
  }
  goToAuth() {
    this.router
      .navigate(['ingresar'])
      .then(() => console.log('re-direccionando al ingreso autorizado'));
  }
  logout() {
    // logging out
    console.log('logging out');
  }
}
