import { MedicamentoService } from "./../Medicamento/medicamento.service";
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { Medicamento } from "../models/medicamento";

@Injectable({
  providedIn: "root",
})
export class MedicamentoResolverGuard implements Resolve<Medicamento> {
  constructor(private service: MedicamentoService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Medicamento> {
    if (route.params && route.params.id) {
      return this.service.loadByID(route.params.id);
    }
    return of({
      dataValidade: null,
      id: null,
      idDoacaoIn: null,
      idDoacaoOut: null,
      nome: null,
      principio: null,
      quantidade: null,
      tarja: null,
      tipoArmazenamento: null,
      tipoReceita: null,
      data: null,
    });
  }
}
