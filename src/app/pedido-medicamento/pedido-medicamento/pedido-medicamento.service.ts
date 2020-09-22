import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medicamento } from 'src/app/models/medicamento';
import { CrudService } from 'src/app/shared/crud-service';

@Injectable({
  providedIn: 'root'
})
export class PedidoMedicamentoService extends CrudService<Medicamento> {

  constructor(protected http: HttpClient) {
    super(http, 'https://medicamento-back.herokuapp.com/api/medicamento/ponto');
  }
}
