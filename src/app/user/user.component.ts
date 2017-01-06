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
  public data;
  public sortBy = "email";
  public sortOrder = "asc";

  public totalItems = 1;
  public page = 1;
  public rowsOnPage = 15;

  constructor(private tokenService: Angular2TokenService, private userService: UserService) {}

  ngOnInit() {
    this.userService.index({per_page: this.rowsOnPage, page: this.page})
    .subscribe( data => {
      let json = data.json();
      this.data = json.users;
      this.totalItems = json.count
    });
  }

  public pageChanged() {
    this.userService.index({per_page: this.rowsOnPage, page: this.page})
    .subscribe( data => {
      let json = data.json();
      this.data = json.users;
      this.totalItems = json.count
    });
  }

  // this.userService.show(1);
  // this.userService.create({email: "x18@null.com", first_name: "x0", password: "password", role: "admin"});
  // this.userService.update(1, {first_name: 'blah14'});
}
