import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material';

@Component({
  selector: 'app-autenticacion',
  templateUrl: './autenticacion.component.html',
  styleUrls: ['./autenticacion.component.scss']
})
export class AutenticacionComponent implements OnInit {
  signUpForm: FormGroup;
  labelOption: FloatLabelType = 'auto';

  constructor() {
    this.signUpForm = this.getSignUpForm();
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

  /* start signUp submition */
  signUpSubmit(): void {
    if (this.signUpForm.invalid) {
      return;
    }
    const signUpObj = {
      ...this.signUpForm.value,
      attributes: { phone_number: `502${this.phone.value}` }
    };
    console.log('SignUp Value: ', signUpObj);
  }
}
