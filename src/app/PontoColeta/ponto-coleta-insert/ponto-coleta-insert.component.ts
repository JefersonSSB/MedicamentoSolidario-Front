import { PontoColetaService } from './../ponto-coleta.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-ponto-coleta-insert',
  templateUrl: './ponto-coleta-insert.component.html',
  styleUrls: ['./ponto-coleta-insert.component.css']
})
export class PontoColetaInsertComponent implements OnInit {
  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder, private servicePonto: PontoColetaService) { }
  titulo= 'Cadastro Ponto Coleta'

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      atividadePrincipal:[null,Validators.required],
      bairro:[null,Validators.required],
      cep:[null,Validators.required],
      cidade: [null, [Validators.required]],
      cnpj: [null, Validators.required],
      complemento: [null],
      estado:[null, Validators.required],
      nome:[null, Validators.required],
      numero:[null],
      rua:[null]
    });
  }
  onSubmit(){
    if(this.formulario.valid){
      console.log('submit');
    this.servicePonto.save(this.formulario.value).subscribe(
      success => console.log('salvo com sucesso!'),
      error => console.error(error),
      () => console.log('request completo')
    );
    console.log(this.formulario.value);
    }
  }
  onCancel(){
    this.formulario.reset();
  }
}
