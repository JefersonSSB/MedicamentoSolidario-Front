import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PontoColeta } from 'src/app/models/pontoColeta';
import { CrudService } from 'src/app/shared/crud-service';

@Injectable({
  providedIn: 'root'
})
export class PedidoUsuarioService extends CrudService<PontoColeta> {
  constructor(protected http: HttpClient) {
    super(http, 'https://medicamento-back.herokuapp.com/api/pedido/usuario');
  }
}
