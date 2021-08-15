import { Test } from './../interfaces/test';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/';

@Injectable({
  providedIn: 'root'
})
export class TestService {



  constructor(private _http: HttpClient) { }


  getTestViaREST(categroyId: number): Observable<any> {
    let url = "https://opentdb.com/api.php?amount=10&category="+categroyId+"&type=multiple"
    return this._http.get<any>(url);

  }

  // we need fuc to return a test based on id or category

  getFirstQuestion() {

  }

}


