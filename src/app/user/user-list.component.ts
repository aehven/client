import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Router } from '@angular/router';

import { Angular2TokenService } from 'angular2-token';

import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['../app.component.css', './user.css']
})
export class UserListComponent implements OnInit {
  public data;
  public sortBy = "email";
  public sortOrder = "asc";

  public search = null;
  public searchControl = new FormControl();

  public totalItems = 1;
  public page = 1;
  public rowsOnPage = 15; //must be called this for table component to work

  constructor(private tokenService: Angular2TokenService,
    private userService: UserService,
    private router: Router) {}

  ngOnInit() {
    this.userService.index({per_page: this.rowsOnPage, page: this.page})
    .subscribe( data => {
      let json = data.json();
      this.data = json.users;
      this.totalItems = json.count
    });

    this.searchControl.valueChanges
      .debounceTime(500)
      .subscribe(newValue => {
        console.log(this.search);
        this.search = newValue;
        this.page = 1;
        this.getIndex();
    });
  }

  private pageChanged(event) {
    this.rowsOnPage = event.itemsPerPage;
    this.page = event.page;
    this.getIndex();
  }

  private getIndex() {
    this.userService.index({per_page: this.rowsOnPage, page: this.page, search: this.search})
    .subscribe( data => {
      let json = data.json();
      this.data = json.users;
      this.totalItems = json.count
    });
  }

  private show(id) {
    this.router.navigate(['/user/', id]);
  }

  // this.userService.show(1);
  // this.userService.create({email: "x18@null.com", first_name: "x0", password: "password", role: "admin"});
  // this.userService.update(1, {first_name: 'blah14'});
}
