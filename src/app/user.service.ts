import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import { Angular2TokenService } from 'angular2-token';

import { User } from './user';

@Injectable()
export class UserService {
  constructor(private tokenService: Angular2TokenService, private http: Http) { }

  resource = "user";
  baseUrl = "users";

  index(): Observable<Response> {
    return this.tokenService.get(this.baseUrl);
  }

  show(id): Observable<Response> {
    return this.tokenService.get(this.baseUrl+"/"+id);
  }

  update(id, values: Object = {}): Observable<Response> {
    return this.tokenService.put(this.baseUrl+"/"+id, {[this.resource]: values});
  }

  create(values: Object = {}): Observable<Response> {
    return this.tokenService.post(this.baseUrl, {[this.resource]: values});
  }
}
