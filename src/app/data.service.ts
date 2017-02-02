import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class DataService {
  constructor(private tokenService: Angular2TokenService, private http: Http) { }

  public loggedInUser;
  public current = {};

  baseUrl(resource: string) : string {
    switch(resource) {
      case 'user':
        return 'users';

      default:
        return null;
    }
  }

  index(resource: string, options: Object = {}): Observable<Response> {
    let params = new URLSearchParams();
    for (var key in options) {
        if (options.hasOwnProperty(key)) {
            let val = options[key];
            params.set(key, val);
        }
    }

    let res = this.tokenService.get(this.baseUrl(resource), {search: params});

    this.log_response("GET", res);
    return res;
  }

  show(resource: string, id: number): Observable<Response> {
    let res = this.tokenService.get(this.baseUrl(resource)+"/"+id);
    this.log_response("GET", res);

    res.subscribe(
      res => {
        this.current[resource] = res.json();
      },

      error => {
        this.current[resource] = null;
      }
  );

    return res;
  }

  update(resource: string, id: number, values: Object = {}): Observable<Response> {
    let res =  this.tokenService.put(this.baseUrl(resource)+"/"+id, {[resource]: values});
    this.log_response("PUT", res);
    return res;
  }

  create(resource: string, values: Object = {}): Observable<Response> {
    let res =  this.tokenService.post(this.baseUrl(resource), {[resource]: values});
    this.log_response("POST", res);
    return res;
  }

  delete(resource: string, id: number): Observable<Response> {
    let res =  this.tokenService.delete(this.baseUrl(resource)+"/"+id);
    this.log_response("DELETE", res);
    return res;
  }

  log_response(method, res): void {
    res.subscribe(
      res => {
        console.log("data service: " + method + ": " + res);
        console.log("data service: \n" + JSON.stringify(res.json()));
      },

      error => {
        console.log("data service: " + method + ": " + res);
        console.error("data service: " + error);
      }
    );
  }
}
