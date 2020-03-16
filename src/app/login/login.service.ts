import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Login } from '../models/login'

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  url = 'https://medicamento-back.herokuapp.com/oauth/token';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'form-data',
    'Authorization':'Basic YWRtaW46YWRtaW4='})
  }

  login(login: Login): Observable<Login> {

    return this.httpClient.post<Login>(this.url,login)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);

}}
