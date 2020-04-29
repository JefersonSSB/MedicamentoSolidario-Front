import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(protected http: HttpClient) {}
  login(record: Login) :Observable<any>{
    return this.http
      .post<any>('https://medicamento-back.herokuapp.com/login', record)
      .pipe(take(1));
  }
}
