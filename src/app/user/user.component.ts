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
  public rowsOnPage = 9;
  public sortBy = "email";
  public sortOrder = "asc";

  constructor(private tokenService: Angular2TokenService, private userService: UserService) {}

  ngOnInit() {
    // this.userService.show(1);
    this.userService.index({per_page: this.rowsOnPage})
    .subscribe( data => {
      this.data = data.json();
    });

    // this.userService.create({email: "x18@null.com", first_name: "x0", password: "password", role: "admin"});
    // this.userService.update(1, {first_name: 'blah14'});
  }

  public toInt(num: string) {
      return +num;
  }

  public sortByWordLength = (a: any) => {
      return a.city.length;
  }

}
