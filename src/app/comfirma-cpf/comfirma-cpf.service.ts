import { Injectable } from '@angular/core';
import { CrudService } from "./../Shared/crud-service";
import { Usuario } from "../models/usuario";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { throwError } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class ComfirmaCpfService extends CrudService<Usuario>{

  constructor(protected http: HttpClient) {
    super(http, "https://medicamento-back.herokuapp.com/api/usuario/cpf");
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
