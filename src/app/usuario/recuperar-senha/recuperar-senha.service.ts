import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CrudService } from '../../shared/crud-service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecuperarSenhaService extends CrudService<any> {

  constructor(protected http: HttpClient) {
    super(http, "https://medicamento-back.herokuapp.com/api/usuario/recuperar-senha");
  }
  // Headers
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  handleError(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage =
        `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
