import { Component, OnInit } from '@angular/core';

import { Angular2TokenService } from 'angular2-token';

import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app works!!!';
  signedIn = false;
  apiPath = "http://linode.binarytrees.biz:3000";

  currentUser = null;

  constructor(private tokenService: Angular2TokenService, private userService: UserService) {}

  ngOnInit(): void {
    this.tokenService.init({
        apiPath: this.apiPath
    });

    this.tokenService.signIn({
        email:    'a0@null.com',
        password: 'password'
    }).subscribe(
      res =>      {
        this.currentUser = JSON.stringify(res.json().data.email);
        console.log("signIn: " + res);
        console.log("signIn: \n" + JSON.stringify(this.currentUser));

        this.userService.index();

        this.userService.show(1);

        this.userService.create({email: "x18@null.com", first_name: "x0", password: "password", role: "admin"});

        this.userService.update(1, {first_name: 'blah14'});
      },
      error => console.log(error)
    );
  }
}
