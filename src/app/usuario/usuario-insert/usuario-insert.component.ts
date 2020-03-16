import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {FormControl, Validators, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-usuario-insert',
  templateUrl: './usuario-insert.component.html',
  styleUrls: ['./usuario-insert.component.css']
})
export class UsuarioInsertComponent implements OnInit {

  public formGroup: FormGroup;

  constructor
    ( private _location: Location) {
    }

  titulo = 'Cadastro de Usuários';

  ngOnInit() {

    this.formGroup = new FormGroup({
      nome: new FormControl('',Validators.required),
      cpf: new FormControl(''),
      role: new FormControl(''),
      sexo: new FormControl(''),
      telefone: new FormControl(''),
      nascimento: new FormControl(''),
      senha: new FormControl(''),
      email: new FormControl('',[Validators.required,
        Validators.email,]),
    });


  }

  backClicked() {
    this._location.back();
  }

  onSubmit() {

    //if (confirm('Deseja cadastrer este novo usuario')) {
     // this.cadastroServico.cadatrarUsuario(this.usuario).subscribe();
      //alert(this.novoUsuario.nome);

      console.log(this.formGroup.controls);
    //}

 }
}
