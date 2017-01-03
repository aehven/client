import { Component } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!!!';

  constructor(private _tokenService: Angular2TokenService) {
    this._tokenService.init({
        apiPath: "http://linode.binarytrees.biz:3000"
    });

    this._tokenService.signIn({
        email:    'a0@null.com',
        password: 'password'
    }).subscribe(
        res =>      console.log(res),
        error =>    console.log(error)
    );
  }
}
