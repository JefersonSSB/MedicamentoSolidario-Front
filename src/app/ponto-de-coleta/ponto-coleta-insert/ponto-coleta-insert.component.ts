import { PontoColetaService } from './../ponto-coleta.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ponto-coleta-insert',
  templateUrl: './ponto-coleta-insert.component.html',
  styleUrls: ['./ponto-coleta-insert.component.css'],
})
export class PontoColetaInsertComponent implements OnInit {
  formulario: FormGroup;
  debugEnable = false;

  constructor(
    private _snackBar: MatSnackBar,
    public router: Router,
    private formBuilder: FormBuilder,
    private servicePonto: PontoColetaService,
    private route: ActivatedRoute
  ) { }
  titulo = 'Cadastro Ponto Coleta';

  ngOnInit(): void {
    const pontoColeta = this.route.snapshot.data['pontoColeta'];

    this.formulario = this.formBuilder.group({
      id: [pontoColeta.id],
      atividadePrincipal: [pontoColeta.atividadePrincipal, Validators.required],
      bairro: [pontoColeta.bairro, Validators.required],
      cep: [pontoColeta.cep, Validators.required],
      cidade: [pontoColeta.cidade, [Validators.required]],
      cnpj: [pontoColeta.cnpj, Validators.required],
      complemento: [pontoColeta.complemento],
      estado: [pontoColeta.estado, Validators.required],
      nome: [pontoColeta.nome, Validators.required],
      numero: [pontoColeta.numero, Validators.required],
      rua: [pontoColeta.rua],
    });
  }

  showMessage(msg: string, isError: boolean = false): void {
    this._snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    });
  }
  onSubmit() {
    if (this.formulario.valid) {
      console.log('submit');
      this.servicePonto.save(this.formulario.value).subscribe(
        (success) => {
          this.showMessage('Salvo com Sucesso!');
          console.log('salvo com sucesso!')
          this.router.navigate(['/']);
        }
        ,
        (error) => {
          this.showMessage('Erro Desconhecido', true);
          console.error(error);
        },
        () => console.log('request completo')
      );
      console.log(this.formulario.value);
    }
  }
  onCancel() {
    this.formulario.reset();
  }

  debug() {
    this.debugEnable = !this.debugEnable;
  }
}
