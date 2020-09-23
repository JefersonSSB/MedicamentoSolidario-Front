import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/shared/crud-service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService extends CrudService<any>{

  constructor(protected http: HttpClient) {
    super(http, 'https://medicamento-back.herokuapp.com/api/pedido');
  }
}
