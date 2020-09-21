import { PontoColetaService } from "./../ponto-de-coleta/ponto-coleta.service";
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { PontoColeta } from "../models/pontoColeta";

@Injectable({
  providedIn: "root",
})
export class PontoResolverGuard implements Resolve<PontoColeta> {
  constructor(private service: PontoColetaService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<PontoColeta> {
    if (route.params && route.params.id) {
      return this.service.loadByID(route.params.id);
    }
    return of({
      id: null,
      atividadePrincipal: null,
      bairro: null,
      cep: null,
      cidade: null,
      cnpj: null,
      complemento: null,
      dataCadastro: null,
      estado: null,
      nome: null,
      numero: null,
      rua: null,
    });
  }
}
