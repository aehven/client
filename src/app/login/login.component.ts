import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  complexForm : FormGroup;

  constructor(private tokenService: Angular2TokenService, fb: FormBuilder) {
    this.complexForm = fb.group({
      'email' : [null, Validators.required],
      'password': [null, Validators.required]
    })
  }

  submitForm(value: any): void {
    this.tokenService.signIn({
        email:    value.email,
        password: value.password
    }).subscribe(
      res =>      {
        console.log(this.tokenService.currentUserData.email);
      },
      error => console.log(error)
    );
  }
}
