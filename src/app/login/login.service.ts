import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(protected http: HttpClient) {}
  login(record: Login) {
    return this.http
      .post('https://medicamento-back.herokuapp.com/login', record)
      .pipe(take(1));
  }
}
