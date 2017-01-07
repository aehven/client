import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css', './login.component.css']
})
export class LoginComponent  {
  complexForm : FormGroup;

  constructor(private tokenService: Angular2TokenService,
              fb: FormBuilder, private router: Router) {
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
        this.router.navigate(['/users']);
      },
      error => console.log(error)
    );
  }

  register(value: any): boolean {
    this.tokenService.registerAccount({
        email:    value.email,
        password: value.password,
        passwordConfirmation: value.password
    }).subscribe(
      res =>      {
        this.router.navigate(['/users']);
      },
      error => console.log(error)
    );
    return false;
  }
}
