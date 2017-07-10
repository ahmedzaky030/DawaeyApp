import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/observable";
import 'rxjs/add/operator/map';

/*
  Generated class for the DrugsService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DrugsService {


  constructor(public http: Http) {
    //console.log('Hello DrugsService Provider');
  }

  getDrugs(): Observable <any> {
    return this.http.get("assets/db/drugs2052017.min.json")
      .map(res => res.json());
  }

}
