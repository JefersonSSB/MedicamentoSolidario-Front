import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from "@angular/forms";
import { ComfirmaCpfService } from "./comfirma-cpf.service";

export interface User {
  id: number;
  nome: string;
}

@Component({
  selector: 'app-comfirma-cpf',
  templateUrl: './comfirma-cpf.component.html',
  styleUrls: ['./comfirma-cpf.component.css']
})
export class ComfirmaCpfComponent implements OnInit {

  loading = false;
  user: User;
  mask = '000.000.000-00'
  constructor(
    private _snackBar: MatSnackBar,
    public router: Router,
    private comfirmaCpfService: ComfirmaCpfService,
    private snackBar: MatSnackBar
  ) {
  }

  form: FormGroup = new FormGroup({
    cpf: new FormControl("")
    //grant_type: new FormControl("password"),
  });

  ngOnInit(): void {


  }


  busca() {

    this.loading = true;
    this.comfirmaCpfService.loadByCpf(this.form.get('cpf').value).subscribe(
      dados => {
        this.user = dados;
        this.loading = false
        this.router.navigate(["receberMedicamento", this.user.id, this.user.nome]);
      },
      error => {
        this.showMessage("CPF não encontrado!", true),
          this.loading = false
      }

    );



  }


  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "bottom",
      panelClass: isError ? ['msg-error'] : ['msg-success']

    })
  }

}
