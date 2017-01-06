import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Angular2TokenService } from 'angular2-token';

import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./users.css']
})
export class UserComponent implements OnInit {
  public component = this;
  public user: User;
  public form : FormGroup;

  constructor(private tokenService: Angular2TokenService,
              private userService: UserService,
              fb: FormBuilder) {
                this.form = fb.group({
                  'first_name' : [null, Validators.required],
                  'last_name' : [null, Validators.required]
                })
              }

  ngOnInit() {
    this.userService.show(1)
    .subscribe( data => {
      this.user = data.json() as User;
      this.form.patchValue({
        first_name: this.user.first_name,
        last_name: this.user.last_name
      })
      console.log(JSON.stringify(this.user));
    });
  }

  submitForm(value: any): void {
    this.userService.update(this.user.id, {
        first_name: value.first_name,
        last_name: value.last_name
    }).subscribe(
      res =>      {
        console.log("update successful");
      },
      error => console.log(error)
    );
  }
}

  // this.userService.show(1);
  // this.userService.create({email: "x18@null.com", first_name: "x0", password: "password", role: "admin"});
  // this.userService.update(1, {first_name: 'blah14'});
