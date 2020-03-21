import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import { UsuarioService } from '../usuario.service'


@Component({
  selector: 'app-usuario-insert',
  templateUrl: './usuario-insert.component.html',
  styleUrls: ['./usuario-insert.component.css'],
})
export class UsuarioInsertComponent implements OnInit {

  public formGroup: FormGroup;

  constructor (
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService
  ) {

    this.formGroup = this.formBuilder.group({
      nome: this.formBuilder.control(''),
      cpf: this.formBuilder.control(''),
      role: this.formBuilder.control(''),
      sexo: this.formBuilder.control(''),
      telefone: this.formBuilder.control(''),
      dataNascimento: this.formBuilder.control(''),
      senha: this.formBuilder.control(''),
      email: this.formBuilder.control('')
    });

  }

  titulo = 'Cadastro de Usuários';

  ngOnInit() {

  }

  onSubmit() {

    //if (confirm('Deseja cadastrer este novo usuario')) {
     // this.cadastroServico.cadatrarUsuario(this.usuario).subscribe();
      //alert(this.novoUsuario.nome);

      console.log(JSON.stringify(this.formGroup.value));

      this.usuarioService.saveUsuario(this.formGroup.value).subscribe(data => {console.log(data); });
}
}

