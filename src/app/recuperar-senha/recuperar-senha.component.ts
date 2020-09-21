import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RecuperarSenhaService } from './recuperar-senha.service';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent implements OnInit {

  loading = false;
  mask = '000.000.000-00'
  constructor(
    public router: Router,
    private snackBar: MatSnackBar,
    private recuperarSenhaService: RecuperarSenhaService
  ) {
  }

  form: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    cpf: new FormControl("", Validators.required)
    //grant_type: new FormControl("password"),
  });

  ngOnInit(): void {


  }


  busca() {

    this.loading = true;
    this.recuperarSenhaService.save(this.form.value).subscribe(
      dados => {
        this.showMessage("Nova senha Enviada!")
        this.loading = false
        this.form.reset();
      },
      error => {
        this.showMessage("CPF ou Email não encontrado!", true),
          this.loading = false
      }
    );



  }


  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 4000,
      horizontalPosition: "center",
      verticalPosition: "bottom",
      panelClass: isError ? ['msg-error'] : ['msg-success']

    })
  }

}
