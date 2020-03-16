import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  urlConfiguracao =  'https://medicamentosolidario.herokuapp.com/api/usuario';
  constructor(private http: HttpClient) { }
  cadatrarUsuario(usuario) {
    console.log(usuario);
    return this.http.post(this.urlConfiguracao, usuario);
  }
}
