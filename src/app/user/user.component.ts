import { Component, OnInit } from '@angular/core';

import { Angular2TokenService } from 'angular2-token';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private tokenService: Angular2TokenService, private userService: UserService) {}

  ngOnInit() {
    this.userService.show(1);
    // this.userService.index();
    // this.userService.create({email: "x18@null.com", first_name: "x0", password: "password", role: "admin"});
    // this.userService.update(1, {first_name: 'blah14'});
  }

}
