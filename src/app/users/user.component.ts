import { Component, OnInit } from '@angular/core';

import { Angular2TokenService } from 'angular2-token';

import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./users.css']
})
export class UserComponent implements OnInit {
  public user: User;

  constructor(private tokenService: Angular2TokenService, private userService: UserService) {}

  ngOnInit() {
    this.userService.show(1)
    .subscribe( data => {
      this.user = data.json() as User;
      console.log(JSON.stringify(this.user));
    });
  }
}

  // this.userService.show(1);
  // this.userService.create({email: "x18@null.com", first_name: "x0", password: "password", role: "admin"});
  // this.userService.update(1, {first_name: 'blah14'});
