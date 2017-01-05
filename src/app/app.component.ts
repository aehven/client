import { Component, OnInit } from '@angular/core';

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

  constructor(private tokenService: Angular2TokenService){}

  ngOnInit(): void {
    this.tokenService.init({
        apiPath: this.apiPath
    });
  }
}
