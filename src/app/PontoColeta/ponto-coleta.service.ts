import { HttpClient } from '@angular/common/http';
import { CrudService } from './../Shared/crud-service';
import { Injectable } from '@angular/core';
import { PontoColeta } from '../models/pontoColeta';

@Injectable({
  providedIn: 'root'
})
export class PontoColetaService extends CrudService<PontoColeta> {

  constructor(protected http: HttpClient) {
    super(http, 'https://medicamento-back.herokuapp.com/api/usuario' );
  }
}
