import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Angular2TokenService } from 'angular2-token';

import { User } from './user';

@Injectable()
export class UserService {
  constructor(private tokenService: Angular2TokenService, private http: Http) { }

  baseUrl = "users";

  index(): void {
    this.tokenService.get(this.baseUrl).subscribe(
        res =>      {console.log(res);},
        error =>    console.log(error)
    );
  }

  show(id): void {
    this.tokenService.get(this.baseUrl+"/"+id).subscribe(
        res =>      {console.log(res);},
        error =>    console.log(error)
    );
  }

  update(id, values: Object = {}): void {
    this.tokenService.put(this.baseUrl+"/"+id, {user: values}).subscribe(
        res =>      {console.log(res);},
        error =>    console.log(error)
    );
  }

  create(values: Object = {}): void {
    this.tokenService.post(this.baseUrl, {user: values}).subscribe(
        res =>      {console.log(res);},
        error =>    console.log(error)
    );
  }
}
