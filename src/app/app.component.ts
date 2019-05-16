import { Component } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import { AuthState } from 'aws-amplify-angular/dist/src/providers';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  authState: Observable<AuthState>;
  estaLogeado: Observable<boolean>;
  usuario: Observable<any>;
  title: 'Ciudadano 2019';

  constructor(private amplifyService: AmplifyService) {
    this.authState = amplifyService.authStateChange$;
    this.estaLogeado = this.authState.pipe(map(authState => authState.state === 'signedIn'));
    this.usuario = this.authState.pipe(map(authState => authState.user));
  }
}
