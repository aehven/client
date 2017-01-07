import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app works!!!';
  apiPath = "http://linode.binarytrees.biz:3000";

  currentUser = null;

  constructor(private tokenService: Angular2TokenService, private router: Router) {}

  ngOnInit(): void {
    this.tokenService.init({
        apiPath: this.apiPath
    });
  }


  private logOut() {
    this.tokenService.signOut().subscribe(
      res =>      this.router.navigate(['/login/']),
      error =>    console.log(error)
    );
    return false;
  }
}
