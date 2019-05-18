import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material';
import { Observable } from 'rxjs';
import { AmplifyService } from 'aws-amplify-angular';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-autenticacion',
  templateUrl: './autenticacion.component.html',
  styleUrls: ['./autenticacion.component.scss']
})
export class AutenticacionComponent implements OnInit {
  showSignInCard = false;
  signUpForm: FormGroup;
  signInForm: FormGroup;
  labelOption: FloatLabelType = 'auto';
  signUpError: any;
  signInError: any;
  authState: Observable<string>;
  verificationCode = new FormControl('', {
    updateOn: 'change',
    validators: [Validators.required, Validators.pattern(/^\d{6}$/)]
  });
  signUpVerificationError: any;

  constructor(private amplifyService: AmplifyService) {
    this.signUpForm = this.getSignUpForm();
    this.authState = this.amplifyService.authStateChange$.pipe(map(authState => authState.state));
  }

  ngOnInit() {}

  getSignUpForm(): FormGroup {
    return new FormGroup(
      {
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        attributes: new FormGroup({
          email: new FormControl('', [
            Validators.required,
            Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
          ]),
          phone_number: new FormControl('', [
            Validators.required,
            Validators.pattern(/\d{4}[-\s]?\d{4}$/)
          ])
        })
      },
      { updateOn: 'blur' }
    );
  }

  get username(): AbstractControl {
    return this.signUpForm.get('username');
  }
  get password(): AbstractControl {
    return this.signUpForm.get('password');
  }
  get email(): AbstractControl {
    return this.signUpForm.get(['attributes', 'email']);
  }
  get phone(): AbstractControl {
    return this.signUpForm.get(['attributes', 'phone_number']);
  }
  // campos para el formulario de SignIn/ingreso

  get usernameSignIn(): AbstractControl {
    return this.signInForm && this.signInForm.get('usernameSignIn');
  }

  get passwordSignIn(): AbstractControl {
    return this.signInForm && this.signInForm.get('passwordSignIn');
  }

  /* start signUp submition */
  signUpSubmit(): void {
    if (this.signUpForm.invalid) {
      return;
    }
    const signUpUser = {
      ...this.signUpForm.value,
      attributes: { email: this.email.value, phone_number: `+502${this.phone.value}` }
    };
    console.log('sign up user: ', signUpUser);
    this.amplifyService
      .auth()
      .signUp(signUpUser)
      .then(user => {
        console.log('User from Auth: ', user);
        this.amplifyService.setAuthState({
          state: 'confirmSignUP',
          user: { username: this.username }
        });
      })
      .catch(err => {
        console.log('Error Signup: ', err);
        this.signUpError = err;
      });
  }
  /* verificar el codigo enviado email/sms */
  verificarSignUp() {
    if (this.verificationCode.invalid) {
      return;
    }
    this.amplifyService
      .auth()
      .confirmSignUp(this.username.value, this.verificationCode.value)
      .then(user => {
        console.log('exito confirmando registro de usuario: ', user);
        this.amplifyService.setAuthState({ state: 'confirmSignIn', user });
        this.startSignIn();
      })
      .catch(err => (this.signUpVerificationError = err));
  }
  /* despues de verificar el registro SignUP iniciar formulario para SignIn */
  startSignIn() {
    // si el usuario ya ingreso usuario y passoword intentar SignIn automatico
    if (this.username.value && this.password.value) {
      this.amplifyService
        .auth()
        .signIn(this.username.value, this.password.value)
        .then(user => {
          console.log('User-SignIn: ', user);
          if (user.challengeName === 'SMS_MFA' || user.challengeName === 'SOFTWARE_TOKEN_MFA') {
            console.log('Usuario necesita ingresar codigo por SMS (pendiente)');
            this.amplifyService.setAuthState({ state: 'confirmSignIn', user });
          } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
            console.log('Usuario necesita cambiar password(pendiente)');
            this.amplifyService.setAuthState({ state: 'requireNewPassword', user });
          } else {
            this.amplifyService.setAuthState({ state: 'signedIn', user });
          }
        });
    } else {
      this.startSignInForm();
    }
  }
  startSignInForm() {
    this.signInForm = new FormGroup(
      {
        usernameSignIn: new FormControl('', [Validators.required]),
        passwordSignIn: new FormControl('', [Validators.required])
      },
      { updateOn: 'change' }
    );
    this.showSignInCard = true;
  }
  signInSubmit() {
    if (this.signInForm.invalid) {
      return;
    }
    this.amplifyService
      .auth()
      .signIn(this.usernameSignIn.value, this.passwordSignIn.value)
      .then(user => {
        console.log('user sign-in: ', user);
        if (user.challengeName === 'SMS_MFA' || user.challengeName === 'SOFTWARE_TOKEN_MFA') {
          this.amplifyService.setAuthState({ state: 'confirmSignIn', user });
        } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          this.amplifyService.setAuthState({ state: 'requireNewPassword', user });
        } else {
          this.amplifyService.setAuthState({ state: 'signedIn', user });
          this.signInError = null;
        }
      })
      .catch(err => {
        this.signInError = err;
      });
  }
}
