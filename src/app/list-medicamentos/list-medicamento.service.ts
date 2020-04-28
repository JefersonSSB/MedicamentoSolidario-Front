import { Injectable } from '@angular/core';
import { Medicamento } from '../models/medicamento'
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pedido } from '../models/pedido';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'token'
  })
}
@Injectable({
  providedIn: 'root'
})

export class ListMedicamentoService {
  apiUrl = 'https://medicamento-back.herokuapp.com/api';
  constructor(
    private http: HttpClient
  ) { }

  getMedicamentos(id): Observable<Medicamento[]> {
    return this.http.get<Medicamento[]>(`${this.apiUrl}/medicamento/ponto/${id}`, httpOptions)
  }

  fazerPedido(pedido: Pedido): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/pedido`, pedido, httpOptions)
  }
}
