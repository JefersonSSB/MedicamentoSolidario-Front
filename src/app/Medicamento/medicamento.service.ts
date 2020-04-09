import { HttpClient } from "@angular/common/http";
import { CrudService } from "./../Shared/crud-service";
import { Medicamento } from "./../models/medicamento";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class MedicamentoService extends CrudService<Medicamento> {
  constructor(protected http: HttpClient) {
    super(http, "https://medicamento-back.herokuapp.com/api/medicamento");
  }
}
