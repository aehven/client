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

        this.userService.index().subscribe(
          res => {
            console.log("index: " + res);
            console.log("index: \n" + JSON.stringify(res.json()));
          },

          error => {
            console.log("index error: " + error);
          }
        );

        this.userService.show(1).subscribe(
          res => {
            console.log("show: " + res);
            console.log("show: \n" + JSON.stringify(res.json()));
          },

          error => {
            console.log("show error: " + error);
          }
        );

        this.userService.create({email: "x16@null.com", first_name: "x0", password: "password", role: "admin"}).subscribe(
          res => {
            console.log("create: " + res);
            console.log("create: \n" + JSON.stringify(res.json()));
          },

          error => {
            console.log("create error: " + error);
          }
        );

        this.userService.update(1, {first_name: 'blah13'}).subscribe(
          res => {
            console.log("update: " + res);
            console.log("update: \n" + JSON.stringify(res.json()));
          },

          error => {
            console.log("update error: " + error);
          }
        );
      },
      error => console.log(error)
    );
  }
}
