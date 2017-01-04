import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Angular2TokenService } from 'angular2-token';

import { User } from './user';

@Injectable()
export class UserService {
  constructor(private tokenService: Angular2TokenService, private http: Http) { }

  resource = "user";
  baseUrl = "users";
  current = null;

  index(): void {
    this.tokenService.get(this.baseUrl).subscribe(
      res =>      {console.log(res);},
      error =>    console.log(error)
    );
  }

  show(id): void {
    this.tokenService.get(this.baseUrl+"/"+id).subscribe(
      res =>      {
        console.log(res);
        this.current = res;
      },
      error =>    console.log(error)
    );
  }

  update(id, values: Object = {}): void {
    this.tokenService.put(this.baseUrl+"/"+id, {[this.resource]: values}).subscribe(
      res =>      {
        console.log(res);
        this.current = res;
      },
      error =>    console.log(error)
    );
  }

  create(values: Object = {}): void {
    this.tokenService.post(this.baseUrl, {[this.resource]: values}).subscribe(
      res =>      {
        console.log(res);
        this.current = res;
      },
      error =>    console.log(error)
    );
  }
}
