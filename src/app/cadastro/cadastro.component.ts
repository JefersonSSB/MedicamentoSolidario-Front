import { CadastroService } from './../cadastro.service';
import { Component, OnInit } from '@angular/core';


import {FormControl, Validators, AbstractControl, FormGroup, FormBuilder} from '@angular/forms';

import {Location} from '@angular/common';
import { GenericValidator } from './validaCPF';
import { MAT_DATE_LOCALE } from '@angular/material/core';
@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})

export class CadastroComponent implements OnInit {
  cpf: string;
  email: string;
  nome: string;
  senha: string;
  nascimento: string;
  confirmaEmail: string;
  telefone: string;
  novoUsuario: any;
  tipoUsuario = 'option1';
  //tipoUsuario = new FormControl('', Validators.required).setValue('option1') ;
  constructor
    ( private _location: Location,
      private cadastroServico: CadastroService,
      private formBuilder: FormBuilder,
    ) {}

  titulo = 'Cadastro de Usuários';
  ngOnInit() {


  }
  backClicked() {
    this._location.back();
  }

  /*
  verificaEmail() {
    if(this.email == this.validaEmail ){

    }

  getErrorMessage() {
    return this.registerForm.hasError('required') ? 'Preencha este campo' :
    this.registerForm.hasError('email') ? 'Este email não parece valido' :
    '';
  }
  verificaEmail() {
    return this.registerForm.email.hasError('required') ? 'Preencha este campo' :
    this.registerForm.hasError('email') ? 'Este email não parece valido' :
    '';
  */

 emailFormControl = new FormControl('', [
  Validators.required,
  Validators.email,
]);


 validaEmail() {
    if ( this.email === this.confirmaEmail) {
      return true;
    } else {
      return false;
    }
  }

  selectFormControl = new FormControl('', Validators.required);


  onSubmit() {
    this.novoUsuario = {
      nome: this.nome,
      cpf: this.cpf,
      email: this.email,
      nascimento: this.nascimento,
      telefone:  this.telefone,
      senha: this.senha,
    };
    if (confirm('Deseja cadastrer este novo usuario')) {
      this.cadastroServico.cadatrarUsuario(this.novoUsuario).subscribe();
      //alert(this.novoUsuario.nome);
    }

 }
}
