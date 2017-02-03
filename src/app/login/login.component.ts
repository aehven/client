import { environment } from '../../environments/environment';

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Angular2TokenService } from 'angular2-token';

import { User } from '../user/user';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css', './login.component.css']
})
export class LoginComponent  {
  complexForm : FormGroup;

  constructor(private tokenService: Angular2TokenService,
              fb: FormBuilder, private router: Router,
              private dataService: DataService) {
    this.complexForm = fb.group({
      'email' : [environment.demoUser, Validators.required],
      'password': [environment.demoPassword, Validators.required]
    })
  }

  submitForm(value: any): void {
    this.tokenService.signIn({
        email:    value.email,
        password: value.password
    }).subscribe(
      res =>      {
        let u = res.json().data as User;
        if(u.role == "regular") {
          this.router.navigate(['/user', u.id]);
        }
        else {
          this.router.navigate(['/users']);
        }
      },
      error => console.log(error)
    );
  }
}
