import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Angular2TokenService } from 'angular2-token';

import { User } from '../user/user';
import { DataService } from '../data.service';

import { MyValidators } from '../shared/my-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../app.component.css', './register.component.css']
})
export class RegisterComponent  {
  complexForm : FormGroup;
  private newId: number;

  constructor(private tokenService: Angular2TokenService,
              fb: FormBuilder, private router: Router,
              private dataService: DataService) {
    this.complexForm = fb.group({
      'email' : [null, Validators.required],
      'password': [null, Validators.required],
      'confirmPassword': ''
    },
    {validator: MyValidators.matchingPasswords('password', 'confirmPassword')})
  }

  submitForm(value: any): boolean {
    this.tokenService.registerAccount({
        email:    value.email,
        password: value.password,
        passwordConfirmation: value.confirmPassword
    }).subscribe(
      res =>  {
        let json = res.json();
        this.newId = json.data.id;
        console.log("registered: \n" + JSON.stringify(json));
        this.tokenService.signIn({
            email:    value.email,
            password: value.password
        }).subscribe(
          res =>      {
            console.log(this.tokenService.currentUserData.email);
            console.log(res.json().data.id);
            this.router.navigate(['/user', this.newId]);
          },
          error => console.log(error)
        );
      },
      error => console.log(error)
    );
    return false;
  }
}
