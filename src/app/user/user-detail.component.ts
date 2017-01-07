import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Angular2TokenService } from 'angular2-token';

import { User } from './user';
import { UserService } from './user.service';

import { MyValidators } from '../shared/my-validators';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['../app.component.css', './user.css']
})
export class UserDetailComponent implements OnInit {
  public component = this;
  public id: number;
  public user: User;
  public form : FormGroup;

  constructor(private tokenService: Angular2TokenService,
              private userService: UserService,
              private route: ActivatedRoute,
              fb: FormBuilder) {
                this.form = fb.group({
                  'first_name' : [null, Validators.required],
                  'last_name' : [null, Validators.required],
                  'email' :  [null, [Validators.required, MyValidators.mailFormat]],
                  'password' : '',
                  'confirmPassword': ''
                })
              }

  ngOnInit() {
    /////
    //https://angular-2-training-book.rangle.io/handout/routing/routeparams.html
    //The reason that the params property on ActivatedRoute is an Observable is that
    //the router may not recreate the component when navigating to the same component.
    // In this case the parameter may change without the component being recreated.
    /////
    this.route.params.subscribe(params => {
      this.userService.show(+params['id'])
      .subscribe( data => {
        this.user = data.json() as User;
        this.form.patchValue({
          first_name: this.user.first_name,
          last_name: this.user.last_name
        })
        console.log(JSON.stringify(this.user));
      });
    })
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