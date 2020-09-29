import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PontoColeta } from '../../models/pontoColeta';
import { CrudService } from '../../shared/crud-service';

@Injectable({
  providedIn: 'root'
})
export class SaidaListaService extends CrudService<PontoColeta> {
  constructor(protected http: HttpClient) {
    super(http, 'https://medicamento-back.herokuapp.com/api/pedido/usuario/1');
  }
}
