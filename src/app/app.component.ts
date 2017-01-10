import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Angular2TokenService } from 'angular2-token';

import { User } from './user/user';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  apiPath = "http://linode.binarytrees.biz:3000";

  constructor(private tokenService: Angular2TokenService,
    private router: Router,
    private userService: UserService) {}

  ngOnInit(): void {
    this.tokenService.init({
        apiPath: this.apiPath
    });
  }


  private logOut() {
    this.tokenService.signOut().subscribe(
      res => {
        this.userService.loggedInUser = null;
        this.router.navigate(['/login/']);
      },
      error =>    console.log(error)
    );
    return false;
  }
}
