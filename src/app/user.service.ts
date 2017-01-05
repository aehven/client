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
    let res = this.tokenService.get(this.baseUrl);
    this.log_response("GET", res);
    return res;
  }

  show(id): Observable<Response> {
    let res = this.tokenService.get(this.baseUrl+"/"+id);
    this.log_response("GET", res);
    return res;
  }

  update(id, values: Object = {}): Observable<Response> {
    let res =  this.tokenService.put(this.baseUrl+"/"+id, {[this.resource]: values});
    this.log_response("PUT", res);
    return res;
  }

  create(values: Object = {}): Observable<Response> {
    let res =  this.tokenService.post(this.baseUrl, {[this.resource]: values});
    this.log_response("POST", res);
    return res;
  }

  log_response(method, res): void {
    res.subscribe(
      res => {
        console.log(method+": "+res);
        console.log("data: \n" + JSON.stringify(res.json()));
      },

      error => {
        console.error("data error: " + error);
      }
    );
  }
}
