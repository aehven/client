import { environment } from '../environments/environment';

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
  apiPath = environment.apiPath;
  notificationOptions = {
    position: ["top", "right"],
    timeOut: 3000,
    lastOnBottom: false,
    showProgressBar: false
  }

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

  private eventDestroyed(event) {
    // console.log("eventDestroyed: " + JSON.stringify(event));
  }
}
