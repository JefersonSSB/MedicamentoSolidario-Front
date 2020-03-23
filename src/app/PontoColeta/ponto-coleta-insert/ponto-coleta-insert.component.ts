import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ponto-coleta-insert',
  templateUrl: './ponto-coleta-insert.component.html',
  styleUrls: ['./ponto-coleta-insert.component.css']
})
export class PontoColetaInsertComponent implements OnInit {

  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      atividadePrincipal:[null,Validators.required],
      bairro:[null,Validators.required],
      cep:[null,Validators.required],
      nomeFantasia: [null, Validators.required],
      cidade: [null, [Validators.required, Validators.email]],
      cnpj: [null, Validators.required],
      complemento: [null],
      estado:[null, Validators.required],
      nome:[null, Validators.required],
      numero:[null],
      rua:[null]
    });
  }
  onSubmit(){
    console.log(this.formulario.value)
  }
  resetar(){
    this.formulario.reset();
  }
}
