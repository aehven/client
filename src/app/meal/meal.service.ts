import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import { Angular2TokenService } from 'angular2-token';

import { Meal } from './meal';

@Injectable()
export class MealService {
  constructor(private tokenService: Angular2TokenService, private http: Http) { }

  resource = "meal";
  baseUrl = "meals";

  index(options: Object = {}): Observable<Response> {
    let params = new URLSearchParams();
    for (var key in options) {
        if (options.hasOwnProperty(key)) {
            let val = options[key];
            params.set(key, val);
        }
    }

    let res = this.tokenService.get(this.baseUrl, {search: params});

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
