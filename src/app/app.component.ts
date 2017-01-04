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
  users: User[];

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
        // this.userService.index();
        // this.userService.show(1);
        this.userService.create({email: "x13@null.com", first_name: "x0", password: "password", role: "admin"})
        this.userService.update(1, {first_name: 'blah13'});
      },
      error =>    console.log(error)
    );
  }
}
